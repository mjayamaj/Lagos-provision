const fs = require('fs');
const path = require('path');

const REAL_IMAGES = [
  {
    file: 'mama-gold-rice-10kg.jpg',
    url: 'https://thericeman.com.ng/wp-content/uploads/2022/12/Mama-Gold-10kg.jpg',
    name: 'Mama Gold 10kg Parboiled Rice'
  },
  {
    file: 'rice-5kg.jpg',
    url: 'https://ng.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/37/3810993/1.jpg?1084',
    name: 'Parboiled Rice 5kg'
  },
  {
    file: 'rice-10kg.jpg',
    url: 'https://thericeman.com.ng/wp-content/uploads/2022/12/Mama-Gold-10kg.jpg',
    name: 'Parboiled Rice 10kg'
  },
  {
    file: 'rice-25kg.jpg',
    url: 'https://www.gbnfarms.com/cdn/shop/products/9M1QBHhe3K_1024x1024.jpg?v=1621887765',
    name: 'Mama Gold 25kg Rice'
  },
  {
    file: 'rice-50kg.jpg',
    url: 'https://ng.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/27/3810993/1.jpg?4041',
    name: 'Royal Stallion 50kg Rice'
  },
  {
    file: 'indomie.jpg',
    url: 'https://ng.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/98/3650024/1.jpg?7846',
    name: 'Indomie Chicken Noodles Carton'
  },
  {
    file: 'spaghetti.jpg',
    url: 'https://ng.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/51/3527104/1.jpg?6130',
    name: 'Golden Penny Spaghetti 500g'
  },
  {
    file: 'macaroni.jpg',
    url: 'https://ng.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/72/3527104/1.jpg?5314',
    name: 'Golden Penny Macaroni 500g'
  },
  {
    file: 'semovita.jpg',
    url: 'https://freshtodommot.com/cdn/shop/products/golden-penny-semovita-1-kg.jpg?v=1757105411',
    name: 'Golden Penny Semovita'
  },
  {
    file: 'garri-1kg.jpg',
    url: 'https://ng.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/23/3527104/1.jpg?3585',
    name: 'Ijebu Garri 1kg'
  },
  {
    file: 'garri-5kg.jpg',
    url: 'https://ng.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/23/3527104/1.jpg?3585',
    name: 'Ijebu Garri 5kg'
  },
  {
    file: 'palm-oil.jpg',
    url: 'https://alinadfarms.com.ng/wp-content/uploads/2021/08/5-liters-Palm-Oil.jpg',
    name: 'Pure Red Palm Oil (Epo Pupa)'
  },
  {
    file: 'oil-1l.jpg',
    url: 'https://foodsubsidy.com.ng/wp-content/uploads/2025/05/devon-kings-oil-1litre.png',
    name: "Devon King's Vegetable Oil 1L"
  },
  {
    file: 'oil-keg.jpg',
    url: 'https://estherafricanfoods.com/wp-content/uploads/2022/07/kings-oil-5L.jpg',
    name: "Devon King's Vegetable Oil 5L"
  },
  {
    file: 'tomato-tin.jpg',
    url: 'https://www.foodlocker.com.ng/public/product/gino%20tomato%20paste.png',
    name: 'Gino Tomato Paste'
  },
  {
    file: 'milk-tin.jpg',
    url: 'https://247foods.ng/wp-content/uploads/2025/03/Peak-Evaporated-Milk-160G-TIN-Carton-Price-X-24.jpg',
    name: 'Peak Evaporated Milk Tin'
  },
  {
    file: 'milo-tin.jpg',
    url: 'https://www-konga-com-res.cloudinary.com/image/upload/f_auto,q_auto,w_800,c_limit/media/catalog/product/V/R/222140_1693328158.jpg',
    name: 'Nestlé Milo Chocolate Drink'
  },
  {
    file: 'sardine.jpg',
    url: 'https://freshtodommot.com/cdn/shop/files/TitussardineStandardx50.jpg?v=1757104279',
    name: 'Titus Sardines in Vegetable Oil'
  },
  {
    file: 'sugar.jpg',
    url: 'https://www-konga-com-res.cloudinary.com/image/upload/f_auto,q_auto,w_800,c_limit/media/catalog/product/Y/S/171893_1677165598.jpg',
    name: 'St. Louis Sugar Cubes'
  },
  {
    file: 'margarine.jpg',
    url: 'https://m.media-amazon.com/images/I/816f63NG2xL._SX679_.jpg',
    name: 'Blue Band Margarine 500g'
  },
  {
    file: 'sauce.jpg',
    url: 'https://www.ogbete.com.ng/wp-content/uploads/2020/05/BAMA-MAYONNAISE-473ML.jpg',
    name: 'BAMA Real Mayonnaise'
  },
  {
    file: 'cereal.jpg',
    url: 'https://ng.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/31/4801812/1.jpg?8729',
    name: 'Nestlé Golden Morn Grainsmart'
  },
  {
    file: 'spices.jpg',
    url: 'https://ng.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/63/5713763/1.jpg?4917',
    name: 'Maggi Star Seasoning Cubes'
  },
  {
    file: 'household.jpg',
    url: 'https://ng.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/87/4830024/1.jpg?1893',
    name: 'Morning Fresh Antibacterial Dishwashing'
  },
  {
    file: 'soap.jpg',
    url: 'https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/32/362729/1.jpg?1174',
    name: 'Dettol Antibacterial Soap'
  },
  {
    file: 'drinks.jpg',
    url: 'https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/16/969129/1.jpg?3870',
    name: 'Maltina Non-Alcoholic Malt'
  },
  {
    file: 'personal-care.jpg',
    url: 'https://ng.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/34/485689/1.jpg?2649',
    name: 'Vaseline Petroleum Jelly'
  },
  {
    file: 'oats.jpg',
    url: 'https://ng.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/85/5973024/1.jpg?8990',
    name: 'Quaker White Oats'
  },
  {
    file: 'flour.jpg',
    url: 'https://ng.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/43/5959814/1.jpg?7719',
    name: 'Ayoola Poundo Yam Flour'
  }
];

async function downloadAll() {
  console.log(`Starting download of ${REAL_IMAGES.length} authentic Nigerian supermarket images...`);
  const productsDir = path.join(__dirname, '..', 'public', 'images', 'products');

  for (const item of REAL_IMAGES) {
    const dest = path.join(productsDir, item.file);
    try {
      console.log(`[DOWNLOADING] ${item.name} -> ${item.file}...`);
      const res = await fetch(item.url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });
      if (!res.ok) {
        console.log(`[FAILED ${res.status}] ${item.name}`);
        continue;
      }
      const buffer = await res.arrayBuffer();
      fs.writeFileSync(dest, Buffer.from(buffer));
      console.log(`[SAVED] ${item.file} (${buffer.byteLength} bytes)`);
    } catch (err) {
      console.log(`[ERROR] ${item.name}: ${err.message}`);
    }
  }
  console.log('Finished downloading all real product images!');
}

downloadAll();
