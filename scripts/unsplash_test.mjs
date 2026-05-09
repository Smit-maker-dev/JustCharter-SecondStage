import https from 'https';

const getImages = (query) => {
  https.get(`https://unsplash.com/napi/search/photos?query=${encodeURIComponent(query)}&per_page=10`, (res) => {
    let body = '';
    res.on('data', d => body += d);
    res.on('end', () => {
      try {
        const j = JSON.parse(body);
        console.log(`\n--- ${query} ---`);
        console.log(j.results.map(r => r.urls.regular));
      } catch(e) { console.error(e) }
    });
  }).on('error', console.error);
};

getImages('private jet');
getImages('luxury yacht');
getImages('kedarnath temple');
getImages('tirupati temple india');
getImages('badrinath');
