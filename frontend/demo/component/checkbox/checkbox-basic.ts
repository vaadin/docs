import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/checkbox';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';

export @customElement('checkbox-basic')
class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-checkbox label="I accept the terms and conditions"></vaadin-checkbox>
      <!-- end::snippet[] -->
    `;
  }
}
