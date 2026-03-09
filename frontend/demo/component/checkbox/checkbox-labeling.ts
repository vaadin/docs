import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/checkbox';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';

// tag::snippet[]
@customElement('checkbox-labeling')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`<vaadin-checkbox label="Yes, I agree"></vaadin-checkbox>`;
  }
}
// end::snippet[]
