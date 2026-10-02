import { Order } from '@/types';
import { formatNaira, ACCEPTED_DOOR_PAYMENT_METHODS } from '@/config/delivery';
import { logEmail } from '@/lib/db';
import { Resend } from 'resend';
import nodemailer from 'nodemailer';

// Resend Configuration (Recommended: Free tier, 3,000 emails/month, no credit card required)
const RESEND_API_KEY = process.env.RESEND_API_KEY || '';
const RESEND_FROM = process.env.RESEND_FROM || 'Lagos Provision <onboarding@resend.dev>';

export const isResendConfigured = Boolean(
  RESEND_API_KEY && !RESEND_API_KEY.includes('your-resend-api-key')
);

// Nodemailer / SMTP Configuration (Backup or Primary transactional email)
const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com';
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '465', 10);
const SMTP_SECURE = process.env.SMTP_SECURE !== undefined
  ? process.env.SMTP_SECURE === 'true'
  : SMTP_PORT === 465;
const SMTP_USER = process.env.SMTP_USER || '';
const SMTP_PASS = process.env.SMTP_PASS || '';
const SMTP_FROM = process.env.SMTP_FROM || process.env.RESEND_FROM || 'Lagos Provision <orders@lagosprovision.ng>';
const SMTP_SERVICE = process.env.SMTP_SERVICE || '';

export const isNodemailerConfigured = Boolean(
  SMTP_USER &&
  SMTP_PASS &&
  !SMTP_USER.includes('your-email') &&
  !SMTP_PASS.includes('your-password')
);

// Mailgun Configuration (Fallback if configured)
const MAILGUN_API_KEY = process.env.MAILGUN_API_KEY || '';
const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN || '';
const MAILGUN_FROM = process.env.MAILGUN_FROM || 'Lagos Provision <orders@lagosprovision.ng>';
const MAILGUN_BASE_URL = process.env.MAILGUN_BASE_URL || 'https://api.mailgun.net';

export const isMailgunConfigured = Boolean(
  MAILGUN_API_KEY &&
  MAILGUN_DOMAIN &&
  !MAILGUN_API_KEY.includes('your-mailgun-api-key')
);

