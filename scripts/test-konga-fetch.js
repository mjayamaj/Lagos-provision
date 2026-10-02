const fs = require('fs');

async function testFetchKonga() {
  const url = 'https://www.konga.com/search?search=peak%20milk';
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
  });
  const html = await res.text();
  
  const matches = html.match(/https:\/\/www-konga-com-res\.cloudinary\.com\/image\/upload\/[^\s"'<>]+/g);
  if (matches) {
    const uniq = [...new Set(matches)];
    console.log('Total unique Cloudinary images:', uniq.length);
    uniq.forEach(u => console.log(' ', u));
  }
}

testFetchKonga();
