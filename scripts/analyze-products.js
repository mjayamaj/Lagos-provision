const fs = require('fs');

function extractProducts(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const items = [];
  const regex = /id:\s*'([^']+)'[\s\S]*?name:\s*'([^']+)'[\s\S]*?image_url:\s*'([^']+)'[\s\S]*?brand:\s*'([^']*)'/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    items.push({
      id: match[1],
      name: match[2],
      imageUrl: match[3],
      brand: match[4]
    });
  }
  return items;
}

const catalogProducts = extractProducts('src/data/catalog.ts');
const extraProducts = extractProducts('src/data/extra-products.ts');
const all = [...catalogProducts, ...extraProducts];

const imgMap = {};
for (const p of all) {
  if (!imgMap[p.imageUrl]) {
    imgMap[p.imageUrl] = [];
  }
  imgMap[p.imageUrl].push(`${p.name} (${p.brand})`);
}

console.log('--- ALL 44 IMAGE FILES & THEIR PRODUCTS ---');
Object.keys(imgMap).sort().forEach(img => {
  console.log(`\nIMAGE: ${img}`);
  imgMap[img].forEach(p => console.log(`  - ${p}`));
});
