/**
 * Checks that the cookie consent banner stays dismissed on a preview deployment.
 *
 * The banner comes from the HaaS loader (see dspublisher/theme/init-browser.ts),
 * which stores consent in a `privacyPolicy` cookie scoped to `domain=vaadin.com`.
 * Preview deployments are served from `docs-preview-pr-<n>.fly.dev`, so the
 * browser rejects that cookie and the banner is shown again on every page load.
 *
 * Drives headless Chromium through chromedriver: loads a page, accepts the
 * banner, then loads another page and fails if the banner is back. Exits with a
 * non-zero status when the banner reappears.
 *
 * Usage:
 *   node scripts/check-preview-cookie-banner.mjs https://docs-preview-pr-5950.fly.dev
 *
 * Environment variables:
 * - PREVIEW_URL: base URL of the preview deployment (alternative to the argument)
 * - CHROMEDRIVER_PORT: port to run chromedriver on (default: 9515)
 * - CHROME_BINARY: Chromium/Chrome binary to drive (default: chromedriver's own)
 */
import { spawn } from 'node:child_process';

const baseUrl = (process.argv[2] || process.env.PREVIEW_URL || '').replace(/\/+$/, '');
if (!baseUrl) {
  console.error('Usage: node scripts/check-preview-cookie-banner.mjs <preview-url>');
  process.exit(2);
}

const port = process.env.CHROMEDRIVER_PORT || '9515';
const driverUrl = `http://127.0.0.1:${port}`;

// A real-looking user agent: the HaaS cookie script skips the banner for
// user agents containing "HeadlessChrome" or "Chrome-Lighthouse".
const USER_AGENT =
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36';

// Pages visited in order; the banner is accepted on the first one.
const PAGES = ['/', '/getting-started/', '/components/'];

// The banner is injected after the HaaS loader has been fetched and run.
const LOAD_WAIT_MS = 6000;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function request(method, path, body) {
  const response = await fetch(driverUrl + path, {
    method,
    headers: { 'content-type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  return response.json();
}

async function waitForDriver() {
  for (let i = 0; i < 30; i++) {
    try {
      await fetch(`${driverUrl}/status`);
      return;
    } catch {
      await sleep(500);
    }
  }
  throw new Error('chromedriver did not start');
}

const driver = spawn('chromedriver', [`--port=${port}`, '--allowed-ips=127.0.0.1'], {
  stdio: 'ignore',
});
process.on('exit', () => driver.kill());

await waitForDriver();

const chromeOptions = {
  args: [
    '--headless=new',
    '--no-sandbox',
    '--disable-dev-shm-usage',
    '--disable-gpu',
    '--window-size=1280,1000',
    `--user-agent=${USER_AGENT}`,
  ],
};
if (process.env.CHROME_BINARY) {
  chromeOptions.binary = process.env.CHROME_BINARY;
}

const session = await request('POST', '/session', {
  capabilities: { alwaysMatch: { browserName: 'chrome', 'goog:chromeOptions': chromeOptions } },
});
const sessionId = session.value?.sessionId;
if (!sessionId) {
  throw new Error(`Failed to start a browser session: ${JSON.stringify(session)}`);
}

const execute = async (script) =>
  (await request('POST', `/session/${sessionId}/execute/sync`, { script, args: [] })).value;

const visit = async (path) => {
  await request('POST', `/session/${sessionId}/url`, { url: baseUrl + path });
  await sleep(LOAD_WAIT_MS);
};

const bannerShown = () => execute(`return !!document.querySelector('#haas-cookie-dialog')`);

let failures = 0;
try {
  await visit(PAGES[0]);
  if (!(await bannerShown())) {
    throw new Error(`No cookie banner on ${baseUrl}${PAGES[0]}, nothing to check`);
  }

  const accepted = await execute(`
    const button = document.querySelector('#haas-cookie-dialog .cookie-button.accept');
    if (!button) return false;
    button.click();
    return true;
  `);
  if (!accepted) {
    throw new Error('Could not find the accept button in the cookie banner');
  }
  await sleep(1000);
  console.log(`OK   ${PAGES[0]}: banner accepted and dismissed`);

  for (const path of PAGES.slice(1)) {
    await visit(path);
    if (await bannerShown()) {
      failures++;
      console.error(`FAIL ${path}: cookie banner shown again after it was accepted`);
    } else {
      console.log(`OK   ${path}: banner stays dismissed`);
    }
  }
} finally {
  await request('DELETE', `/session/${sessionId}`);
  driver.kill();
}

if (failures > 0) {
  console.error(
    `\n${failures} page view(s) asked for cookie consent again. ` +
      'Consent is stored in a `privacyPolicy` cookie scoped to `domain=vaadin.com`, ' +
      `which the browser rejects on ${new URL(baseUrl).host}.`
  );
  process.exit(1);
}

console.log('\nCookie consent persists across page views.');
