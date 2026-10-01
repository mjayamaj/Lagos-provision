/**
 * Test Mailgun transactional email configuration
 * Usage: node --env-file=.env.local scripts/test-mailgun.js [recipient@example.com]
 */

const fs = require('fs');
const path = require('path');

// Read .env.local if not already loaded into process.env
const envPath = path.join(__dirname, '../.env.local');
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, 'utf8');
  content.split('\n').forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;
    const idx = trimmed.indexOf('=');
    if (idx !== -1) {
      const key = trimmed.slice(0, idx).trim();
      let val = trimmed.slice(idx + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      if (!process.env[key]) {
        process.env[key] = val;
      }
    }
  });
}

const apiKey = process.env.MAILGUN_API_KEY || '';
const domain = process.env.MAILGUN_DOMAIN || '';
const from = process.env.MAILGUN_FROM || `Lagos Provision <orders@${domain || 'mg.lagosprovision.ng'}>`;
const baseUrl = process.env.MAILGUN_BASE_URL || 'https://api.mailgun.net';
const recipient = process.argv[2] || process.env.TEST_EMAIL || 'customer@example.com';

console.log('--- Testing Mailgun Configuration ---');
console.log('Domain:', domain || '(Not configured)');
console.log('From:', from);
console.log('Base URL:', baseUrl);
console.log('API Key:', apiKey ? `${apiKey.slice(0, 8)}...${apiKey.slice(-4)}` : '(Not configured)');
console.log('Recipient:', recipient);
console.log('-------------------------------------');

if (!apiKey || !domain || apiKey.includes('your-mailgun-api-key')) {
  console.log('\n⚠️ Mailgun is NOT configured yet in .env.local.');
  console.log('Please add the following to your .env.local file:');
  console.log('MAILGUN_API_KEY=key-xxxxxxxxxxxxxxxxxxxxxxxx');
  console.log('MAILGUN_DOMAIN=sandboxXXXXX.mailgun.org (or your custom domain)');
  console.log('MAILGUN_FROM="Lagos Provision <orders@yourdomain.com>"');
  console.log('MAILGUN_BASE_URL=https://api.mailgun.net\n');
  process.exit(0);
}

async function sendTest() {
  const endpoint = `${baseUrl.replace(/\/$/, '')}/v3/${domain}/messages`;
  const formData = new URLSearchParams();
  formData.append('from', from);
  formData.append('to', recipient);
  formData.append('subject', 'Test Order Confirmation — Lagos Provision');
  formData.append(
    'text',
    'This is a test transactional email from Lagos Provision confirming your Mailgun setup is 100% active!'
  );
  formData.append(
    'html',
    `
    <div style="font-family: Arial, sans-serif; background: #FBF6EA; padding: 30px;">
      <div style="max-width: 500px; margin: 0 auto; background: #FFFFFF; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
        <div style="background: #0B4A3A; padding: 20px; text-align: center;">
          <h2 style="color: #FFFFFF; margin: 0;">LAGOS PROVISION</h2>
          <p style="color: #F4B63F; margin: 4px 0 0; font-size: 12px; letter-spacing: 1px;">MAILGUN SETUP VERIFIED</p>
        </div>
        <div style="padding: 24px; text-align: center;">
          <h3 style="color: #1F2A25;">Your Mailgun Integration Works! 🎉</h3>
          <p style="color: #4B5563; font-size: 14px; line-height: 1.5;">
            Transactional emails for Pay on Delivery orders will now be delivered to your customers in real time.
          </p>
        </div>
      </div>
    </div>
  `
  );

  const authHeader = 'Basic ' + Buffer.from(`api:${apiKey}`).toString('base64');

  try {
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
      console.log('\n✅ Email successfully sent via Mailgun!');
      console.log('Message ID:', data.id);
      console.log('Message:', data.message);
    } else {
      const errText = await res.text();
      console.error('\n❌ Mailgun API returned an error:', res.status, errText);
      if (domain.includes('sandbox') && res.status === 400 && errText.includes('authorized')) {
        console.log('\n💡 TIP: For Mailgun sandbox domains, you MUST add the recipient email to "Authorized Recipients" in your Mailgun dashboard!');
      }
    }
  } catch (err) {
    console.error('\n❌ Network error sending test email:', err.message);
  }
}

sendTest();
