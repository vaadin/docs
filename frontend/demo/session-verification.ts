// @ts-ignore
import { withPrefix } from 'gatsby';

// Stores the last time UI polls the server
let timestamp: number;
let interval: ReturnType<typeof setInterval>;
const sessionTimeout = 20 * 60 * 1000;

const compareTimestamps = () => {
  // Event could be emitted with a delay up to 2 seconds after the poll
  // Check if the timestamp is not updated after two intervals
  if (Date.now() - timestamp > 2 * sessionTimeout) {
    // Make sure we are not reloading the page before the server becomes available
    fetch(withPrefix('/vaadin/index.html')).then((serverData) => {
      if (serverData.ok) {
        // If the server is up and running and the session is expired, reload the page
        location.reload();
      }
    });
  }
};

const updateTimestamps = () => {
  // Check if session is expired
  compareTimestamps();
  timestamp = Date.now();
  // Avoid setting multiple intervals
  if (interval) {
    clearInterval(interval);
  }

  // Make sure interval starts at the time of UI polling the server
  interval = setInterval(compareTimestamps, sessionTimeout);
};

// Examples are not available when session expires
// Event is emitted when UI polls the server. It keeps session alive
window.addEventListener('update-timestamp', updateTimestamps);
