import '../../init'; // hidden-full-source-line

import { html, css, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-ordered-layout/vaadin-scroller';
import '@vaadin/vaadin-text-field/vaadin-text-field';
import '@vaadin/vaadin-text-field/vaadin-text-area';
import '@vaadin/vaadin-date-picker/vaadin-date-picker';
import '@vaadin/vaadin-button/vaadin-button';
import '@vaadin/vaadin-icons/vaadin-icons';
import '@vaadin/vaadin-lumo-styles/icons';

@customElement('scroller-basic')
export class Example extends LitElement {
  static get styles() {
    return css`
      #container {
        width: calc(var(--lumo-size-l) * 8);
        font-family: var(--lumo-font-family);
        border: 1px solid var(--lumo-contrast-20pct);
      }

      #header {
        display: flex;
        border-bottom: 1px solid var(--lumo-contrast-20pct);
        padding: var(--lumo-space-m);
        align-items: center;
      }

      #header iron-icon {
        height: var(--lumo-font-size-m);
        margin-right: var(--lumo-space-m);
        cursor: pointer;
        color: var(--lumo-tertiary-text-color);
      }

      #header span {
        font-size: var(--lumo-font-size-l);
      }

      #footer {
        border-top: 1px solid var(--lumo-contrast-20pct);
        padding: var(--lumo-space-wide-m);
      }

      #footer vaadin-button {
        margin-right: var(--lumo-space-s);
      }
    `;
  }

  render() {
    return html`
      <div id="container">
        <div id="header">
          <iron-icon icon="vaadin:arrow-left"></iron-icon>
          <span>Edit Employee</span>
        </div>

        <!-- tag::snippet[] -->
        <vaadin-scroller
          scroll-direction="vertical"
          style="height: 320px; padding: var(--lumo-space-m);"
        >
          <p style="font-size: var(--lumo-font-size-l); margin-top: var(--lumo-space-s)">
            Personal information
          </p>
          <vaadin-text-field style="width: 100%;" label="First name"></vaadin-text-field>
          <vaadin-text-field style="width: 100%;" label="Last name"></vaadin-text-field>
          <vaadin-date-picker
            style="width: 100%;"
            label="Birthdate"
            initial-position="1990-01-01"
          ></vaadin-date-picker>

          <p style="font-size: var(--lumo-font-size-l)">Employment</p>
          <vaadin-text-field style="width: 100%;" label="Position"></vaadin-text-field>
          <vaadin-text-area style="width: 100%;" label="Additional information"></vaadin-text-area>
        </vaadin-scroller>
        <!-- end::snippet[] -->

        <div id="footer">
          <vaadin-button theme="primary icon">Save</vaadin-button>
          <vaadin-button theme="tertiary">Reset</vaadin-button>
        </div>
      </div>
    `;
  }
}
