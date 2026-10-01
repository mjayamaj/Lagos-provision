const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  path.join(__dirname, '../src/data/catalog.ts'),
  path.join(__dirname, '../src/data/extra-products.ts'),
  path.join(__dirname, '../supabase/seed.sql'),
];

for (const file of filesToUpdate) {
  let content = fs.readFileSync(file, 'utf8');
  const countBefore = (content.match(/\/images\/products\/[a-zA-Z0-9_-]+\.svg/g) || []).length;
  content = content.replace(/\/images\/products\/([a-zA-Z0-9_-]+)\.svg/g, '/images/products/$1.jpg');
  fs.writeFileSync(file, content, 'utf8');
  console.log(`Updated ${path.basename(file)}: ${countBefore} SVG references replaced with JPG`);
}

// Verification step: check if any product points to a non-existent file
const productFiles = new Set(fs.readdirSync(path.join(__dirname, '../public/images/products')));
const catalogCode = fs.readFileSync(path.join(__dirname, '../src/data/catalog.ts'), 'utf8');
const extraCode = fs.readFileSync(path.join(__dirname, '../src/data/extra-products.ts'), 'utf8');

const regex = /image_url:\s*['"]\/images\/products\/([^'"]+)['"]/g;
const missing = new Set();
let match;

while ((match = regex.exec(catalogCode)) !== null) {
  if (!productFiles.has(match[1])) {
    missing.add(match[1]);
  }
}
while ((match = regex.exec(extraCode)) !== null) {
  if (!productFiles.has(match[1])) {
    missing.add(match[1]);
  }
}

if (missing.size > 0) {
  console.error('Warning! Missing files in public/images/products:', Array.from(missing));
} else {
  console.log('SUCCESS: All product image URLs resolve directly to existing real JPG photos!');
}
