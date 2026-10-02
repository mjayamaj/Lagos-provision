const fs = require('fs');
const path = require('path');

const REAL_ITEMS = [
  {
    file: 'exeter-corned-beef.jpg',
    url: 'https://cdn.shopify.com/s/files/1/0107/2408/1722/products/exeter-corned-beef-product-of-brazil-340-g.jpg?v=1757105325'
  },
  {
    file: 'sweet-corn.jpg',
    url: 'https://cdn.shopify.com/s/files/1/0107/2408/1722/products/greengiant.jpg?v=1757105386'
  },
  {
    file: 'heinz-ketchup.jpg',
    url: 'https://cdn.shopify.com/s/files/1/0107/2408/1722/products/heinz-tomato-ketchup-300-g.jpg?v=1757104990'
  },
  {
    file: 'heinz-salad-cream.jpg',
    url: 'https://cdn.shopify.com/s/files/1/0107/2408/1722/products/heinz-mayonnaise-940-g.jpg?v=1757104978'
  },
  {
    file: 'iru-locust-beans.jpg',
    url: 'https://cdn.shopify.com/s/files/1/0107/2408/1722/products/iru-brown.jpg?v=1757105558'
  },
  {
    file: 'suya-pepper.jpg',
    url: 'https://cdn.shopify.com/s/files/1/0107/2408/1722/products/aace-foods-suya-spice-100-g.jpg?v=1757105417'
  },
  {
    file: 'cameroon-pepper.jpg',
    url: 'https://cdn.shopify.com/s/files/1/0107/2408/1722/products/Blackcameroonpepper.jpg?v=1757105366'
  },
  {
    file: 'ducros-curry.jpg',
    url: 'https://cdn.shopify.com/s/files/1/0107/2408/1722/products/tiger-curry-powder-100-g.jpg?v=1757105420'
  },
  {
    file: 'ducros-thyme.jpg',
    url: 'https://cdn.shopify.com/s/files/1/0107/2408/1722/products/thyme-bag-gino-5g.jpg?v=1757105461'
  },
  {
    file: 'dangote-salt.jpg',
    url: 'https://cdn.shopify.com/s/files/1/0107/2408/1722/products/mr-chef-iodised-salt-sachet-1-kg.jpg?v=1757105420'
  },
  {
    file: 'roasted-groundnuts.jpg',
    url: 'https://cdn.shopify.com/s/files/1/0107/2408/1722/products/elex-peanuts-510-g.jpg?v=1757104946'
  },
  {
    file: 'cashew-nuts.jpg',
    url: 'https://cdn.shopify.com/s/files/1/0107/2408/1722/products/m-_26-w-gourmet-whole-cashew-nuts-salted-sachet-50-g.jpg?v=1757104941'
  },
  {
    file: 'baby-shrimps.jpg',
    url: 'https://cdn.shopify.com/s/files/1/0107/2408/1722/products/1dericacrayfish.jpg?v=1757105574'
  },
  {
    file: 'canned-tomatoes.jpg',
    url: 'https://cdn.shopify.com/s/files/1/0107/2408/1722/files/GinoTomatoPasteTin-210gCarton.jpg?v=1757257024'
  }
];

async function downloadAll() {
  const destDir = path.join(__dirname, '..', 'public', 'images', 'products');
  for (const item of REAL_ITEMS) {
    try {
      console.log(`Downloading ${item.file} from ${item.url}...`);
      const res = await fetch(item.url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });
      if (!res.ok) {
        console.error(`  Failed: HTTP ${res.status}`);
        continue;
      }
      const buf = await res.arrayBuffer();
      const dest = path.join(destDir, item.file);
      fs.writeFileSync(dest, Buffer.from(buf));
      console.log(`  ✅ SAVED ${item.file} (${buf.byteLength} bytes)`);
    } catch (e) {
      console.error(`  Error for ${item.file}:`, e.message);
    }
  }
  console.log('All real supermarket images downloaded!');
}

downloadAll();
