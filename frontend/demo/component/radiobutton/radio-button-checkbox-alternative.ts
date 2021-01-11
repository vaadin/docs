import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-radio-button/vaadin-radio-group';
import '@vaadin/vaadin-radio-button/vaadin-radio-button';
import '@vaadin/vaadin-checkbox/vaadin-checkbox';
import '@vaadin/vaadin-ordered-layout/vaadin-vertical-layout';
import { applyTheme } from 'themes/theme-generated.js';

@customElement('radio-button-checkbox-alternative')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom application theme to the view.
    // This is only supported if your app uses a custom theme.
    applyTheme(this.shadowRoot);
  }

  render() {
    return html`
      <vaadin-vertical-layout>
        <!-- tag::snippet[] -->
        <vaadin-checkbox checked>Reply All by default (unchecked state not clear)</vaadin-checkbox>
        <vaadin-radio-group label="Default reply behavior">
          <vaadin-radio-button checked>Reply</vaadin-radio-button>
          <vaadin-radio-button>Reply to all</vaadin-radio-button>
        </vaadin-radio-group>
        <!-- end::snippet[] -->
      </vaadin-vertical-layout>
    `;
  }
}
