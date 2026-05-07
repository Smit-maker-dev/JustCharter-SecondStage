import https from 'https';

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
  const titles = [
    'File:Embraer_Phenom_300_interior.jpg',
    'File:Cessna_Citation_Latitude.jpg',
    'File:Bombardier_Global_7500.jpg',
    'File:Kedarnath_Temple_-_Garhwal_Himalaya.jpg',
    'File:Tirumala_Venkateswara_Temple.jpg',
    'File:Varanasi_ghats_and_boats.jpg',
    'File:Badrinath_Temple_UK.jpg',
    'File:Maroon_Bells_(11219).jpg',
    'File:Monte_Carlo_Harbour_(Monaco).jpg',
    'File:London_Montage_L.jpg',
    'File:Dubai_Skylines_at_night_(Pexels_3787839).jpg',
    'File:Gulfstream_G650ER_P4-BFY_approaching_JFK.jpg',
    'File:Cessna_Citation_X+_interior.jpg'
  ];
  for (const t of titles) {
    const url = await getImageUrl(t);
    console.log(`${t}: ${url}`);
  }
};
run();
