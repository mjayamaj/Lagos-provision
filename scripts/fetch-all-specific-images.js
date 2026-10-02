const fs = require('fs');
const path = require('path');

const TARGETS = [
  // Household & Cleaning
  { file: 'ariel-detergent.jpg', query: 'Ariel detergent powder 2kg', fallback: 'https://ng.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/73/1479914/1.jpg?5991' },
  { file: 'hypo-bleach.jpg', query: 'Hypo bleach 1L', fallback: 'https://ng.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/70/9611024/1.jpg?0209' },
  { file: 'dettol-antiseptic.jpg', query: 'Dettol antiseptic liquid 1L', fallback: 'https://ng.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/76/6607501/1.jpg?3022' },
  { file: 'rose-pearl-tissue.jpg', query: 'Toilet paper rolls pack', fallback: 'https://ng.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/46/382729/1.jpg?2267' },
  { file: 'morning-fresh.jpg', query: 'Morning Fresh dishwashing liquid 1L', fallback: 'https://ng.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/87/4830024/1.jpg?1893' },
  { file: 'harpic-cleaner.jpg', query: 'Harpic toilet cleaner power plus', fallback: 'https://ng.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/06/2561412/1.jpg?8265' },
  { file: 'raid-spray.jpg', query: 'Raid insecticide spray 300ml', fallback: 'https://ng.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/15/0892024/1.jpg?8082' },

  // Personal Care
  { file: 'closeup-toothpaste.jpg', query: 'Close Up toothpaste red hot', fallback: 'https://ng.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/51/8710024/1.jpg?7123' },
  { file: 'vaseline-jelly.jpg', query: 'Vaseline petroleum jelly 400ml', fallback: 'https://ng.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/34/485689/1.jpg?2649' },
  { file: 'always-pads.jpg', query: 'Always ultra sanitary pads', fallback: 'https://ng.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/21/5713763/1.jpg?4917' },
  { file: 'nivea-lotion.jpg', query: 'Nivea cocoa butter body lotion 400ml', fallback: 'https://ng.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/81/298489/1.jpg?1234' },
  { file: 'dettol-soap.jpg', query: 'Dettol cool soap pack', fallback: 'https://ng.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/32/362729/1.jpg?1174' },
  { file: 'dudu-osun.jpg', query: 'Dudu Osun black soap', fallback: 'https://ng.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/38/582729/1.jpg?5512' },

  // Beverages & Drinks
  { file: 'bournvita.jpg', query: 'Cadbury Bournvita refill 900g', fallback: 'https://ng.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/46/582729/1.jpg?1111' },
  { file: 'lipton-tea.jpg', query: 'Lipton yellow label tea bags', fallback: 'https://ng.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/61/8920024/1.jpg?3333' },
  { file: 'chivita-juice.jpg', query: 'Chivita 100 Real fruit juice 1L', fallback: 'https://ng.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/73/4527104/1.jpg?4444' },
  { file: 'eva-water.jpg', query: 'Eva premium water bottle pack', fallback: 'https://ng.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/12/3527104/1.jpg?5555' },
  { file: 'zobo-drink.jpg', query: 'Zobo drink hibiscus', fallback: 'https://ng.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/34/3527104/1.jpg?6666' },

  // Cereals, Breakfast & Baby
  { file: 'cerelac.jpg', query: 'Nestle Cerelac wheat milk 400g', fallback: 'https://ng.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/84/3810993/1.jpg?7777' },
  { file: 'kelloggs-cornflakes.jpg', query: 'Kellogg corn flakes', fallback: 'https://ng.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/55/3810993/1.jpg?8888' },
  { file: 'birds-custard.jpg', query: 'Birds custard powder', fallback: 'https://ng.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/92/3810993/1.jpg?9999' },
  { file: 'pampers.jpg', query: 'Pampers baby dry diapers size 4', fallback: 'https://ng.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/18/3810993/1.jpg?1010' },
  { file: 'baby-wipes.jpg', query: 'baby wet wipes pack', fallback: 'https://ng.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/28/3810993/1.jpg?2020' },

  // Spices & Seasonings
  { file: 'knorr-chicken.jpg', query: 'Knorr chicken seasoning cubes', fallback: 'https://ng.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/98/407399/1.jpg?8871' },
  { file: 'ducros-curry.jpg', query: 'Ducros curry powder 100g', fallback: 'https://ng.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/45/5713763/1.jpg?3030' },
  { file: 'ducros-thyme.jpg', query: 'Ducros thyme leaves 50g', fallback: 'https://ng.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/46/5713763/1.jpg?4040' },
  { file: 'dangote-salt.jpg', query: 'Dangote iodized salt 1kg', fallback: 'https://ng.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/14/5713763/1.jpg?5050' },
  { file: 'cameroon-pepper.jpg', query: 'Cameroon pepper black 100g', fallback: 'https://freshtodommot.com/cdn/shop/products/cameroon-pepper.jpg' },
  { file: 'suya-pepper.jpg', query: 'Suya pepper spice yaji', fallback: 'https://freshtodommot.com/cdn/shop/products/suya-pepper.jpg' },
  { file: 'iru-locust-beans.jpg', query: 'Locust beans iru woro', fallback: 'https://freshtodommot.com/cdn/shop/products/iru-woro.jpg' },
  { file: 'ginger-powder.jpg', query: 'Ginger powder 100g', fallback: 'https://ng.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/33/5713763/1.jpg?6060' },
  { file: 'garlic-powder.jpg', query: 'Garlic powder 100g', fallback: 'https://ng.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/34/5713763/1.jpg?7070' },

  // Canned, Sauces & Condiments
  { file: 'exeter-corned-beef.jpg', query: 'Exeter corned beef 340g', fallback: 'https://www-konga-com-res.cloudinary.com/image/upload/f_auto,q_auto,w_800,c_limit/media/catalog/product/E/X/exeter-corned-beef.jpg' },
  { file: 'sweet-corn.jpg', query: 'Green Giant sweet corn 340g', fallback: 'https://ng.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/18/4801812/1.jpg?8080' },
  { file: 'heinz-salad-cream.jpg', query: 'Heinz classic salad cream', fallback: 'https://ng.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/72/4801812/1.jpg?9090' },
  { file: 'heinz-ketchup.jpg', query: 'Heinz tomato ketchup', fallback: 'https://ng.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/83/4801812/1.jpg?1011' },
  { file: 'pure-honey.jpg', query: 'pure natural raw honey jar', fallback: 'https://ng.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/91/4801812/1.jpg?1212' },
  { file: 'canned-tomatoes.jpg', query: 'Cirio peeled plum tomatoes', fallback: 'https://ng.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/95/4801812/1.jpg?1313' },
  { file: 'gino-sachet.jpg', query: 'Gino tomato paste sachet pack', fallback: 'https://ng.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/51/4801812/1.jpg?1414' },

  // Sugar & Baking
  { file: 'dangote-sugar.jpg', query: 'Dangote granulated sugar 500g 1kg', fallback: 'https://www-konga-com-res.cloudinary.com/image/upload/f_auto,q_auto,w_800,c_limit/media/catalog/product/dangote-sugar.jpg' },
  { file: 'st-louis-sugar.jpg', query: 'St Louis sugar cubes 500g', fallback: 'https://www-konga-com-res.cloudinary.com/image/upload/f_auto,q_auto,w_800,c_limit/media/catalog/product/Y/S/171893_1677165598.jpg' },
  { file: 'baking-powder.jpg', query: 'Royal baking powder 100g', fallback: 'https://ng.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/38/4801812/1.jpg?1515' },
  { file: 'fermipan-yeast.jpg', query: 'Fermipan instant dry yeast', fallback: 'https://ng.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/48/4801812/1.jpg?1616' },

  // Noodles & Pasta
  { file: 'indomie-single.jpg', query: 'Indomie instant noodles chicken 70g', fallback: 'https://ng.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/98/3650024/1.jpg?7846' },
  { file: 'indomie-onion.jpg', query: 'Indomie onion chicken noodles carton', fallback: 'https://ng.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/88/3650024/1.jpg?7846' },
  { file: 'indomie-cup.jpg', query: 'Indomie cup noodles pack', fallback: 'https://ng.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/78/3650024/1.jpg?7846' },

  // Swallows & Flours
  { file: 'poundo-yam.jpg', query: 'Ayoola poundo yam 2kg', fallback: 'https://ng.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/43/5959814/1.jpg?7719' },
  { file: 'plantain-flour.jpg', query: 'Ayoola plantain flour', fallback: 'https://ng.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/45/5959814/1.jpg?7719' },
  { file: 'wheat-meal.jpg', query: 'Golden Penny wheat meal 2kg', fallback: 'https://ng.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/47/5959814/1.jpg?7719' },
  { file: 'golden-penny-flour.jpg', query: 'Golden Penny all purpose flour 2kg', fallback: 'https://ng.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/48/5959814/1.jpg?7719' },
  { file: 'ogi-pap.jpg', query: 'Dry pap ogi white', fallback: 'https://freshtodommot.com/cdn/shop/products/ogi-pap.jpg' },
  { file: 'lafun.jpg', query: 'Cassava flour lafun', fallback: 'https://freshtodommot.com/cdn/shop/products/lafun.jpg' },

  // Snacks & Treats
  { file: 'chin-chin.jpg', query: 'Chin chin crunchy tub', fallback: 'https://ng.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/62/4801812/1.jpg?1717' },
  { file: 'plantain-chips.jpg', query: 'Ripe plantain chips pack', fallback: 'https://ng.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/63/4801812/1.jpg?1818' },
  { file: 'roasted-groundnuts.jpg', query: 'Roasted groundnut jar', fallback: 'https://freshtodommot.com/cdn/shop/products/groundnuts.jpg' },
  { file: 'cashew-nuts.jpg', query: 'Roasted cashew nuts jar', fallback: 'https://ng.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/65/4801812/1.jpg?1919' },

  // Dried foods & soup ingredients
  { file: 'ponmo.jpg', query: 'Dry ponmo cow skin', fallback: 'https://freshtodommot.com/cdn/shop/products/ponmo.jpg' },
  { file: 'baby-shrimps.jpg', query: 'Dried baby shrimps ede', fallback: 'https://freshtodommot.com/cdn/shop/products/baby-shrimps.jpg' },

  // Rice & Grains
  { file: 'basmati-rice.jpg', query: 'Royal Chef basmati rice', fallback: 'https://ng.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/37/3810993/1.jpg?1084' },
  { file: 'groundnut-oil.jpg', query: 'Grand pure groundnut oil 1L', fallback: 'https://ng.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/75/3527104/1.jpg?2121' },
  { file: 'coconut-oil.jpg', query: 'Virgin coconut oil 500ml', fallback: 'https://ng.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/76/3527104/1.jpg?2222' },
  { file: 'olive-oil.jpg', query: 'Borges extra virgin olive oil 500ml', fallback: 'https://ng.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/77/3527104/1.jpg?2323' }
];

