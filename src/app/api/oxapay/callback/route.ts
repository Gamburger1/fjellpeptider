import { NextRequest, NextResponse } from "next/server";
import { verifyOxapayWebhookSignature } from "@/lib/oxapay";

// OxaPay posts payment status updates here. There's no orders table yet
// (order persistence is deliberately deferred), so this only verifies and
// logs — once orders are persisted, this is where the order gets marked paid.
export async function POST(request: NextRequest) {
  const rawBody = await request.text();
  const hmacHeader = request.headers.get("hmac");

  if (!verifyOxapayWebhookSignature(rawBody, hmacHeader)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const payload = JSON.parse(rawBody);
  console.log("OxaPay webhook received:", {
    trackId: payload.track_id,
    status: payload.status,
    orderId: payload.order_id,
    amount: payload.amount,
    currency: payload.currency,
  });

  return new NextResponse("ok", { status: 200 });
}
