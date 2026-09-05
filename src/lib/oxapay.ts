import crypto from "crypto";

const API_BASE = "https://api.oxapay.com/v1";

function getApiKey(): string {
  const key = process.env.OXAPAY_MERCHANT_API_KEY;
  if (!key) {
    throw new Error("OXAPAY_MERCHANT_API_KEY is not set");
  }
  return key;
}

export interface CreateInvoiceParams {
  amount: number;
  currency: string;
  orderId: string;
  description?: string;
  email?: string;
  callbackUrl: string;
  returnUrl: string;
}

export interface OxapayInvoice {
  trackId: string;
  paymentUrl: string;
  expiredAt: number;
}

export async function createOxapayInvoice(
  params: CreateInvoiceParams,
): Promise<OxapayInvoice> {
  const res = await fetch(`${API_BASE}/payment/invoice`, {
    method: "POST",
    headers: {
      merchant_api_key: getApiKey(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: params.amount,
      currency: params.currency,
      order_id: params.orderId,
      description: params.description,
      email: params.email,
      callback_url: params.callbackUrl,
      return_url: params.returnUrl,
      lifetime: 60,
    }),
  });

  const body = await res.json();
  if (!res.ok || body.error) {
    throw new Error(
      `OxaPay invoice creation failed: ${body.message ?? res.statusText}`,
    );
  }

  return {
    trackId: body.data.track_id,
    paymentUrl: body.data.payment_url,
    expiredAt: body.data.expired_at,
  };
}

export interface OxapayPaymentStatus {
  trackId: string;
  status: string;
  amount: number;
  currency: string;
  orderId: string | null;
}

export async function getOxapayPaymentStatus(
  trackId: string,
): Promise<OxapayPaymentStatus> {
  const res = await fetch(`${API_BASE}/payment/${trackId}`, {
    headers: {
      merchant_api_key: getApiKey(),
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  const body = await res.json();
  if (!res.ok || body.error) {
    throw new Error(
      `OxaPay status lookup failed: ${body.message ?? res.statusText}`,
    );
  }

  return {
    trackId: body.data.track_id,
    status: body.data.status,
    amount: body.data.amount,
    currency: body.data.currency,
    orderId: body.data.order_id ?? null,
  };
}

// OxaPay signs each webhook body with HMAC-SHA512, keyed with the merchant
// API key, over the raw (unparsed) request bytes — must run before JSON.parse.
export function verifyOxapayWebhookSignature(
  rawBody: string,
  hmacHeader: string | null,
): boolean {
  if (!hmacHeader) return false;
  const expected = crypto
    .createHmac("sha512", getApiKey())
    .update(rawBody)
    .digest("hex");
  const expectedBuf = Buffer.from(expected, "hex");
  const receivedBuf = Buffer.from(hmacHeader, "hex");
  if (expectedBuf.length !== receivedBuf.length) return false;
  return crypto.timingSafeEqual(expectedBuf, receivedBuf);
}
