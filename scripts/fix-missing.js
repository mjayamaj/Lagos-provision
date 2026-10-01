const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '../public/images/products');

const MISSING_MAP = {
  'rice-25kg': 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80',
  'spaghetti': 'https://images.unsplash.com/photo-1621996346565-e3d5d6281242?auto=format&fit=crop&w=600&q=80',
  'soap': 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=600&q=80',
};

async function fixMissing() {
  for (const [name, url] of Object.entries(MISSING_MAP)) {
    const dest = path.join(targetDir, `${name}.jpg`);
    try {
      const res = await fetch(url);
      if (res.ok) {
        const buf = Buffer.from(await res.arrayBuffer());
        fs.writeFileSync(dest, buf);
        console.log(`Saved ${name}.jpg (${buf.length} bytes)`);
      } else {
        console.log(`Fallback for ${name}: HTTP ${res.status}`);
        if (name === 'rice-25kg') {
          fs.copyFileSync(path.join(targetDir, 'rice-10kg.jpg'), dest);
          console.log(`Copied rice-10kg.jpg -> ${name}.jpg`);
        } else if (name === 'spaghetti') {
          fs.copyFileSync(path.join(targetDir, 'macaroni.jpg'), dest);
          console.log(`Copied macaroni.jpg -> ${name}.jpg`);
        } else if (name === 'soap') {
          fs.copyFileSync(path.join(targetDir, 'personal-care.jpg'), dest);
          console.log(`Copied personal-care.jpg -> ${name}.jpg`);
        }
      }
    } catch (e) {
      console.error(`Error fetching ${name}:`, e.message);
    }
  }
}

fixMissing();
