import https from 'https';

const searchWikimedia = (query) => {
  return new Promise((resolve) => {
    https.get(`https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&utf8=&format=json&srnamespace=6`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve(json.query.search.map(r => r.title));
        } catch (e) {
          resolve([]);
        }
      });
    });
  });
};

const getImageUrl = (title) => {
  return new Promise((resolve) => {
    https.get(`https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=imageinfo&iiprop=url&format=json`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const pages = json.query.pages;
          const page = pages[Object.keys(pages)[0]];
          resolve(page.imageinfo[0].url);
        } catch (e) {
          resolve(null);
        }
      });
    });
  });
}

const run = async () => {
  const queries = ['business jet interior', 'private jet', 'embraer phenom', 'citation x', 'bombardier global', 'yacht sea', 'kedarnath temple', 'tirupati temple', 'varanasi river', 'badrinath temple', 'aspen mountain', 'monaco city', 'london uk', 'dubai skyline'];
  for (const q of queries) {
    const titles = await searchWikimedia(q);
    if (titles.length) {
      const url = await getImageUrl(titles[0]);
      console.log(`[${q}] ${url}`);
    } else {
       console.log(`[${q}] NO RESULTS`);
    }
  }
};
run();
