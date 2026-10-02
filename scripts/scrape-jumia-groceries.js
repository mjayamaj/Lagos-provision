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

    // Deduplicate
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
    { url: 'food-cupboard-supplies/', name: 'Food Cupboard' },
    { url: 'cooking-oil/', name: 'Cooking Oil' },
    { url: 'spices-seasonings/', name: 'Spices' },
    { url: 'pasta-noodles/', name: 'Pasta & Noodles' },
    { url: 'breakfast-foods/', name: 'Breakfast Foods' },
    { url: 'beverages/', name: 'Beverages' },
    { url: 'canned-packaged-foods/', name: 'Canned Foods' },
    { url: 'laundry-cleaning-detergents/', name: 'Laundry & Cleaning' },
  ];

  const allFound = [];
  for (const c of categories) {
    const prods = await scrapeJumiaCategory(c.url, c.name);
    allFound.push(...prods);
    await new Promise(r => setTimeout(r, 600));
  }

  console.log(`Total authentic Nigerian supermarket products found: ${allFound.length}`);
  fs.writeFileSync('scripts/jumia-grocery-products.json', JSON.stringify(allFound, null, 2));
  console.log('Saved to scripts/jumia-grocery-products.json');
}

run();
