const fs = require('fs');

async function testJumiaSearch(query) {
  const url = `https://www.jumia.com.ng/groceries/?q=${encodeURIComponent(query)}`;
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
  });
  const html = await res.text();
  
  const regex = /data-moengage-product_name="([^"]+)"\s+data-moengage-product_price="[^"]*"\s+data-moengage-product_image="([^"]+)"/g;
  let m;
  const items = [];
  while ((m = regex.exec(html)) !== null) {
    items.push({
      name: m[1],
      image: m[2].replace('fit-in/300x300', 'fit-in/680x680')
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

  console.log(`Results for "${query}": found ${unique.length} products`);
  unique.slice(0, 3).forEach((p, idx) => console.log(`  [${idx + 1}] ${p.name} -> ${p.image}`));
  return unique;
}

async function run() {
  await testJumiaSearch('semovita');
  await testJumiaSearch('rice');
  await testJumiaSearch('peak milk');
  await testJumiaSearch('sardines');
  await testJumiaSearch('bournvita');
  await testJumiaSearch('milo');
  await testJumiaSearch('sugar');
  await testJumiaSearch('oil');
}

run();
