import https from 'https';

const searchUnsplash = (query) => {
  return new Promise((resolve, reject) => {
    https.get(`https://unsplash.com/napi/search/photos?query=${encodeURIComponent(query)}&per_page=10`, {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve(json.results.map(r => ({ id: r.id, url: r.urls.raw, description: r.alt_description })));
        } catch (e) {
          resolve([]);
        }
      });
    }).on('error', reject);
  });
};

const run = async () => {
  console.log("Private Jet:");
  console.log(await searchUnsplash('private jet'));
  console.log("Luxury Yacht:");
  console.log(await searchUnsplash('luxury yacht'));
  console.log("Aspen:");
  console.log(await searchUnsplash('aspen winter luxury'));
  console.log("Monaco:");
  console.log(await searchUnsplash('monaco luxury'));
  console.log("London:");
  console.log(await searchUnsplash('london skyline luxury'));
  console.log("Dubai:");
  console.log(await searchUnsplash('dubai luxury'));
};

run();
