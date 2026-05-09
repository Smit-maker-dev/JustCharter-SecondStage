import https from 'https';

const searchPexels = (query) => {
  return new Promise((resolve) => {
    https.get(`https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=5`, {
      headers: { 'Authorization': '2T3g9Iq4TfJ7XlV35vWlQ8e8oP9sTzT14643qR104C1nJ2I2hD1Rz' }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        console.log("Raw response:", data);
        resolve();
      });
    });
  })
}

searchPexels('private jet');
