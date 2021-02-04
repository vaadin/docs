import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement, internalProperty } from 'lit-element';
import '@vaadin/vaadin-list-box';
import '@vaadin/vaadin-item/vaadin-item';
import '@vaadin/vaadin-icons/vaadin-icons';
import '@polymer/iron-icon';
import { applyTheme } from 'themes/theme-generated.js';

@customElement('list-box-multi-selection')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-list-box
        multiple
        style="height: calc(var(--lumo-size-l) * 5)"
        .selectedValues="${[0, 3]}"
      >
        <vaadin-item>Aria Bailey</vaadin-item>
        <vaadin-item>Aaliyah Butler</vaadin-item>
        <vaadin-item>Eleanor Price</vaadin-item>
        <vaadin-item>Allison Torres</vaadin-item>
        <vaadin-item>Madeline Lewis</vaadin-item>
        <vaadin-item>Lucas Edwards</vaadin-item>
        <vaadin-item>Paul Gibbs</vaadin-item>
        <vaadin-item>Hana Newton</vaadin-item>
        <vaadin-item>Jane Stone</vaadin-item>
      </vaadin-list-box>
      <!-- end::snippet[] -->
    `;
  }
}
