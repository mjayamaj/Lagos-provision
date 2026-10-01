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

console.log('Unique image URLs found:', urls.size);
console.log(Array.from(urls).sort());
