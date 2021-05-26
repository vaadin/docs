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

window.addEventListener('included-example-loaded', (e) => {
  const includeUrl = (e as any).detail;
  // Make sure example includes Vaadin component
  if (includeUrl && includeUrl!.indexOf('vaadin') > -1) {
    // Make sure Vaadin server is up and running
    fetch(withPrefix(includeUrl)).then((urlFetch) => {
      if (urlFetch.ok) {
        fetch(withPrefix('/vaadin/?v-r=heartbeat&v-uiId=0'), {
          method: 'POST',
        }).then((data) => {
          // If session is expired reload the page
          if (!data.ok) {
            location.reload();
          }
        });
      }
    });
  }
});
