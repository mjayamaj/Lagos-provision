const fs = require('fs');

async function scrapeJumiaCategory(catUrl, name) {
  try {
    const res = await fetch(`https://www.jumia.com.ng/${catUrl}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    if (!res.ok) {
      console.log(`Failed ${catUrl}: ${res.status}`);
      return [];
    }
    const html = await res.text();
    const regex = /data-moengage-product_name="([^"]+)"\s+data-moengage-product_price="[^"]*"\s+data-moengage-product_image="([^"]+)"/g;
    let m;
    const items = [];
    while ((m = regex.exec(html)) !== null) {
      items.push({
        name: m[1],
        image: m[2].replace('fit-in/300x300', 'fit-in/680x680'),
        category: name
      });
    }

    const unique = [];
    const seen = new Set();
    for (const it of items) {
      if (!seen.has(it.image)) {
        seen.add(it.image);
        unique.push(it);
      }
    }
    console.log(`[CAT] ${name} (${catUrl}): found ${unique.length} products`);
    return unique;
  } catch (err) {
    console.error(`Error ${catUrl}:`, err.message);
    return [];
  }
}

async function run() {
  const categories = [
    { url: 'groceries/grains-rice/', name: 'Rice & Grains' },
    { url: 'groceries/pasta-pizza/', name: 'Pasta' },
    { url: 'dishwashing-supplies/', name: 'Dishwashing' },
    { url: 'laundry-detergent/', name: 'Detergents' },
    { url: 'household-cleaning-products/', name: 'Cleaning' },
    { url: 'oral-care-products/', name: 'Oral Care' },
    { url: 'body-soaps/', name: 'Soaps' },
  ];

  const existing = JSON.parse(fs.readFileSync('scripts/jumia-grocery-products.json', 'utf8') || '[]');
  const allFound = [...existing];
  
  for (const c of categories) {
    const prods = await scrapeJumiaCategory(c.url, c.name);
    allFound.push(...prods);
    await new Promise(r => setTimeout(r, 600));
  }

  // Deduplicate
  const seen = new Set();
  const deduped = [];
  for (const item of allFound) {
    if (!seen.has(item.image)) {
      seen.add(item.image);
      deduped.push(item);
    }
  }

  console.log(`Total authentic Nigerian supermarket products found now: ${deduped.length}`);
  fs.writeFileSync('scripts/jumia-grocery-products.json', JSON.stringify(deduped, null, 2));
}

run();
