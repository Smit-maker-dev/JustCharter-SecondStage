import https from 'https';

https.get('https://en.wikipedia.org/wiki/Business_jet', {
  headers: { 'User-Agent': 'Mozilla/5.0' }
}, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const matches = data.match(/upload\.wikimedia\.org\/wikipedia\/commons\/thumb\/[^"']+\.jpg\/\d+px-[^"']+\.jpg/g);
    if (matches) {
      console.log(Array.from(new Set(matches)).map(m => `https://${m}`).slice(0, 10));
    }
  });
});
