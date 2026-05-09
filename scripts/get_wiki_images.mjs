import https from 'https';

const getImageUrl = (title) => {
  return new Promise((resolve) => {
    https.get(`https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=pageimages&piprop=original&format=json`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const pages = json.query.pages;
          const page = pages[Object.keys(pages)[0]];
          if (page && page.original) {
            resolve(page.original.source);
          } else {
            resolve(null);
          }
        } catch (e) {
          resolve(null);
        }
      });
    });
  });
}

const run = async () => {
  const titles = [
    'Private_jet',
    'Business_jet',
    'Cessna_Citation_X',
    'Embraer_Phenom_300',
    'Bombardier_Global_Express',
    'Yacht',
    'Kedarnath_Temple',
    'Venkateswara_Temple,_Tirumala',
    'Varanasi',
    'Aspen,_Colorado',
    'Monaco',
    'London',
    'Dubai'
  ];
  for (const t of titles) {
    const url = await getImageUrl(t);
    console.log(`${t}: ${url}`);
  }
};
run();
