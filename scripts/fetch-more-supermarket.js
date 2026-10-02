const fs = require('fs');
const path = require('path');

const ITEMS = [
  {
    pageUrl: 'https://freshtodommot.com/products/freshly-smoked-catfish',
    dest: 'fish.jpg',
    name: 'Smoked Catfish'
  },
  {
    pageUrl: 'https://freshtodommot.com/products/white-beans',
    dest: 'beans-white.jpg',
    name: 'White Beans'
  },
  {
    pageUrl: 'https://freshtodommot.com/products/white-yam-large',
    dest: 'yam.jpg',
    name: 'Yam Tubers'
  },
  {
    pageUrl: 'https://freshtodommot.com/products/eggs-crate',
    dest: 'eggs.jpg',
    name: 'Crate of Eggs'
  },
  {
    pageUrl: 'https://freshtodommot.com/products/round-tomatoes',
    dest: 'fresh-tomatoes.jpg',
    name: 'Fresh Tomatoes Basket'
  },
  {
    pageUrl: 'https://freshtodommot.com/products/scotch-bonnet-atarodo',
    dest: 'fresh-peppers.jpg',
    name: 'Fresh Ata Rodo Peppers'
  },
  {
    pageUrl: 'https://freshtodommot.com/products/red-onions',
    dest: 'onions.jpg',
    name: 'Red Onions'
  }
];

async function run() {
  const productsDir = path.join(__dirname, '..', 'public', 'images', 'products');
  for (const item of ITEMS) {
    try {
      console.log(`[SCRAPING] ${item.name} from ${item.pageUrl}...`);
      const res = await fetch(item.pageUrl, {
        headers: { 'User-Agent': 'Mozilla/5.0' }
      });
      if (!res.ok) {
        console.log(`[PAGE FAILED ${res.status}] ${item.name}`);
        continue;
      }
      const html = await res.text();
      const m = html.match(/property="og:image"\s+content="([^"]+)"/i) || html.match(/content="([^"]+)"\s+property="og:image"/i);
      if (!m) {
        console.log(`[NO OG:IMAGE] ${item.name}`);
        continue;
      }
      let imgUrl = m[1];
      if (imgUrl.startsWith('//')) {
        imgUrl = 'https:' + imgUrl;
      }
      console.log(`[DOWNLOADING] ${imgUrl}...`);
      const imgRes = await fetch(imgUrl, {
        headers: { 'User-Agent': 'Mozilla/5.0' }
      });
      if (!imgRes.ok) {
        console.log(`[IMG FAILED ${imgRes.status}] ${item.name}`);
        continue;
      }
      const buf = await imgRes.arrayBuffer();
      const destPath = path.join(productsDir, item.dest);
      fs.writeFileSync(destPath, Buffer.from(buf));
      console.log(`[SAVED] ${item.dest} (${buf.byteLength} bytes)`);
    } catch (e) {
      console.log(`[ERROR] ${item.name}: ${e.message}`);
    }
  }
  console.log('Done scraping Freshtodommot!');
}

run();
