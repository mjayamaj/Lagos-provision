const fs = require('fs');

async function testDownload() {
  const url = 'https://ng.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/98/3650024/1.jpg?7846';
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
  });
  if (!res.ok) {
    throw new Error(`Failed to download image: ${res.status}`);
  }
  const buffer = await res.arrayBuffer();
  fs.writeFileSync('scripts/test-indomie.jpg', Buffer.from(buffer));
  console.log('Saved test-indomie.jpg, size:', buffer.byteLength, 'bytes');
}

testDownload().catch(console.error);
