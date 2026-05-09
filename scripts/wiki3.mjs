import https from 'https';

const getCategoryImages = (category) => {
  return new Promise((resolve) => {
    https.get(`https://commons.wikimedia.org/w/api.php?action=query&list=categorymembers&cmtitle=Category:${encodeURIComponent(category)}&cmtype=file&format=json&cmlimit=10`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve(json.query.categorymembers.map(m => m.title));
        } catch(e) { resolve([]) }
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
  const categories = [
    'Business_jets',
    'Yachts',
    'Kedarnath_Temple',
    'Tirumala_Venkateswara_Temple',
    'Ghats_in_Varanasi',
    'Badrinath_Temple',
    'Aspen,_Colorado',
    'Monte_Carlo',
    'City_of_London',
    'Dubai_skyline',
    'Interior_of_business_jets'
  ];
  for (const c of categories) {
    const titles = await getCategoryImages(c);
    for (const title of titles.slice(0, 3)) {
       const url = await getImageUrl(title);
       console.log(`[${c}] ${url}`);
    }
  }
};
run();
