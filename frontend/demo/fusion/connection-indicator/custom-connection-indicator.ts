// ...
import { connectionIndicator } from '@vaadin/flow-frontend';

//
// Customize the connection indicator
//

// Disable default styling to use custom styles for the indicator instead
// connectionIndicator.applyDefaultTheme = false; // default: `true`

//
// Loading bar (`.v-loading-indicator`)
//

// Delay for showing the indicator and setting the 'first' class name
connectionIndicator.firstDelay = 300; // 300 ms is the default

// Delay for setting the 'second' class name
connectionIndicator.secondDelay = 1500; // 1500 ms is the default

// Delay for setting the 'third' class name
connectionIndicator.thirdDelay = 5000; // 5000 ms is the default

//
// Connection status message (`.v-status-message`)
//

// Duration for which the messages are visible
connectionIndicator.expandedDuration = 2000; // 2000 ms is the default
// The message for the “connected” connection state
connectionIndicator.onlineText = 'Online';
// The message for the “connection lost” state
connectionIndicator.offlineText = 'Connection lost';
// The message for the “reconnecting” connection state
connectionIndicator.reconnectingText = 'Connection lost, trying to reconnect...';
