import https from 'https';
import fs from 'fs';
import path from 'path';

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
  const queries = ['private jet', 'luxury yacht', 'kedarnath temple', 'tirupati temple', 'varanasi ghat'];
  for (const q of queries) {
    console.log(`\n--- ${q} ---`);
    const titles = await searchWikimedia(q);
    for (const title of titles.slice(0, 3)) {
      const url = await getImageUrl(title);
      console.log(url);
    }
  }
};
run();
