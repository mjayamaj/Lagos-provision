const fs = require('fs');
const path = require('path');

const MISSING = [
  { file: 'ducros-curry.jpg', q: 'Ducros Curry' },
  { file: 'ducros-thyme.jpg', q: 'Ducros Thyme' },
  { file: 'dangote-salt.jpg', q: 'Dangote Salt' },
  { file: 'cameroon-pepper.jpg', q: 'Cameroon pepper' },
  { file: 'suya-pepper.jpg', q: 'Suya pepper' },
  { file: 'iru-locust-beans.jpg', q: 'Locust beans' },
  { file: 'exeter-corned-beef.jpg', q: 'Corned Beef' },
  { file: 'sweet-corn.jpg', q: 'Sweet Corn' },
  { file: 'heinz-salad-cream.jpg', q: 'Salad Cream' },
  { file: 'heinz-ketchup.jpg', q: 'Tomato Ketchup' },
  { file: 'canned-tomatoes.jpg', q: 'Peeled Plum Tomatoes' },
  { file: 'dangote-sugar.jpg', q: 'Dangote Sugar' },
  { file: 'baking-powder.jpg', q: 'Baking Powder' },
  { file: 'fermipan-yeast.jpg', q: 'Dry Yeast' },
  { file: 'ogi-pap.jpg', q: 'Ogi Pap' },
  { file: 'lafun.jpg', q: 'Lafun' },
  { file: 'roasted-groundnuts.jpg', q: 'Roasted Groundnut' },
  { file: 'cashew-nuts.jpg', q: 'Cashew Nuts' },
  { file: 'baby-shrimps.jpg', q: 'Dried Shrimps' }
];

async function searchJumia(q) {
  const url = `https://www.jumia.com.ng/catalog/?q=${encodeURIComponent(q)}`;
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    if (!res.ok) return null;
    const html = await res.text();
    const regex = /<article class="prd _fb col c-prd"[\s\S]*?data-moengage-product_name="([^"]+)"[\s\S]*?data-moengage-product_image="([^"]+)"/g;
    let match;
    const results = [];
    while ((match = regex.exec(html)) !== null) {
      results.push({
        title: match[1],
        img: match[2].replace('300x300', '680x680')
      });
    }
    return results;
  } catch (e) {
    return null;
  }
}

async function download(url, dest) {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    if (!res.ok) return false;
    const buf = await res.arrayBuffer();
    if (buf.byteLength < 2000) return false;
    fs.writeFileSync(dest, Buffer.from(buf));
    return buf.byteLength;
  } catch (e) {
    return false;
  }
}

async function run() {
  const destDir = path.join(__dirname, '..', 'public', 'images', 'products');
  for (const item of MISSING) {
    console.log(`Searching for "${item.q}" -> ${item.file}...`);
    const results = await searchJumia(item.q);
    if (results && results.length > 0) {
      console.log(`  Top match: "${results[0].title}"`);
      const size = await download(results[0].img, path.join(destDir, item.file));
      if (size) {
        console.log(`  ✅ SAVED ${item.file} (${size} bytes)`);
      } else {
        console.log(`  ❌ Failed to download from ${results[0].img}`);
      }
    } else {
      console.log(`  ❌ No Jumia results for "${item.q}"`);
    }
    await new Promise(r => setTimeout(r, 600));
  }
}

run();
