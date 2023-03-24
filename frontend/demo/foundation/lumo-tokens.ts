// Import all Lumo CSS custom properties into the global style scope
// tag::color[]
import '@vaadin/vaadin-lumo-styles/color.js';
// end::color[]
import { color } from '@vaadin/vaadin-lumo-styles/color.js'; // hidden-source-line
// tag::typography[]
import '@vaadin/vaadin-lumo-styles/typography.js';
// end::typography[]
// tag::size[]
import '@vaadin/vaadin-lumo-styles/sizing.js';
// end::size[]
// tag::space[]
import '@vaadin/vaadin-lumo-styles/spacing.js';
// end::space[]
// tag::style[]
import '@vaadin/vaadin-lumo-styles/style.js';
// end::style[]
// tag::utility-classes[]
import '@vaadin/vaadin-lumo-styles/utility.js';
// end::utility-classes[]
import { includeModule } from './include-module.js'; // hidden-source-line
import { applyTheme } from 'Frontend/generated/theme.js'; // hidden-source-line
// prettier-ignore
includeModule(color, (css) => `[theme~="dark"] ${css.split("[theme~='dark']")[1].split('}')[0]} }`); // hidden-source-line
applyTheme(document); // hidden-source-line
window.dispatchEvent(new CustomEvent('custom-properties-changed')); // hidden-source-line
export default class LumoTokens extends HTMLElement {} // hidden-source-line
