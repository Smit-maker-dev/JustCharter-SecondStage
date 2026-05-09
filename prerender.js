global.window = global;
global.window.addEventListener = () => {};
global.window.removeEventListener = () => {};
global.window.matchMedia = () => ({ matches: false, addListener: () => {}, removeListener: () => {} });
global.document = { createElement: () => ({}), getElementById: () => null };
global.localStorage = { getItem: () => null, setItem: () => {} };
global.matchMedia = () => ({ matches: false });

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const toAbsolute = (p) => path.resolve(__dirname, p);

const template = fs.readFileSync(toAbsolute('dist/index.html'), 'utf-8');
const { render } = await import('./dist/server/entry-server.js');

// Routes to pre-render
const routesToPrerender = [
  '/',
  '/services',
  '/destinations',
  '/members',
  '/about',
  '/planner',
  '/empty-legs',
  '/fleet',
  '/contact',
  '/safety-first',
  '/careers',
  '/corporate-accounts',
  '/login',
  '/privacy-policy',
  '/terms',
  '/cookie-policy',
  '/history'
];

(async () => {
  for (const url of routesToPrerender) {
    try {
      const { html: appHtml } = await render(url);

      // React 19 might hoist tags to the start of the SSR output.
      // We look for any <title>, <meta>, or <link> at the very beginning of the string.
      const hoistedMatch = appHtml.match(/^(<(title|meta|link)[^>]*>(.*?<\/\2>)?)+/i);
      const hoistedTags = hoistedMatch ? hoistedMatch[0] : '';
      const cleanAppHtml = hoistedMatch ? appHtml.slice(hoistedTags.length) : appHtml;

      let html = template.replace(`<!--app-html-->`, cleanAppHtml);
      html = html.replace(`</head>`, `${hoistedTags}\n</head>`);

      const filePath = `dist${url === '/' ? '/index' : url}.html`;
      fs.writeFileSync(toAbsolute(filePath), html);
      console.log('pre-rendered:', filePath);
    } catch (e) {
      console.error(`Failed to prerender ${url}`, e);
      throw e;
    }
  }
  
  // Optionally clean up the server directory
  // fs.rmSync(toAbsolute('dist/server'), { recursive: true, force: true });
})();
