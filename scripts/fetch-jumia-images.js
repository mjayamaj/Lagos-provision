const fs = require('fs');
const path = require('path');

const PRODUCTS_TO_FETCH = [
  { key: 'indomie', query: 'indomie instant noodles chicken flavour carton', file: 'indomie.jpg' },
  { key: 'mama-gold-rice', query: 'mama gold parboiled rice', file: 'mama-gold-rice-10kg.jpg' },
  { key: 'golden-penny-semovita', query: 'golden penny semovita', file: 'semovita.jpg' },
  { key: 'golden-penny-spaghetti', query: 'golden penny spaghetti 500g', file: 'spaghetti.jpg' },
  { key: 'golden-penny-macaroni', query: 'golden penny macaroni 500g', file: 'macaroni.jpg' },
  { key: 'peak-milk-tin', query: 'peak evaporated milk tin', file: 'milk-tin.jpg' },
  { key: 'nestle-milo', query: 'nestle milo refill 800g 900g', file: 'milo-tin.jpg' },
  { key: 'gino-tomato', query: 'gino tomato paste sachet', file: 'tomato-tin.jpg' },
  { key: 'titus-sardine', query: 'titus sardines vegetable oil', file: 'sardine.jpg' },
  { key: 'devon-kings-oil', query: 'devon kings vegetable cooking oil', file: 'oil-1l.jpg' },
  { key: 'devon-kings-keg', query: 'devon kings vegetable oil 5l', file: 'oil-keg.jpg' },
  { key: 'golden-morn', query: 'nestle golden morn cereal', file: 'cereal.jpg' },
  { key: 'maggi-star', query: 'maggi star seasoning cubes', file: 'spices.jpg' },
  { key: 'st-louis-sugar', query: 'st louis sugar cubes', file: 'sugar.jpg' },
  { key: 'blue-band', query: 'blue band margarine 500g', file: 'margarine.jpg' },
  { key: 'bama-mayo', query: 'bama mayonnaise jar', file: 'sauce.jpg' },
  { key: 'morning-fresh', query: 'morning fresh dishwashing liquid 1000ml', file: 'household.jpg' },
  { key: 'dettol-soap', query: 'dettol cool soap bar', file: 'soap.jpg' },
  { key: 'close-up', query: 'closeup red hot toothpaste', file: 'personal-care.jpg' },
  { key: 'maltina', query: 'maltina can pack', file: 'drinks.jpg' },
  { key: 'quaker-oats', query: 'quaker oats 1kg', file: 'oats.jpg' },
  { key: 'heinz-beans', query: 'heinz baked beans in tomato sauce', file: 'canned-beans.jpg' },
  { key: 'ola-ola-poundo', query: 'ola ola poundo yam flour', file: 'flour.jpg' }
];

async function searchAndDownload(item) {
  try {
    const searchUrl = `https://www.jumia.com.ng/catalog/?q=${encodeURIComponent(item.query)}`;
    console.log(`[SEARCHING] ${item.query}...`);
    
    const searchRes = await fetch(searchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    if (!searchRes.ok) {
      console.log(`[WARN] Search failed for ${item.key}: ${searchRes.status}`);
      return false;
    }

    const html = await searchRes.text();

    // Match product link from Jumia catalog
    // Pattern: href="/(something-[0-9]+\.html)"
    const linkMatch = html.match(/href="(\/[a-zA-Z0-9\-]+-[0-9]+\.html)"/);
    if (!linkMatch) {
      // Or try matching an image directly from catalog
      const imgDirectMatch = html.match(/data-src="(https:\/\/ng\.jumia\.is\/unsafe\/fit-in\/[^"]+)"/);
      if (imgDirectMatch) {
        return await downloadImage(imgDirectMatch[1], item.file);
      }
      console.log(`[NOT FOUND] No product link found for ${item.key}`);
      return false;
    }

    const productPageUrl = `https://www.jumia.com.ng${linkMatch[1]}`;
    const productRes = await fetch(productPageUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    if (!productRes.ok) {
      console.log(`[WARN] Product page failed for ${item.key}`);
      return false;
    }

    const prodHtml = await productRes.text();
    const ogMatch = prodHtml.match(/property="og:image"\s+content="([^"]+)"/i) || prodHtml.match(/content="([^"]+)"\s+property="og:image"/i);
    if (!ogMatch) {
      console.log(`[NOT FOUND] No og:image found on product page for ${item.key}`);
      return false;
    }

    return await downloadImage(ogMatch[1], item.file);
  } catch (err) {
    console.error(`[ERROR] ${item.key}:`, err.message);
    return false;
  }
}

async function downloadImage(imgUrl, filename) {
  try {
    const destPath = path.join(__dirname, '..', 'public', 'images', 'products', filename);
    const res = await fetch(imgUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    if (!res.ok) {
      console.log(`[WARN] Failed to download ${imgUrl}: ${res.status}`);
      return false;
    }
    const buffer = await res.arrayBuffer();
    fs.writeFileSync(destPath, Buffer.from(buffer));
    console.log(`[SUCCESS] Downloaded ${filename} (${buffer.byteLength} bytes) from ${imgUrl}`);
    return true;
  } catch (err) {
    console.error(`[ERROR] Download failed for ${filename}:`, err.message);
    return false;
  }
}

async function run() {
  console.log(`Starting fetch for ${PRODUCTS_TO_FETCH.length} core Nigerian supermarket items...`);
  for (const item of PRODUCTS_TO_FETCH) {
    await searchAndDownload(item);
    // Be polite to server
    await new Promise(r => setTimeout(r, 600));
  }
  console.log('Finished!');
}

run();
