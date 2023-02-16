import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/checkbox';
import '@vaadin/radio-group';
import '@vaadin/vertical-layout';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('radio-button-checkbox-alternative')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <vaadin-vertical-layout>
        <!-- tag::snippet[] -->
        <vaadin-checkbox checked>
          <label slot="label">Reply All by default (unchecked state not clear)</label>
        </vaadin-checkbox>
        <vaadin-radio-group label="Default reply behavior">
          <vaadin-radio-button label="Reply" checked></vaadin-radio-button>
          <vaadin-radio-button label="Reply to all"></vaadin-radio-button>
        </vaadin-radio-group>
        <!-- end::snippet[] -->
      </vaadin-vertical-layout>
    `;
  }
}
