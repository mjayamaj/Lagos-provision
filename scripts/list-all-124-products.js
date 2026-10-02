const fs = require('fs');

function extract(file) {
  const content = fs.readFileSync(file, 'utf8');
  const items = [];
  const prodRegex = /\{[\s\r\n]*id:\s*'([^']+)'[\s\S]*?category_slug:\s*'([^']+)'[\s\S]*?name:\s*'([^']+)'[\s\S]*?slug:\s*'([^']+)'[\s\S]*?image_url:\s*'([^']+)'[\s\S]*?brand:\s*'([^']+)'/g;
  let m;
  while ((m = prodRegex.exec(content)) !== null) {
    items.push({ id: m[1], cat: m[2], name: m[3], slug: m[4], img: m[5], brand: m[6], file });
  }
  return items;
}

const all = [...extract('src/data/catalog.ts'), ...extract('src/data/extra-products.ts')];
all.forEach((p, idx) => {
  console.log(`[${idx+1}] [${p.cat}] ${p.name} | Brand: ${p.brand} | Img: ${p.img}`);
});
