// Import all Material CSS custom properties into the global style scope
// tag::color[]
import '@vaadin/vaadin-material-styles/color';
// end::color[]
import { colorDark } from '@vaadin/vaadin-material-styles/color'; // hidden-source-line
// tag::typography[]
import '@vaadin/vaadin-material-styles/typography';
// end::typography[]
import { includeModule } from './include-module'; // hidden-source-line
// prettier-ignore
includeModule(colorDark, (css) => css.replace(':host', 'html[theme~="dark"]').replace('background-color: var(--material-background-color);', '').replace('color: var(--material-body-text-color);', '')); // hidden-source-line
window.dispatchEvent(new CustomEvent('custom-properties-changed')); // hidden-source-line
