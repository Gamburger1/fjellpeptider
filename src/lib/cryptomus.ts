import crypto from "crypto";

const API_BASE = "https://api.cryptomus.com/v1";

function getMerchantId(): string {
  const id = process.env.CRYPTOMUS_MERCHANT_ID;
  if (!id) {
    throw new Error("CRYPTOMUS_MERCHANT_ID is not set");
  }
  return id;
}

function getApiKey(): string {
  const key = process.env.CRYPTOMUS_PAYMENT_API_KEY;
  if (!key) {
    throw new Error("CRYPTOMUS_PAYMENT_API_KEY is not set");
  }
  return key;
}

// Cryptomus signs requests/webhooks with MD5(base64(json_body) + api_key).
function sign(body: string, apiKey: string): string {
  return crypto
    .createHash("md5")
    .update(Buffer.from(body).toString("base64") + apiKey)
    .digest("hex");
}

export interface CreateInvoiceParams {
  amount: number;
  currency: string;
  orderId: string;
  urlCallback: string;
  urlReturn: string;
}

export interface CryptomusInvoice {
  uuid: string;
  paymentUrl: string;
  expiredAt: number;
}

export async function createCryptomusInvoice(
  params: CreateInvoiceParams,
): Promise<CryptomusInvoice> {
  const body = JSON.stringify({
    amount: params.amount.toFixed(2),
    currency: params.currency,
    order_id: params.orderId,
    url_callback: params.urlCallback,
    url_return: params.urlReturn,
  });

  const res = await fetch(`${API_BASE}/payment`, {
    method: "POST",
    headers: {
      merchant: getMerchantId(),
      sign: sign(body, getApiKey()),
      "Content-Type": "application/json",
    },
    body,
  });

  const json = await res.json();
  if (!res.ok || json.state !== 0) {
    throw new Error(
      `Cryptomus invoice creation failed: ${json.message ?? res.statusText}`,
    );
  }

  return {
    uuid: json.result.uuid,
    paymentUrl: json.result.url,
    expiredAt: json.result.expired_at,
  };
}

// The webhook body includes a `sign` field computed the same way as request
// signing: MD5(base64(json_encode(rest of body)) + api_key). Must remove
// `sign` before re-encoding, and re-encode with the same key order/encoding
// the body arrived in (JSON.parse preserves key order for string keys).
export function verifyCryptomusWebhookSignature(payload: unknown): boolean {
  if (typeof payload !== "object" || payload === null || !("sign" in payload)) {
    return false;
  }
  const { sign: receivedSign, ...rest } = payload as { sign: string } & Record<
    string,
    unknown
  >;
  const expected = sign(JSON.stringify(rest), getApiKey());

  const expectedBuf = Buffer.from(expected, "hex");
  const receivedBuf = Buffer.from(String(receivedSign), "hex");
  if (expectedBuf.length !== receivedBuf.length) return false;
  return crypto.timingSafeEqual(expectedBuf, receivedBuf);
}
