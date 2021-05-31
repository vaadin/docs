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

function testHeartbeat() {
  fetch(withPrefix('/vaadin/?v-r=heartbeat&v-uiId=0'), { method: 'POST' }).then((data) => {
    const reloadTimestamp = localStorage.getItem('reloadTimestamp');
    if (!data.ok && (!reloadTimestamp || Date.now() - parseInt(reloadTimestamp) > 5 * 60 * 1000)) {
      localStorage.setItem('reloadTimestamp', Date.now().toString());
      location.reload();
    }
  });
}

const initialListener = (e: any) => {
  window.removeEventListener('included-example-loaded', initialListener);
  customElements.whenDefined(e.detail).then(() => {
    fetch(withPrefix('/vaadin/index.html')).then((serverData) => {
      if (serverData.ok) {
        window.addEventListener('included-example-loaded', () => testHeartbeat());
        testHeartbeat();
      }
    });
  });
};

window.addEventListener('included-example-loaded', initialListener);
