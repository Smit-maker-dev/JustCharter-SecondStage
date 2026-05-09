import https from 'https';

https.get('https://unsplash.com/s/photos/private-jet', {
  headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36' }
}, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const matches = data.match(/https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9-]+\?ixlib/g);
    if (matches) {
      console.log(Array.from(new Set(matches)).slice(0, 5));
    } else {
      console.log("No matches");
    }
  });
});
