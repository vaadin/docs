import '@vaadin/flow-frontend/dndConnector-es6.js';
import '@vaadin/flow-frontend/flow-component-renderer.js';
import client from '../generated/connect-client.default';
// @ts-ignore
client.prefix = __VAADIN_CONNECT_PREFIX__;

// The connectors require window.Vaadin.Flow namespace to exists
// @ts-ignore
window.Vaadin = window.Vaadin || {};
// @ts-ignore
window.Vaadin.Flow = window.Vaadin.Flow || {};
