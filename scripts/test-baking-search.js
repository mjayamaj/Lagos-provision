async function search(q) {
  const url = `https://freshtodommot.com/search/suggest.json?q=${encodeURIComponent(q)}&resources[type]=product`;
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  if (!res.ok) return;
  const json = await res.json();
  const prods = json.resources.results.products || [];
  console.log(`\nQuery: ${q} (${prods.length} results):`);
  prods.forEach(p => console.log(`  - ${p.title}: ${p.image}`));
}

async function run() {
  await search('baking powder');
  await search('yeast');
  await search('pap');
  await search('cassava flour');
}

run();
