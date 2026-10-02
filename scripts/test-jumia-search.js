async function searchJumia(query) {
  const url = `https://www.jumia.com.ng/catalog/?q=${encodeURIComponent(query)}`;
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    console.log(`Query: "${query}" - Status: ${res.status}`);
    if (!res.ok) return null;
    const html = await res.text();
    
    // Extract articles
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
  } catch (err) {
    console.error(`Error searching ${query}:`, err.message);
    return null;
  }
}

async function run() {
  const testQueries = ['Ariel detergent', 'Hypo bleach', 'Dettol liquid', 'Harpic toilet', 'Raid insecticide'];
  for (const q of testQueries) {
    const items = await searchJumia(q);
    if (items && items.length > 0) {
      console.log(`Found ${items.length} items for "${q}":`);
      items.slice(0, 2).forEach(it => console.log(`  - ${it.title}: ${it.img}`));
    } else {
      console.log(`No items found for "${q}"`);
    }
  }
}

run();
