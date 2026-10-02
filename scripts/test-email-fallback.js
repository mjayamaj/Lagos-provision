const fs = require('fs');
const path = require('path');

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

// Import compiled or transpile test
console.log('Testing email dispatch pipeline...');
console.log('Config status:');
console.log('  RESEND_API_KEY present:', Boolean(process.env.RESEND_API_KEY));
console.log('  SMTP_USER present:', Boolean(process.env.SMTP_USER));
console.log('  EMAIL_PROVIDER:', process.env.EMAIL_PROVIDER || 'resend');
