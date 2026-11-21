// @ts-expect-error Suppress the error
import { withPrefix } from 'gatsby';

function testHeartbeat() {
  console.debug('testHeartbeat');
  fetch(withPrefix('/vaadin/?v-r=heartbeat&v-uiId=0'), { method: 'POST' }).then((data) => {
    console.debug('testHeartbeat', data);
    const reloadTimestamp = localStorage.getItem('reloadTimestamp');
    console.debug('testHeartbeat', reloadTimestamp);
    // Reload only when the session has expired (403). A 404 just means there is no UI with id 0 in the
    // session, for example after a previous page was closed, and reloading would not change that.
    if (
      data.status === 403 &&
      (!reloadTimestamp || Date.now() - parseInt(reloadTimestamp) > 5 * 60 * 1000)
    ) {
      console.debug('testHeartbeat', 'reload');
      // Save the previous reload timestamp to avoid reloading in less than 5 minutes
      localStorage.setItem('reloadTimestamp', Date.now().toString());
      location.reload();
    }
  });
}

const initialListener = ((e: CustomEvent<string>) => {
  console.debug('initialListener', e.detail);
  window.removeEventListener('included-example-loaded', initialListener);
  // Make sure flow example is upgraded and requested content from server
  customElements.whenDefined(e.detail).then(() => {
    console.debug('initialListener', 'upgraded');
    // Make sure server is up and running
    fetch(withPrefix('/vaadin/index.html')).then((serverData) => {
      console.debug('initialListener', 'serverData', serverData);
      if (serverData.ok) {
        console.debug('initialListener', 'serverData', 'ok');
        window.addEventListener('included-example-loaded', () => testHeartbeat());
        testHeartbeat();
      }
    });
  });
}) as EventListener;

// Examples are not available when session is expired. Logic prevents that by reloading the page.
window.addEventListener('included-example-loaded', initialListener);