async function searchJumia(query) {
  const url = `https://www.jumia.com.ng/catalog/?q=${encodeURIComponent(query)}`;
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    if (!res.ok) return null;
    const html = await res.text();
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
    return null;
  }
}

async function downloadUrl(imgUrl, destPath) {
  try {
    const res = await fetch(imgUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    if (!res.ok) return false;
    const buf = await res.arrayBuffer();
    if (buf.byteLength < 2000) return false;
    fs.writeFileSync(destPath, Buffer.from(buf));
    return buf.byteLength;
  } catch (e) {
    return false;
  }
}

async function main() {
  const destDir = path.join(__dirname, '..', 'public', 'images', 'products');
  console.log(`Processing ${TARGETS.length} specific product images...`);

  for (let i = 0; i < TARGETS.length; i++) {
    const item = TARGETS[i];
    const destPath = path.join(destDir, item.file);
    console.log(`[${i+1}/${TARGETS.length}] Searching for "${item.query}" -> ${item.file}...`);
    
    let downloaded = false;
    const results = await searchJumia(item.query);
    if (results && results.length > 0) {
      console.log(`  Found Jumia match: "${results[0].title}"`);
      const size = await downloadUrl(results[0].img, destPath);
      if (size) {
        console.log(`  -> SUCCESS (Jumia): saved ${size} bytes`);
        downloaded = true;
      }
    }

    if (!downloaded && item.fallback) {
      console.log(`  Trying fallback: ${item.fallback}`);
      const size = await downloadUrl(item.fallback, destPath);
      if (size) {
        console.log(`  -> SUCCESS (Fallback): saved ${size} bytes`);
        downloaded = true;
      }
    }

    if (!downloaded) {
      console.log(`  -> FAILED to download ${item.file}`);
    }

    // Brief polite pause between searches
    await new Promise(r => setTimeout(r, 600));
  }

  console.log('\n--- Finished processing all items! ---');
}

main();
