// @ts-ignore
import { withPrefix } from 'gatsby';
import { differenceInMinutes } from 'date-fns';
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
    const reloadDate =
      localStorage.getItem('reloadDate') && new Date(localStorage.getItem('reloadDate') as string);
    if (
      !data.ok &&
      (!reloadDate || (reloadDate && differenceInMinutes(new Date(), reloadDate) > 5))
    ) {
      localStorage.setItem('reloadDate', new Date().toString());
      location.reload();
    }
  });
}

const initialListener = () => {
  window.removeEventListener('included-example-loaded', initialListener);
  fetch(withPrefix('/vaadin/index.html')).then((serverData) => {
    if (serverData.ok) {
      window.addEventListener('included-example-loaded', () => testHeartbeat());
      testHeartbeat();
    }
  });
};

window.addEventListener('included-example-loaded', initialListener);
