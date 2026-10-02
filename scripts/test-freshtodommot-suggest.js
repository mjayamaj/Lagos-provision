async function testShopifySuggest(query) {
  const url = `https://freshtodommot.com/search/suggest.json?q=${encodeURIComponent(query)}&resources[type]=product`;
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    console.log(`Status for "${query}":`, res.status);
    if (!res.ok) return null;
    const json = await res.json();
    const products = json.resources.results.products || [];
    console.log(`Found ${products.length} products:`);
    products.forEach(p => {
      console.log(`  - ${p.title} -> ${p.image}`);
    });
    return products;
  } catch (err) {
    console.error('Error:', err.message);
    return null;
  }
}

async function run() {
  await testShopifySuggest('curry');
  await testShopifySuggest('thyme');
  await testShopifySuggest('salt');
  await testShopifySuggest('cameroon pepper');
  await testShopifySuggest('suya');
  await testShopifySuggest('locust beans');
  await testShopifySuggest('corned beef');
  await testShopifySuggest('sweet corn');
  await testShopifySuggest('salad cream');
  await testShopifySuggest('ketchup');
  await testShopifySuggest('peeled tomatoes');
  await testShopifySuggest('groundnut');
  await testShopifySuggest('cashew');
  await testShopifySuggest('crayfish');
}

run();
