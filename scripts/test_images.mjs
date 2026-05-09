import https from 'https';

const urls = [
  'https://images.pexels.com/photos/8040751/pexels-photo-8040751.jpeg?auto=compress&cs=tinysrgb&w=1600',
  'https://images.pexels.com/photos/10141380/pexels-photo-10141380.jpeg?auto=compress&cs=tinysrgb&w=1600',
  'https://images.pexels.com/photos/10041258/pexels-photo-10041258.jpeg?auto=compress&cs=tinysrgb&w=1600',
  'https://images.pexels.com/photos/16140026/pexels-photo-16140026.jpeg?auto=compress&cs=tinysrgb&w=1600',
  'https://images.pexels.com/photos/908283/pexels-photo-908283.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/146813/pexels-photo-146813.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/672532/pexels-photo-672532.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/3289880/pexels-photo-3289880.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&q=80&w=2000',
  'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?auto=format&fit=crop&q=80&w=2000'
];

const checkUrl = (url) => {
  return new Promise((resolve) => {
    https.request(url, { method: 'HEAD' }, (res) => {
      console.log(`[${res.statusCode}] ${url}`);
      resolve();
    }).on('error', (e) => {
      console.log(`Error on ${url}: ${e.message}`);
      resolve();
    }).end();
  });
};

const run = async () => {
  for (const url of urls) {
    await checkUrl(url);
  }
};
run();
