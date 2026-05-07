import https from 'https';

https.get('https://www.pexels.com/search/himanchal/', {
  headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36' }
}, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const matches = data.match(/https:\/\/images\.pexels\.com\/photos\/\d+\/pexels-photo-\d+\.jpeg/g);
    if (matches) {
      console.log(Array.from(new Set(matches)).slice(0, 5));
    } else {
      console.log("No matches");
    }
  });
});
