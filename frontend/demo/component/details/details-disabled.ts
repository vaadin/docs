import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-details/vaadin-details';
import { applyTheme } from 'Frontend/generated/theme';

// tag::snippet[]
@customElement('details-disabled')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  render() {
    return html`
      <vaadin-details disabled>
        <div slot="summary">Members (8)</div>

        <ul>
          <li>Blake Martin</li>
          <li>Caroline Clark</li>
          <li>Avery Torres</li>
          <li>Khloe Scott</li>
          <li>Camila Fisher</li>
          <li>Gavin Lewis</li>
          <li>Isabella Powell</li>
          <li>Zoe Wilson</li>
        </ul>
      </vaadin-details>
    `;
  }
}
// end::snippet[]
