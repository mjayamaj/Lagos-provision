const fs = require('fs');
const path = require('path');

const catalogCode = fs.readFileSync(path.join(__dirname, '../src/data/catalog.ts'), 'utf8');
const extraCode = fs.readFileSync(path.join(__dirname, '../src/data/extra-products.ts'), 'utf8');

const regex = /image_url:\s*['"]([^'"]+)['"]/g;
const urls = new Set();
let match;
while ((match = regex.exec(catalogCode)) !== null) {
  urls.add(match[1]);
}
while ((match = regex.exec(extraCode)) !== null) {
  urls.add(match[1]);
}

const existingJpgs = new Set(
  fs.readdirSync(path.join(__dirname, '../public/images/products'))
    .filter(f => f.endsWith('.jpg'))
    .map(f => f.replace('.jpg', ''))
);

const missing = [];
for (const u of urls) {
  const base = path.basename(u).replace(/\.(svg|jpg|png)$/, '');
  if (!existingJpgs.has(base)) {
    missing.push(base);
  }
}

console.log('Total URLs needed:', urls.size);
console.log('Existing JPGs:', existingJpgs.size);
console.log('Missing JPGs:', missing);
