const fs = require('fs');

async function testPlusSearch(q) {
  const url = `https://www.jumia.com.ng/catalog/?q=${q.replace(/\s+/g, '+')}`;
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
  });
  const html = await res.text();
  const m = html.match(/data-moengage-product_name="([^"]+)"\s+data-moengage-product_price="[^"]*"\s+data-moengage-product_image="([^"]+)"/);
  if (m) {
    console.log(`[FOUND] ${q}: ${m[1]} -> ${m[2]}`);
  } else {
    // Try matching any /product/ image
    const imgM = html.match(/https:\/\/ng\.jumia\.is\/unsafe\/fit-in\/[0-9x]+\/filters:fill\(white\)\/product\/[0-9\/]+\/[0-9]+\.jpg\?[0-9]+/);
    if (imgM) {
      console.log(`[IMG FOUND] ${q}: -> ${imgM[0]}`);
    } else {
      console.log(`[NOT FOUND] ${q}`);
    }
  }
}

async function run() {
  await testPlusSearch('Mama Gold rice');
  await testPlusSearch('Peak evaporated milk');
  await testPlusSearch('Titus sardines');
  await testPlusSearch('Golden Penny Semovita');
  await testPlusSearch('St Louis sugar');
  await testPlusSearch('Blue Band margarine');
  await testPlusSearch('Dettol soap');
  await testPlusSearch('Bama mayonnaise');
  await testPlusSearch('Maltina');
  await testPlusSearch('Indomie chicken');
  await testPlusSearch('Devon Kings oil');
  await testPlusSearch('Gino tomato paste');
  await testPlusSearch('Ariel detergent');
}

run();
