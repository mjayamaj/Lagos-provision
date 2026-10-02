/**
 * Test Nodemailer (SMTP) email delivery
 * 
 * Usage:
 *   node scripts/test-nodemailer.js [recipient_email]
 */

const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

// Load .env.local
const envLocalPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envLocalPath)) {
  const envContent = fs.readFileSync(envLocalPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
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
    }
  });
}

const host = process.env.SMTP_HOST || 'smtp.gmail.com';
const port = parseInt(process.env.SMTP_PORT || '465', 10);
const secure = process.env.SMTP_SECURE !== undefined ? process.env.SMTP_SECURE === 'true' : port === 465;
const user = process.env.SMTP_USER || '';
const pass = process.env.SMTP_PASS || '';
const from = process.env.SMTP_FROM || user || 'Lagos Provision <orders@lagosprovision.ng>';
const service = process.env.SMTP_SERVICE || '';

const recipient = process.argv[2] || user || 'test@example.com';

console.log('--- Testing Nodemailer (SMTP) Configuration ---');
console.log(`Service:   ${service || '(custom host)'}`);
console.log(`Host:      ${host}`);
console.log(`Port:      ${port}`);
console.log(`Secure:    ${secure}`);
console.log(`User:      ${user ? user.slice(0, 4) + '***' : '(not set)'}`);
console.log(`From:      ${from}`);
console.log(`Recipient: ${recipient}`);
console.log('------------------------------------------------');

if (!user || !pass || user.includes('your-email') || pass.includes('your-password')) {
  console.log('\n⚠️ SMTP credentials are not configured yet in .env.local.');
  console.log('\nTo configure Nodemailer with Gmail:');
  console.log('1. Go to your Google Account -> Security -> 2-Step Verification -> App passwords');
  console.log('2. Generate a 16-character App Password (name it "Lagos Provision")');
  console.log('3. Add the following to your .env.local:');
  console.log('   SMTP_HOST=smtp.gmail.com');
  console.log('   SMTP_PORT=465');
  console.log('   SMTP_SECURE=true');
  console.log('   SMTP_USER=your_email@gmail.com');
  console.log('   SMTP_PASS=xxxx xxxx xxxx xxxx');
  console.log('   SMTP_FROM="Lagos Provision <your_email@gmail.com>"');
  console.log('\nOr for custom cPanel/Titan/Zoho mail:');
  console.log('   SMTP_HOST=mail.yourdomain.com');
  console.log('   SMTP_PORT=465');
  console.log('   SMTP_USER=orders@yourdomain.com');
  console.log('   SMTP_PASS=your_email_password\n');
  process.exit(0);
}

async function sendTest() {
  try {
    const config = service ? {
      service,
      auth: { user, pass }
    } : {
      host,
      port,
      secure,
      auth: { user, pass },
      tls: {
        rejectUnauthorized: false
      }
    };

    const transporter = nodemailer.createTransport(config);

    console.log('Verifying SMTP connection...');
    await transporter.verify();
    console.log('✅ SMTP connection verified successfully!');

    console.log(`Sending test email to ${recipient}...`);
    const info = await transporter.sendMail({
      from,
      to: recipient,
      subject: 'Test Transactional Email — Lagos Provision (Nodemailer Backup)',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 24px; background: #FAF7F2; border-radius: 12px; border: 1px solid #E5E7EB;">
          <h2 style="color: #0B4A3A; margin-top: 0;">Lagos Provision</h2>
          <p style="font-size: 16px; color: #1F2A25;">Your Nodemailer SMTP backup integration is active and working perfectly! 🎉</p>
          <p style="font-size: 14px; color: #6B7280;">Transactional order confirmations will now deliver reliably via SMTP whenever Resend encounters limits or domain restrictions.</p>
          <div style="margin-top: 20px; padding: 12px; background: #FFFFFF; border-radius: 8px; font-size: 12px; color: #9CA3AF;">
            Sent via Nodemailer • Message ID: ${Date.now()}
          </div>
        </div>
      `,
      text: 'Your Nodemailer SMTP integration is working successfully!'
    });

    console.log('\n✅ Email successfully sent via Nodemailer!');
    console.log('Message ID:', info.messageId);
  } catch (err) {
    console.error('\n❌ Nodemailer delivery failed:');
    console.error(err.message);
  }
}

sendTest();