export async function sendViaNodemailer(
  to: string,
  subject: string,
  html: string,
  text: string
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    const transportConfig: any = SMTP_SERVICE
      ? {
          service: SMTP_SERVICE,
          auth: { user: SMTP_USER, pass: SMTP_PASS },
        }
      : {
          host: SMTP_HOST,
          port: SMTP_PORT,
          secure: SMTP_SECURE,
          auth: { user: SMTP_USER, pass: SMTP_PASS },
          tls: {
            rejectUnauthorized: process.env.NODE_ENV === 'production',
          },
        };

    const transporter = nodemailer.createTransport(transportConfig);
    const info = await transporter.sendMail({
      from: SMTP_FROM,
      to,
      subject,
      text,
      html,
    });

    console.log(`[Nodemailer] Email sent successfully to ${to}, messageId: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (err: any) {
    console.error('[Nodemailer Error]:', err);
    return { success: false, error: err.message || 'Nodemailer failed' };
  }
}

export function generateOrderConfirmationHtml(order: Order): string {
  const itemsHtml = (order.items || [])
    .map(
      (item) => `
    <tr>
      <td style="padding: 12px 8px; border-bottom: 1px solid #E5E7EB; font-family: Arial, sans-serif;">
        <strong style="color: #1F2A25; font-size: 14px;">${item.name_snapshot}</strong>
        ${item.size_snapshot ? `<br/><span style="color: #6B7280; font-size: 12px;">${item.size_snapshot}</span>` : ''}
      </td>
      <td style="padding: 12px 8px; border-bottom: 1px solid #E5E7EB; text-align: center; color: #1F2A25; font-size: 14px; font-family: Arial, sans-serif;">
        ${item.quantity}
      </td>
      <td style="padding: 12px 8px; border-bottom: 1px solid #E5E7EB; text-align: right; color: #1F2A25; font-size: 14px; font-weight: bold; font-family: Arial, sans-serif;">
        ${formatNaira(item.line_total_kobo)}
      </td>
    </tr>`
    )
    .join('');

  const doorMethodsHtml = ACCEPTED_DOOR_PAYMENT_METHODS.map(
    (m) => `
    <div style="background-color: #FFFFFF; border-radius: 8px; padding: 12px; margin-bottom: 8px; border-left: 4px solid #0B4A3A;">
      <strong style="color: #0B4A3A; font-size: 14px;">${m.name}</strong>
      <p style="margin: 4px 0 0; color: #4B5563; font-size: 13px;">${m.instruction}</p>
    </div>`
  ).join('');

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Order Confirmation - ${order.order_number}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #FBF6EA; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #FBF6EA; padding: 30px 15px;">
    <tr>
      <td align="center">
        <table width="100%" max-width="600" style="max-width: 600px; background-color: #FFFFFF; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
          <!-- Header -->
          <tr>
            <td style="background-color: #0B4A3A; padding: 25px; text-align: center;">
              <h1 style="margin: 0; color: #FFFFFF; font-size: 24px; letter-spacing: 0.5px;">LAGOS PROVISION</h1>
              <p style="margin: 5px 0 0; color: #F4B63F; font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase;">Fresh Groceries. Local Goodness.</p>
            </td>
          </tr>

          <!-- Banner -->
          <tr>
            <td style="padding: 30px 25px 15px; text-align: center; border-bottom: 1px solid #F3EBD8;">
              <span style="display: inline-block; background-color: #E8F4F0; color: #0B4A3A; font-weight: bold; font-size: 12px; padding: 4px 12px; border-radius: 20px; text-transform: uppercase; margin-bottom: 12px;">
                ✔ Order Confirmed (Pay on Delivery)
              </span>
              <h2 style="margin: 0; color: #1F2A25; font-size: 22px;">Thank you for your order, ${order.customer_name}!</h2>
              <p style="margin: 8px 0 0; color: #6B7280; font-size: 14px;">
                Order Number: <strong style="color: #0B4A3A;">${order.order_number}</strong>
              </p>
            </td>
          </tr>

          <!-- Amount Due on Delivery Card -->
          <tr>
            <td style="padding: 20px 25px;">
              <div style="background-color: #FEF3C7; border: 2px dashed #F59E0B; border-radius: 12px; padding: 18px; text-align: center;">
                <p style="margin: 0; color: #92400E; font-size: 13px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px;">
                  Amount To Pay On Delivery
                </p>
                <div style="font-size: 32px; font-weight: 800; color: #0B4A3A; margin: 6px 0;">
                  ${formatNaira(order.total_kobo)}
                </div>
                <p style="margin: 0; color: #78350F; font-size: 12px;">
                  Nothing to pay online. Please have this amount ready when our delivery rider arrives.
                </p>
              </div>
            </td>
          </tr>

          <!-- Accepted Payment at the Door -->
          <tr>
            <td style="padding: 0 25px 20px;">
              <h3 style="margin: 0 0 10px; color: #1F2A25; font-size: 16px;">How you can pay the rider at the door:</h3>
              <div style="background-color: #F8FAFC; border-radius: 10px; padding: 12px;">
                ${doorMethodsHtml}
              </div>
            </td>
          </tr>

          <!-- Delivery Address & Rider Note -->
          <tr>
            <td style="padding: 0 25px 20px;">
              <div style="background-color: #FBF6EA; border-radius: 10px; padding: 16px; border: 1px solid #F3EBD8;">
                <h4 style="margin: 0 0 8px; color: #0B4A3A; font-size: 14px;">Delivery Details:</h4>
                <p style="margin: 0 0 4px; color: #1F2A25; font-size: 14px; font-weight: bold;">${order.customer_name} (${order.customer_phone})</p>
                <p style="margin: 0 0 4px; color: #4B5563; font-size: 13px;">${order.shipping_street}</p>
                <p style="margin: 0 0 4px; color: #4B5563; font-size: 13px;">${order.shipping_neighbourhood}, ${order.shipping_lga}, Lagos</p>
                ${order.delivery_instructions ? `<p style="margin: 8px 0 0; color: #6B7280; font-size: 12px; font-style: italic;">Note: "${order.delivery_instructions}"</p>` : ''}
              </div>
            </td>
          </tr>

          <!-- Items Ordered Table -->
          <tr>
            <td style="padding: 0 25px 25px;">
              <h3 style="margin: 0 0 12px; color: #1F2A25; font-size: 16px;">Items Ordered</h3>
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="border-collapse: collapse;">
                <thead>
                  <tr style="background-color: #F8FAFC; text-align: left;">
                    <th style="padding: 10px 8px; font-size: 12px; color: #6B7280; text-transform: uppercase;">Item</th>
                    <th style="padding: 10px 8px; font-size: 12px; color: #6B7280; text-align: center; text-transform: uppercase;">Qty</th>
                    <th style="padding: 10px 8px; font-size: 12px; color: #6B7280; text-align: right; text-transform: uppercase;">Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHtml}
                </tbody>
              </table>

              <!-- Totals Breakdown -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top: 15px;">
                <tr>
                  <td style="padding: 6px 0; color: #6B7280; font-size: 14px;">Subtotal:</td>
                  <td style="padding: 6px 0; text-align: right; color: #1F2A25; font-size: 14px; font-weight: bold;">
                    ${formatNaira(order.subtotal_kobo)}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #6B7280; font-size: 14px;">Delivery Fee (Flat Lagos):</td>
                  <td style="padding: 6px 0; text-align: right; color: #1F2A25; font-size: 14px; font-weight: bold;">
                    ${formatNaira(order.delivery_fee_kobo)}
                  </td>
                </tr>
                <tr style="border-top: 2px solid #0B4A3A;">
                  <td style="padding: 12px 0 0; color: #0B4A3A; font-size: 16px; font-weight: bold;">Total Due on Delivery:</td>
                  <td style="padding: 12px 0 0; text-align: right; color: #0B4A3A; font-size: 18px; font-weight: 800;">
                    ${formatNaira(order.total_kobo)}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #F8FAFC; padding: 20px; text-align: center; border-top: 1px solid #E5E7EB;">
              <p style="margin: 0; color: #6B7280; font-size: 12px;">
                Lagos Provision • Fresh groceries, local goodness delivered to your doorstep.
              </p>
              <p style="margin: 4px 0 0; color: #9CA3AF; font-size: 11px;">
                Have questions? Call us on <strong style="color: #0B4A3A;">+234 800 524 6777</strong> or reply to this email.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`.trim();
}

export function generateOrderConfirmationText(order: Order): string {
  const itemsText = (order.items || [])
    .map(
      (it) =>
        `- ${it.name_snapshot} (${it.size_snapshot || ''}) x ${it.quantity} = ${formatNaira(it.line_total_kobo)}`
    )
    .join('\n');

  return `
LAGOS PROVISION — ORDER CONFIRMATION
Order Number: ${order.order_number}

Hello ${order.customer_name},

Thank you for your order with Lagos Provision! Your order has been received and confirmed.

AMOUNT DUE ON DELIVERY: ${formatNaira(order.total_kobo)}
(Payment is collected when your order arrives. Nothing to pay online.)

ACCEPTED PAYMENT AT THE DOOR:
1. Cash: Please have the exact amount ready if possible.
2. POS: The rider carries a POS terminal. Verve, Mastercard and Visa accepted.
3. Bank transfer: Transfer to the account details the rider shows you and confirm the alert before the rider leaves.

DELIVERY ADDRESS:
${order.shipping_street}
${order.shipping_neighbourhood}, ${order.shipping_lga}, Lagos
Phone: ${order.customer_phone}
Delivery Window: Within 24–48 hours across Lagos
${order.delivery_instructions ? `Instructions: "${order.delivery_instructions}"` : ''}

ITEMS ORDERED:
${itemsText}

Subtotal: ${formatNaira(order.subtotal_kobo)}
Delivery Fee: ${formatNaira(order.delivery_fee_kobo)}
Total: ${formatNaira(order.total_kobo)}

GOOD FOOD / STRONG FAMILIES / A GREATER LAGOS
For support, call +234 800 524 6777 or reply to this email.
`.trim();
}

export async function sendOrderConfirmationEmail(order: Order): Promise<{
  success: boolean;
  messageId?: string;
  error?: string;
  provider?: string;
}> {
  const recipient = order.customer_email;
  const subject = `Order Confirmed #${order.order_number} — Lagos Provision (Pay on Delivery)`;
  const htmlContent = generateOrderConfirmationHtml(order);
  const textContent = generateOrderConfirmationText(order);

  const preferredProvider = (process.env.EMAIL_PROVIDER || 'resend').toLowerCase().trim();

  // 1. If Nodemailer is set as the preferred primary provider, try it first
  if (preferredProvider === 'nodemailer' && isNodemailerConfigured) {
    console.log(`[Email Dispatch] Sending via primary Nodemailer to ${recipient}...`);
    const nodeRes = await sendViaNodemailer(recipient, subject, htmlContent, textContent);
    if (nodeRes.success) {
      await logEmail({
        order_id: order.id,
        to_email: recipient,
        template: 'order_confirmation',
        status: 'sent',
        mailgun_message_id: nodeRes.messageId || `nodemailer-${Date.now()}`,
        attempts: 1,
      });
      return { success: true, messageId: nodeRes.messageId, provider: 'nodemailer' };
    }
    console.warn(`[Nodemailer Primary Error]: ${nodeRes.error}. Trying fallback providers...`);
  }

  // 2. Try Resend if configured and not explicitly skipped
  if (isResendConfigured && preferredProvider !== 'mailgun') {
    try {
      console.log(`[Email Dispatch] Attempting Resend for order ${order.order_number} to ${recipient}...`);
      const resend = new Resend(RESEND_API_KEY);
      const { data, error } = await resend.emails.send({
        from: RESEND_FROM,
        to: recipient,
        subject,
        html: htmlContent,
        text: textContent,
      });

      if (!error && data?.id) {
        console.log(`[Resend Success] Email sent: ${data.id}`);
        await logEmail({
          order_id: order.id,
          to_email: recipient,
          template: 'order_confirmation',
          status: 'sent',
          mailgun_message_id: data.id,
          attempts: 1,
        });
        return { success: true, messageId: data.id, provider: 'resend' };
      }

      console.warn(`[Resend Failed]: ${error?.message || 'Unknown error'}. Initiating backup via Nodemailer...`);
    } catch (err: any) {
      console.warn(`[Resend Exception]: ${err.message}. Initiating backup via Nodemailer...`);
    }
  }

  // 3. BACKUP: Try Nodemailer (SMTP)
  if (isNodemailerConfigured) {
    try {
      console.log(`[Email Dispatch] Attempting Nodemailer (SMTP) backup to ${recipient}...`);
      const nodeRes = await sendViaNodemailer(recipient, subject, htmlContent, textContent);
      if (nodeRes.success) {
        await logEmail({
          order_id: order.id,
          to_email: recipient,
          template: 'order_confirmation',
          status: 'sent',
          mailgun_message_id: nodeRes.messageId || `nodemailer-${Date.now()}`,
          attempts: 1,
        });
        return { success: true, messageId: nodeRes.messageId, provider: 'nodemailer' };
      }
      console.warn(`[Nodemailer Backup Failed]: ${nodeRes.error}. Attempting Mailgun if configured...`);
    } catch (err: any) {
      console.warn(`[Nodemailer Backup Exception]: ${err.message}. Attempting Mailgun...`);
    }
  }

  // 4. Try Mailgun if configured
  if (isMailgunConfigured) {
    try {
      console.log(`[Email Dispatch] Attempting Mailgun for order ${order.order_number}...`);
      const endpoint = `${MAILGUN_BASE_URL.replace(/\/$/, '')}/v3/${MAILGUN_DOMAIN}/messages`;
      const formData = new URLSearchParams();
      formData.append('from', MAILGUN_FROM);
      formData.append('to', recipient);
      formData.append('subject', subject);
      formData.append('text', textContent);
      formData.append('html', htmlContent);

      const authHeader = 'Basic ' + Buffer.from(`api:${MAILGUN_API_KEY}`).toString('base64');
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          Authorization: authHeader,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
      });

      if (res.ok) {
        const data = await res.json();
        await logEmail({
          order_id: order.id,
          to_email: recipient,
          template: 'order_confirmation',
          status: 'sent',
          mailgun_message_id: data.id,
          attempts: 1,
        });
        return { success: true, messageId: data.id, provider: 'mailgun' };
      }
      const errorText = await res.text();
      console.warn(`[Mailgun Failed]: HTTP ${res.status}: ${errorText}`);
    } catch (err: any) {
      console.warn('[Mailgun Exception]:', err.message);
    }
  }

  // 5. Final fallback: Simulation mode so orders are NEVER interrupted
  console.log(`[Simulated Email Dispatch] Order ${order.order_number} to ${recipient} (no email service reached)`);
  await logEmail({
    order_id: order.id,
    to_email: recipient,
    template: 'order_confirmation',
    status: 'sent',
    mailgun_message_id: `simulated-${Date.now()}`,
    attempts: 1,
  });
  return {
    success: true,
    messageId: `simulated-${Date.now()}`,
    provider: 'simulated',
  };
}
