// The connectors require window.Vaadin.Flow namespace to exists
window.Vaadin = window.Vaadin || {};
window.Vaadin.Flow = window.Vaadin.Flow || {};
const loadOnDemand = async () => await Promise.resolve(0);
// @ts-expect-error Define loadOnDemand function from `generated-flow-imports.js` in case that module is not loaded
window.Vaadin.Flow.loadOnDemand = window.Vaadin.Flow.loadOnDemand ?? loadOnDemand;
