/**
 * Test Resend transactional email
 * Usage: node scripts/test-resend.js your_email@gmail.com
 */

const fs = require('fs');
const path = require('path');
const { Resend } = require('resend');

// Read .env.local
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

const apiKey = process.env.RESEND_API_KEY || '';
const from = process.env.RESEND_FROM || 'Lagos Provision <onboarding@resend.dev>';
const recipient = process.argv[2] || process.env.TEST_EMAIL || 'delivered@resend.dev';

console.log('--- Testing Resend Configuration ---');
console.log('API Key:', apiKey ? `${apiKey.slice(0, 8)}...` : '(Not configured)');
console.log('From:', from);
console.log('Recipient:', recipient);
console.log('-----------------------------------');

if (!apiKey || apiKey.includes('your-resend-api-key')) {
  console.log('\n⚠️ RESEND_API_KEY is not configured yet in .env.local.');
  console.log('1. Go to https://resend.com and sign up (Free, no credit card required).');
  console.log('2. Create an API Key in your Resend dashboard.');
  console.log('3. Add to your .env.local:');
  console.log('   RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx');
  console.log('   RESEND_FROM="Lagos Provision <onboarding@resend.dev>"\n');
  process.exit(0);
}

async function sendTest() {
  try {
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from,
      to: recipient,
      subject: 'Test Order Confirmation — Lagos Provision',
      html: `
        <div style="font-family: Arial, sans-serif; background: #FBF6EA; padding: 30px;">
          <div style="max-width: 500px; margin: 0 auto; background: #FFFFFF; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
            <div style="background: #0B4A3A; padding: 20px; text-align: center;">
              <h2 style="color: #FFFFFF; margin: 0;">LAGOS PROVISION</h2>
              <p style="color: #F4B63F; margin: 4px 0 0; font-size: 12px; letter-spacing: 1px;">RESEND SETUP VERIFIED</p>
            </div>
            <div style="padding: 24px; text-align: center;">
              <h3 style="color: #1F2A25;">Your Resend Integration Works! 🎉</h3>
              <p style="color: #4B5563; font-size: 14px; line-height: 1.5;">
                Real transactional emails for Lagos Provision Pay on Delivery orders will now be sent to your customers!
              </p>
            </div>
          </div>
        </div>
      `,
      text: 'Your Resend Integration with Lagos Provision is active and working!',
    });

    if (error) {
      console.error('\n❌ Resend returned an error:', error.message);
      if (error.message.includes('validation_error') || error.message.includes('domain')) {
        console.log('\n💡 TIP: With the free onboarding@resend.dev domain, Resend allows sending directly to the email you used to register at resend.com!');
      }
    } else {
      console.log('\n✅ Email successfully sent via Resend!');
      console.log('Email ID:', data.id);
    }
  } catch (err) {
    console.error('\n❌ Network or execution error:', err.message);
  }
}

sendTest();
