import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/checkbox';
import { applyTheme } from 'Frontend/generated/theme';

// tag::snippet[]
@customElement('checkbox-labeling')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`<vaadin-checkbox label="Yes, I agree"></vaadin-checkbox>`;
  }
}
// end::snippet[]
