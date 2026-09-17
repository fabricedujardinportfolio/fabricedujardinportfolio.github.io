/**
 * Génère dist/cv-fabrice-dujardin.pdf à partir de la page /cv/ du site construit.
 * Aucune dépendance : un mini serveur statique + Chrome/Chromium en mode headless.
 * Chrome recherché dans CHROME_PATH, puis dans le PATH, puis dans le cache Playwright.
 */
import { createServer } from 'node:http';
import { readFile, stat, access, readdir, copyFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { join, extname, resolve } from 'node:path';
import { homedir } from 'node:os';

const run = promisify(execFile);
const DIST = resolve('dist');
const OUT = join(DIST, 'cv-fabrice-dujardin.pdf');
const MIME = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.woff2': 'font/woff2', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg' };

async function findChrome() {
  const candidates = [process.env.CHROME_PATH, 'google-chrome', 'google-chrome-stable', 'chromium', 'chromium-browser', 'chrome'].filter(Boolean);
  for (const c of candidates) {
    try {
      await run(c, ['--version']);
      return c;
    } catch {
      /* suivant */
    }
  }
  // Cache Playwright (WSL / poste de dev)
  const cache = join(homedir(), '.cache', 'ms-playwright');
  if (existsSync(cache)) {
    const dirs = (await readdir(cache)).filter((d) => d.startsWith('chromium-')).sort().reverse();
    for (const d of dirs) {
      for (const sub of ['chrome-linux64/chrome', 'chrome-linux/chrome', 'chrome-mac/Chromium.app/Contents/MacOS/Chromium']) {
        const p = join(cache, d, sub);
        if (existsSync(p)) return p;
      }
    }
  }
  return null;
}

function serve(root) {
  return new Promise((ok) => {
    const server = createServer(async (req, res) => {
      try {
        let path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
        let file = join(root, path);
        if ((await stat(file).catch(() => null))?.isDirectory()) file = join(file, 'index.html');
        await access(file);
        res.writeHead(200, { 'Content-Type': MIME[extname(file)] ?? 'application/octet-stream' });
        res.end(await readFile(file));
      } catch {
        res.writeHead(404).end();
      }
    });
    server.listen(0, '127.0.0.1', () => ok(server));
  });
}

const chrome = await findChrome();
if (!chrome) {
  const msg = 'Aucun Chrome/Chromium trouvé : PDF du CV non généré. Définissez CHROME_PATH ou installez Chrome.';
  if (process.env.CI) throw new Error(msg);
  console.warn(`⚠  ${msg}`);
  process.exit(0);
}

const server = await serve(DIST);
const { port } = server.address();
try {
  await run(chrome, [
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    '--run-all-compositor-stages-before-draw',
    '--virtual-time-budget=4000',
    '--no-pdf-header-footer',
    `--print-to-pdf=${OUT}`,
    `http://127.0.0.1:${port}/cv/`,
  ]);
  const { size } = await stat(OUT);
  // Copie (ignorée par git) pour que le téléchargement fonctionne aussi avec `npm run dev`.
  await copyFile(OUT, resolve('public', 'cv-fabrice-dujardin.pdf'));
  console.log(`✓ CV PDF généré : ${OUT} (${Math.round(size / 1024)} Ko) avec ${chrome}`);
} finally {
  server.close();
}
