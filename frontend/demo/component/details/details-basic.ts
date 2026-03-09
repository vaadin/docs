import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/details';
import '@vaadin/vertical-layout';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('details-basic')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  protected override render() {
    // tag::snippet[]
    return html`
      <vaadin-details summary="Contact information" opened>
        <vaadin-vertical-layout>
          <span>Sophia Williams</span>
          <span>sophia.williams@company.com</span>
          <span>(501) 555-9128</span>
        </vaadin-vertical-layout>
      </vaadin-details>
    `;
    // end::snippet[]
  }
}
