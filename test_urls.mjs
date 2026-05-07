import https from 'https';

const urls = [
  'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-beautiful-luxury-yacht-on-the-ocean-1563-large.mp4',
  'https://cdn.coverr.co/videos/coverr-a-yacht-sailing-in-the-sea-2178/1080p.mp4',
  'https://cdn.coverr.co/videos/coverr-flying-in-a-private-jet-4422/1080p.mp4',
  'https://cdn.pixabay.com/vimeo/305221008/yacht-19793.mp4?width=1280&hash=8b5fa0b4ebfdf9c8c9735ac1ba048a6bdcad3584',
  'https://player.vimeo.com/external/498808542.sd.mp4?s=d0ae9db6eeecb3f46f90d40aa91129bfeeeb6342&profile_id=165&oauth2_token_id=57447761',
  'https://player.vimeo.com/external/384761498.sd.mp4?s=f5e9d9e6e8c8bfaeba8bcbe6c5ab23d0b2b8d0c0&profile_id=165&oauth2_token_id=57447761',
  'https://player.vimeo.com/external/403061208.sd.mp4?s=7b920bf05b18aa2f829f0ce63a8e97a3a60a3a41&profile_id=165&oauth2_token_id=57447761' // private jet
];

const checkUrl = (url) => {
  return new Promise((resolve) => {
    https.request(url, { method: 'HEAD' }, (res) => {
      console.log(`Status: ${res.statusCode} for ${url}`);
      resolve();
    }).on('error', (e) => {
      console.log(`Failed for ${url}: ${e.message}`);
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
