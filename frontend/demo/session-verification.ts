// @ts-ignore
import { withPrefix } from 'gatsby';

function testHeartbeat() {
  fetch(withPrefix('/vaadin/?v-r=heartbeat&v-uiId=0'), { method: 'POST' }).then((data) => {
    const reloadTimestamp = localStorage.getItem('reloadTimestamp');
    // Make sure session is still opened, otherwise reload the page
    if (!data.ok && (!reloadTimestamp || Date.now() - parseInt(reloadTimestamp) > 5 * 60 * 1000)) {
      // Save the previous reload timestamp to avoid reloading in less than 5 minutes
      localStorage.setItem('reloadTimestamp', Date.now().toString());
      location.reload();
    }
  });
}

const initialListener = ((e: CustomEvent<string>) => {
  window.removeEventListener('included-example-loaded', initialListener);
  // Make sure flow example is upgraded and requested content from server
  customElements.whenDefined(e.detail).then(() => {
    // Make sure server is up and running
    fetch(withPrefix('/vaadin/?v-r=uidl')).then((serverData) => {
      if (serverData.ok) {
        window.addEventListener('included-example-loaded', () => testHeartbeat());
        testHeartbeat();
      }
    });
  });
}) as EventListener;

// Examples are not available when session is expired. Logic prevents that by reloading the page.
window.addEventListener('included-example-loaded', initialListener);
