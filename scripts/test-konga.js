const fs = require('fs');

async function testKonga(query) {
  try {
    const url = `https://api.konga.com/v1/search?query=${encodeURIComponent(query)}&page=0&limit=5`;
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    if (res.ok) {
      const data = await res.json();
      console.log(`Konga API for "${query}": status ${res.status}`);
      if (data && data.data && data.data.products) {
        data.data.products.slice(0, 3).forEach(p => {
          console.log(`  Konga: ${p.name} -> https://www-konga-com-res.cloudinary.com/image/upload/v1/media/catalog/product/${p.image}`);
        });
      }
    } else {
      console.log(`Konga API status: ${res.status}`);
    }
  } catch (e) {
    console.log(`Konga error:`, e.message);
  }
}

async function run() {
  await testKonga('milo');
  await testKonga('semovita');
  await testKonga('indomie');
  await testKonga('peak milk');
  await testKonga('golden penny spaghetti');
}

run();
