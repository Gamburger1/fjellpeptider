import { Resend } from "resend";

function getResend(): Resend {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    throw new Error("RESEND_API_KEY is not set");
  }
  return new Resend(key);
}

export interface OrderNotificationLine {
  name: string;
  size: string;
  quantity: number;
  price: number;
}

export interface OrderNotificationParams {
  paymentMethod: string;
  total: number;
  customer: {
    name: string;
    email: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  lines: OrderNotificationLine[];
}

export async function sendOrderNotificationEmail(
  params: OrderNotificationParams,
) {
  const to = process.env.ORDER_NOTIFICATION_EMAIL;
  if (!to) {
    throw new Error("ORDER_NOTIFICATION_EMAIL is not set");
  }

  const linesHtml = params.lines
    .map(
      (line) =>
        `<li>${line.name} (${line.size}) × ${line.quantity} — ${(line.price * line.quantity).toFixed(2)} kr</li>`,
    )
    .join("");

  const resend = getResend();
  await resend.emails.send({
    from: process.env.ORDER_NOTIFICATION_FROM ?? "onboarding@resend.dev",
    to,
    subject: `Ny bestilling (${params.paymentMethod}) — ${params.total.toFixed(2)} kr`,
    html: `
      <h2>Ny bestilling</h2>
      <p><strong>Betalingsmåte:</strong> ${params.paymentMethod}</p>
      <p><strong>Totalt:</strong> ${params.total.toFixed(2)} kr</p>
      <h3>Kunde</h3>
      <p>
        ${params.customer.name}<br/>
        ${params.customer.email}<br/>
        ${params.customer.address}<br/>
        ${params.customer.postalCode} ${params.customer.city}<br/>
        ${params.customer.country}
      </p>
      <h3>Varer</h3>
      <ul>${linesHtml}</ul>
    `,
  });
}
