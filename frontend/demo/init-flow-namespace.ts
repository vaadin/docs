// The connectors require window.Vaadin.Flow namespace to exists
window.Vaadin = window.Vaadin || {};
// @ts-expect-error Used by the connectors
window.Vaadin.Flow = window.Vaadin.Flow || {};
const loadOnDemand = async () => Promise.resolve(0);
// @ts-expect-error Define loadOnDemand function from `generated-flow-imports.js` in case that module is not loaded
window.Vaadin.Flow.loadOnDemand = window.Vaadin.Flow.loadOnDemand || loadOnDemand;
