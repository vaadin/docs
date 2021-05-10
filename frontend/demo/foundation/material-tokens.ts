// Import all Material CSS custom properties into the global style scope
// tag::color[]
import '@vaadin/vaadin-material-styles/color';
// end::color[]
// tag::typography[]
import '@vaadin/vaadin-material-styles/typography';
// end::typography[]
window.dispatchEvent(new CustomEvent('custom-properties-changed')); // hidden-source-line
