import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createOxapayInvoice } from "@/lib/oxapay";

interface RequestBody {
  items: { productId: string; size: string; quantity: number }[];
  email?: string;
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
    const invoice = await createOxapayInvoice({
      amount,
      currency: "NOK",
      orderId,
      email: body.email,
      callbackUrl: `${origin}/api/oxapay/callback`,
      returnUrl: `${origin}/checkout/success?order_id=${orderId}`,
    });

    return NextResponse.json({
      paymentUrl: invoice.paymentUrl,
      trackId: invoice.trackId,
    });
  } catch (error) {
    console.error("OxaPay invoice creation failed", error);
    return NextResponse.json(
      { error: "Kunne ikke opprette betaling. Prøv igjen." },
      { status: 502 },
    );
  }
}
