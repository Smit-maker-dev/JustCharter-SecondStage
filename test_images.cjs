const https = require('https');

const urls = [
  'https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&q=80&w=2000',
  'https://images.unsplash.com/photo-1579730598463-3dc462ee6c28?auto=format&fit=crop&q=80&w=1600',
  'https://images.unsplash.com/photo-1517999818821-6921fb9dff78?auto=format&fit=crop&q=80&w=1600',
  'https://images.unsplash.com/photo-1546944265-5154ee42cf9a?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1533228876829-65c94e7b5025?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1513635269975-5969336cd753?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800'
];

urls.forEach(url => {
  https.request(url, { method: 'HEAD' }, (res) => {
    console.log(`[${res.statusCode}] ${url}`);
  }).on('error', e => console.log('Error', url)).end();
});
