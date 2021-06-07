// @ts-ignore
import { withPrefix } from 'gatsby';
import './init-flow-namespace';
import { applyTheme } from 'Frontend/generated/theme';
// See webpack.config 'externals.Frontend/generated/theme'
// This file ends up in the docs-app bundle
// @ts-ignore
window.__applyTheme = { applyTheme };
// @ts-ignore
import('all-flow-imports-or-empty').catch(() => {});

let timestamp = Date.now();
let interval: ReturnType<typeof setInterval>;
const sessionTimeout = 30 * 60 * 1000;

const compareTimestamps = () => {
  if (Date.now() - timestamp > sessionTimeout) {
    fetch(withPrefix('/vaadin/index.html')).then((serverData) => {
      if (serverData.ok) {
        location.reload();
      }
    });
  }
};

const updateTimestamps = () => {
  timestamp = Date.now();
  if (interval) {
    clearInterval(interval);
  }

  interval = setInterval(compareTimestamps, sessionTimeout);
};

const initialListener = () => {
  window.removeEventListener('update-timestamp', initialListener);
  interval = setInterval(compareTimestamps, sessionTimeout);
  window.addEventListener('update-timestamp', updateTimestamps);
};

// Examples are not available when session is expired. Logic prevents that by reloading the page.
window.addEventListener('update-timestamp', initialListener);
