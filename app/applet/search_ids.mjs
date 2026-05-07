import https from 'https';

const ids = [
  '1647972', '3881104', '11305767', '2682462', '4173435', '6528795', '8642232', '3230671'
];

const checkUrl = (id) => {
  return new Promise((resolve) => {
    const url = `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=800`;
    https.request(url, { method: 'HEAD' }, (res) => {
      console.log(`[${res.statusCode}] ${id} -> ${url}`);
      resolve();
    }).on('error', (e) => {
      console.log(`Error on ${id}: ${e.message}`);
      resolve();
    }).end();
  });
};

const run = async () => {
  for (const id of ids) {
    await checkUrl(id);
  }
};
run();
