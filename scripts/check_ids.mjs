import https from 'https';

const ids = [
  '1540962351504-03099e0a754b',
  '1569263979104-865ab7cd8d13',
  '1579730598463-3dc462ee6c28',
  '1517999818821-6921fb9dff78',
  '1546944265-5154ee42cf9a',
  '1533228876829-65c94e7b5025',
  '1513635269975-5969336cd753',
  '1512453979798-5ea266f8880c',
  '1542869788600-798835821cd8', // alternative jets
  '1559815031-15549040375a',
  '1601004149697-59ec7a71bbcd',
  '1612051649988-1bf9dc08effa',
  '1544018241-11880fb14170'
];

ids.forEach(id => {
  const url = `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80&w=2000`;
  https.request(url, { method: 'HEAD' }, (res) => {
    console.log(`[${res.statusCode}] ${id}`);
  }).on('error', () => console.log('error', id)).end();
});
