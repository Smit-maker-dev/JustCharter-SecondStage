import https from 'https';

const searchPexels = (query) => {
  return new Promise((resolve) => {
    https.get(`https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=5`, {
      // NOTE: DON'T USE THIS KEY EXCEPT FOR DEMONSTRATION OR PUBLIC OPEN CALLS
      headers: { 'Authorization': '2T3g9Iq4TfJ7XlV35vWlQ8e8oP9sTzT14643qR104C1nJ2I2hD1Rz' }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const j = JSON.parse(data);
          resolve(j.photos ? j.photos.map(p => ({ url: p.src.large2x, alt: p.alt })) : []);
        } catch(e) { resolve([]) }
      });
    });
  })
}

const run = async () => {
  console.log("Kedarnath:");
  console.log(await searchPexels('kedarnath'));
  console.log("Varanasi:");
  console.log(await searchPexels('varanasi'));
  console.log("Tirupati:");
  console.log(await searchPexels('tirupati temple'));
  console.log("Himalayas:");
  console.log(await searchPexels('himalayas india'));
};

run();
