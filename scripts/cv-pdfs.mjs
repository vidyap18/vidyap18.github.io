// After `docusaurus build`, prints every CV page in build/ to a PDF next to it:
//   build/cv/<role>.pdf for each version, and build/Vidya_Patil_CV.pdf for the menu version.
// Runs locally and on GitHub Actions, so a PDF always matches its page.
import fs from 'node:fs';
import http from 'node:http';
import os from 'node:os';
import path from 'node:path';
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
import {fileURLToPath} from 'node:url';
import {readRoles} from './cv-sync.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const buildDir = path.join(root, 'build');

const TYPES = {'.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.woff2': 'font/woff2', '.json': 'application/json'};

function findChrome() {
  const candidates = [
    process.env.CHROME,
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/usr/bin/google-chrome',
    '/usr/bin/google-chrome-stable',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
  ].filter(Boolean);
  const found = candidates.find((c) => fs.existsSync(c));
  if (!found) throw new Error('No Chrome found. Set CHROME to its path.');
  return found;
}

function serve() {
  const server = http.createServer((req, res) => {
    const url = decodeURIComponent(req.url.split('?')[0]);
    const tries = [url, `${url}.html`, path.join(url, 'index.html')];
    for (const t of tries) {
      const file = path.join(buildDir, t);
      if (file.startsWith(buildDir) && fs.existsSync(file) && fs.statSync(file).isFile()) {
        res.writeHead(200, {'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream'});
        fs.createReadStream(file).pipe(res);
        return;
      }
    }
    res.writeHead(404);
    res.end();
  });
  return new Promise((resolve) => server.listen(0, '127.0.0.1', () => resolve(server)));
}

const chrome = findChrome();
const server = await serve();
const base = `http://127.0.0.1:${server.address().port}`;
const jobs = [['/cv', 'Vidya_Patil_CV.pdf'], ...readRoles().map((r) => [`/cv/${r}`, path.join('cv', `${r}.pdf`)])];
fs.mkdirSync(path.join(buildDir, 'cv'), {recursive: true});
// A throwaway profile, so headless Chrome never attaches to a Chrome window that is already open.
const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'cv-pdf-chrome-'));
try {
  for (const [page, out] of jobs) {
    // Async on purpose: a blocking call would freeze the server above, and Chrome would wait forever.
    await promisify(execFile)(chrome, [
      '--headless=new', '--disable-gpu', '--no-sandbox', '--no-pdf-header-footer',
      '--virtual-time-budget=8000', `--user-data-dir=${profile}`, `--print-to-pdf=${path.join(buildDir, out)}`, `${base}${page}`,
    ], {timeout: 90_000});
    console.log(`PDF: ${out}`);
  }
} finally {
  server.close();
  fs.rmSync(profile, {recursive: true, force: true});
}
