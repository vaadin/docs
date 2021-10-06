// Import all Lumo CSS custom properties into the global style scope
// tag::color[]
import '@vaadin/vaadin-lumo-styles/color';
// end::color[]
// tag::typography[]
import '@vaadin/vaadin-lumo-styles/typography';
// end::typography[]
// tag::size[]
import '@vaadin/vaadin-lumo-styles/sizing';
// end::size[]
// tag::space[]
import '@vaadin/vaadin-lumo-styles/spacing';
// end::space[]
// tag::style[]
import '@vaadin/vaadin-lumo-styles/style';
// end::style[]
// tag::utility-classes[]
import 'lumo-css-framework/all-classes.css';
// end::utility-classes[]
import { includeModule } from './include-module'; // hidden-source-line
import { applyTheme } from 'Frontend/generated/theme'; // hidden-source-line
// prettier-ignore
includeModule('lumo-color', (css) => `[theme~="dark"] ${css.split("[theme~='dark']")[1].split('}')[0]} }`); // hidden-source-line
applyTheme(document); // hidden-source-line
window.dispatchEvent(new CustomEvent('custom-properties-changed')); // hidden-source-line
