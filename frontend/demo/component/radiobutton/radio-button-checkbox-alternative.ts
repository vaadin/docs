import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/vaadin-radio-button/vaadin-radio-group';
import '@vaadin/vaadin-radio-button/vaadin-radio-button';
import '@vaadin/vaadin-checkbox/vaadin-checkbox';
import '@vaadin/vaadin-ordered-layout/vaadin-vertical-layout';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('radio-button-checkbox-alternative')
export class Example extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
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
