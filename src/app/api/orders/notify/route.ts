import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendOrderNotificationEmail } from "@/lib/email";

interface RequestBody {
  items: { productId: string; size: string; quantity: number }[];
  paymentMethod: string;
  customer: {
    name: string;
    email: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
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

  let total = 0;
  const lines = [];
  for (const item of body.items) {
    const product = products.find((p) => p.id === item.productId);
    const variant = product?.variants.find((v) => v.size === item.size);
    if (!product || !variant || item.quantity < 1) {
      return NextResponse.json(
        { error: "Ugyldig vare i handlekurven" },
        { status: 400 },
      );
    }
    total += variant.price * item.quantity;
    lines.push({
      name: product.name,
      size: variant.size,
      quantity: item.quantity,
      price: variant.price,
    });
  }

  try {
    await sendOrderNotificationEmail({
      paymentMethod: body.paymentMethod,
      total,
      customer: body.customer,
      lines,
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Order notification email failed", error);
    return NextResponse.json(
      { error: "Kunne ikke sende bestillingsvarsel." },
      { status: 502 },
    );
  }
}
