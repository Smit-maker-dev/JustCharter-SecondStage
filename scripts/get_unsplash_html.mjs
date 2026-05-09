import https from 'https';

const searchUnsplashHTML = (query) => {
  return new Promise((resolve) => {
    https.get(`https://unsplash.com/s/photos/${encodeURIComponent(query)}`, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const matches = data.match(/https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9\-]+(?:-[a-zA-Z0-9]+)?\?ixlib=rb-[^\&]+\&auto=format\&fit=crop\&q=60\&w=800/g);
        if (matches) {
           const unique = Array.from(new Set(matches));
           resolve(unique.slice(0, 5));
        } else {
           resolve([]);
        }
      });
    }).on('error', () => resolve([]));
  });
}

const run = async () => {
  const queries = [
    'private-jet',
    'luxury-yacht',
    'kedarnath',
    'tirupati-temple',
    'varanasi-river',
    'aspen-colorado',
    'monaco',
    'london-city',
    'dubai-city',
    'badrinath'
  ];
  for (const q of queries) {
    const urls = await searchUnsplashHTML(q);
    console.log(`\n--- ${q} ---`);
    console.log(urls.join('\n'));
  }
};
run();
