// ...
import { connectionIndicator } from '@vaadin/flow-frontend';

// Use custom theming
connectionIndicator.applyDefaultTheme = false;

// Set loading bar stage durations
connectionIndicator.firstDelay = 100;
connectionIndicator.secondDelay = 1000;
connectionIndicator.thirdDelay = 3000;

// Set status message properties
connectionIndicator.expandedDuration = 1000;
connectionIndicator.onlineText = 'Online';
connectionIndicator.offlineText = 'Offline';
connectionIndicator.reconnectingText = 'Reconnecting...';
