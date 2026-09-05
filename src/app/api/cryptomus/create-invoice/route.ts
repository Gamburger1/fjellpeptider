import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createCryptomusInvoice } from "@/lib/cryptomus";

interface RequestBody {
  items: { productId: string; size: string; quantity: number }[];
}

export async function POST(request: NextRequest) {
  const body: RequestBody = await request.json();

  if (!body.items || body.items.length === 0) {
    return NextResponse.json({ error: "Handlekurven er tom" }, { status: 400 });
  }

  const products = await prisma.product.findMany({
    where: { id: { in: body.items.map((item) => item.productId) } },
    include: { variants: true },
  });

  let amount = 0;
  for (const item of body.items) {
    const product = products.find((p) => p.id === item.productId);
    const variant = product?.variants.find((v) => v.size === item.size);
    if (!variant || item.quantity < 1) {
      return NextResponse.json(
        { error: "Ugyldig vare i handlekurven" },
        { status: 400 },
      );
    }
    amount += variant.price * item.quantity;
  }

  const orderId = crypto.randomUUID();
  const origin = request.nextUrl.origin;

  try {
    const invoice = await createCryptomusInvoice({
      amount,
      currency: "NOK",
      orderId,
      urlCallback: `${origin}/api/cryptomus/callback`,
      urlReturn: `${origin}/checkout/success?order_id=${orderId}`,
    });

    return NextResponse.json({
      paymentUrl: invoice.paymentUrl,
      uuid: invoice.uuid,
    });
  } catch (error) {
    console.error("Cryptomus invoice creation failed", error);
    return NextResponse.json(
      { error: "Kunne ikke opprette betaling. Prøv igjen." },
      { status: 502 },
    );
  }
}
