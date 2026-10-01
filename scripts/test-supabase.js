const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '../.env.local');
const content = fs.readFileSync(envPath, 'utf8');
const env = {};
content.split('\n').forEach(line => {
  const t = line.trim();
  if (!t || t.startsWith('#')) return;
  const idx = t.indexOf('=');
  if (idx !== -1) {
    env[t.slice(0, idx).trim()] = t.slice(idx + 1).trim();
  }
});

const url = env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = env.SUPABASE_SERVICE_ROLE_KEY;
const anonKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('Testing Supabase connection...');
console.log('URL:', url);

async function test() {
  const adminClient = createClient(url, serviceKey, { auth: { persistSession: false } });
  
  // Test 1: Query categories
  const { data: categories, error: catError } = await adminClient.from('categories').select('count', { count: 'exact' });
  if (catError) {
    console.error('Categories query error:', catError.message);
  } else {
    console.log('Categories count in database:', categories ? categories.length : 'ok', catError ? '' : '(Table exists!)');
  }

  // Test 2: Query products
  const { data: products, error: prodError } = await adminClient.from('products').select('count', { count: 'exact' });
  if (prodError) {
    console.error('Products query error:', prodError.message);
  } else {
    console.log('Products count in database:', products ? products.length : 'ok', prodError ? '' : '(Table exists!)');
  }
}

test();
