const fs = require('fs');

async function testSingleKeyword(brand) {
  const url = `https://www.jumia.com.ng/catalog/?q=${encodeURIComponent(brand)}`;
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
  });
  const html = await res.text();
  const m = html.match(/data-moengage-product_name="([^"]+)"\s+data-moengage-product_price="[^"]*"\s+data-moengage-product_image="([^"]+)"/);
  if (m) {
    console.log(`[FOUND] ${brand}: ${m[1]} -> ${m[2].replace('fit-in/300x300', 'fit-in/680x680')}`);
    return { brand, name: m[1], url: m[2].replace('fit-in/300x300', 'fit-in/680x680') };
  } else {
    console.log(`[NOT FOUND] ${brand}`);
    return null;
  }
}

async function run() {
  const brands = [
    'Indomie', 'Semovita', 'Spaghetti', 'Macaroni', 'Peak',
    'Milo', 'Bournvita', 'Titus', 'Gino', 'Knorr',
    'Maggi', 'Ariel', 'Hypo', 'Dettol', 'Maltina',
    'Chivita', 'Lipton', 'Oats', 'Honey', 'Mayonnaise',
    'Cornflakes', 'Custard', 'Pampers', 'Harpic', 'Sugar',
    'Toothpaste', 'Vaseline', 'Nivea', 'Groundnut', 'Garri'
  ];

  for (const b of brands) {
    await testSingleKeyword(b);
    await new Promise(r => setTimeout(r, 400));
  }
}

run();
