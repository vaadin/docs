import colorScheme from '@vaadin/vaadin-lumo-styles/src/global/color-scheme.css?inline';
import propsStyles from '@vaadin/vaadin-lumo-styles/src/props/index.css?inline';
import utilityStyles from '@vaadin/vaadin-lumo-styles/utility.css?inline';
import { addStylesheet } from 'Frontend/demo/theme';

// Extract dark theme properties. Exclude non-custom properties, so that we don't override docs
// styles (color, background) with Lumo styles.
// eslint-disable-next-line @typescript-eslint/no-base-to-string
const darkThemeProps = colorScheme
  .toString()
  .split('\n')
  .filter((line) => line.trim().startsWith('--'));
const darkThemeStyles = `
[theme~='dark'] {
${darkThemeProps.join('\n')}
}
`;

// Include styles in the page
// addStylesheet(propsStyles);
// addStylesheet(utilityStyles);
// addStylesheet(darkThemeStyles);

// Notify DSP CustomPropertyPreview React component after custom properties have been loaded
// window.dispatchEvent(new CustomEvent('custom-properties-changed'));

// Dummy element so that this module can be included as a rendered example in a docs page
export default class LumoTokens extends HTMLElement {}
