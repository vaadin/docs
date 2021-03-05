import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement } from 'lit-element';
import { applyTheme } from 'generated/theme';

// tag::snippet[]
@customElement('form-layout-custom-layout-heading')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  render() {
    return html`
      <p>
        Use the draggable split handle to resize Form Layout's available space and test its
        responsiveness;
      </p>
    `;
  }
}
// end::snippet[]
