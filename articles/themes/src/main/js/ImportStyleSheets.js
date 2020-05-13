// tutorial::../documentation-themes/importing-style-sheets.asciidoc

// tag::import-register-styles-function[]
// Import the function that allows you to register style sheets for components
import { registerStyles } from '@vaadin/vaadin-themable-mixin/register-styles.js';
// end::import-register-styles-function[]
// tag::import-css-function[]

// Import the tagged template function that is used to define
// a multi-line CSS string
import { css } from '@vaadin/vaadin-themable-mixin/register-styles.js';
// end::import-css-function[]

// tag::register-styles[]

// Define and register a style sheet for the <vaadin-text-field> component
registerStyles('vaadin-text-field', css`
  [part="input-field"] {
    border: 1px solid;
    ...
  }
`);
// end::register-styles[]

// tag::register-styles-multiple[]
// Register the same style sheet for both the <vaadin-select-overlay>
// and the <vaadin-combo-box-overlay> elements
registerStyles('vaadin-select-overlay vaadin-combo-box-overlay', css`
  /* Styles which will be imported in
     vaadin-select-overlay and vaadin-combo-box-overlay
     local style scopes */
`);
// end::register-styles-multiple[]

// tag::export-css[]

// Define and export a string of reusable CSS
export default css`
  h1 {
    font-weight: 300;
    font-size: 40px;
  }

  h2 {
    font-weight: 300;
    font-size: 32px;
  }

  h3 {
    font-weight: 400;
    font-size: 24px;
  }
`;
// end::export-css[]

// tag::import-shared-css[]
// Import a string of shared CSS
import sharedTypography from 'styles/shared-typography.css.js';
// end::import-shared-css[]
// tag::import-css[]

// Create a new <style> element and add the shared CSS to it.
const style = document.createElement('style');
style.innerHTML = sharedTypography.toString();

// Add the new style sheet to the global scope (document)
document.head.appendChild(style);
// end::import-css[]

// tag::register-styles-include[]
// Register the shared typography styles for
// the <vaadin-confirm-dialog-overlay> element
registerStyles('vaadin-confirm-dialog-overlay', sharedTypography);
// end::register-styles-include[]

// tag::import-polymer[]
import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
// end::import-polymer[]

// tag::custom-element[]

class MyView extends PolymerElement {
  static get template() {
    return html`
      ${sharedTypography}
      <h2>My view title</h2>
      ...
    `;
  }
  static get is() {
    return 'my-view';
  }
}
customElements.define(MyView.is, MyView);
// end::custom-element[]


// tag::client-side-theme[]
// Import a theme-specific component, for example <vaadin-button>
import '@vaadin/vaadin-button/theme/lumo/vaadin-button.js';

// Import the color style sheet if you are using some of
// the custom color properties Lumo offers
import '@vaadin/vaadin-lumo-styles/color.js';
// end::client-side-theme[]
