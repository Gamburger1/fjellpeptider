import { NextRequest, NextResponse } from "next/server";
import { verifyCryptomusWebhookSignature } from "@/lib/cryptomus";

// Cryptomus posts payment status updates here, with a `sign` field inside
// the JSON body itself (not a header). There's no orders table yet (order
// persistence is deliberately deferred), so this only verifies and logs —
// once orders are persisted, this is where the order gets marked paid.
export async function POST(request: NextRequest) {
  const payload = await request.json();

  if (!verifyCryptomusWebhookSignature(payload)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  console.log("Cryptomus webhook received:", {
    uuid: payload.uuid,
    status: payload.status,
    orderId: payload.order_id,
    amount: payload.amount,
    currency: payload.currency,
  });

  return new NextResponse("ok", { status: 200 });
}
