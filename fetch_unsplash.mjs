import https from 'https';
const req = https.get('https://unsplash.com/napi/search/photos?query=private+jet&per_page=10', (res) => {
  let body = '';
  res.on('data', d => body += d);
  res.on('end', () => {
    try {
      const j = JSON.parse(body);
      console.log(j.results.map(r => r.urls.regular));
    } catch(e) { console.error(e) }
  });
});
req.on('error', console.error);
