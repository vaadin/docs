// Imports for Flow component specific JS modules
// These need to be imported manually, as the
// webpack setup in this project ignores @JsModule
// annotations on the Flow components.
// Rather than adding the relevant imports to each
// specific example, which is error prone and hard
// to maintain, we import these modules once
// globally for all examples.

// General Flow modules
import '@vaadin/flow-frontend/dndConnector-es6.js';
import '@vaadin/flow-frontend/flow-component-renderer.js';

// Flow component specific modules
import '@vaadin/flow-frontend/comboBoxConnector.js';
import '@vaadin/flow-frontend/contextMenuConnector.js';
import '@vaadin/flow-frontend/datepickerConnector.js';
import '@vaadin/flow-frontend/gridConnector.js';
import '@vaadin/flow-frontend/vaadin-grid-flow-selection-column.js';
import '@vaadin/flow-frontend/gridProConnector.js';
import '@vaadin/flow-frontend/menubarConnector.js';
import '@vaadin/flow-frontend/messageListConnector.js';
import '@vaadin/flow-frontend/selectConnector.js';
import '@vaadin/flow-frontend/timepickerConnector.js';
import '@vaadin/flow-frontend/virtualListConnector.js';

// Lit renderer
import '@vaadin/flow-frontend/lit-renderer.ts';

// Legacy template renderer
import '@vaadin/vaadin-template-renderer/src/vaadin-template-renderer.js';
