import '../../init'; // hidden-full-source-line
import '@vaadin/flow-frontend/gridConnector.js'; // hidden-full-source-line

import { html, LitElement, customElement, internalProperty, css } from 'lit-element';
import '@vaadin/vaadin-crud/vaadin-crud';
import '@vaadin/vaadin-form-layout/vaadin-form-layout';
import '@vaadin/vaadin-text-field/vaadin-text-field';
import '@vaadin/vaadin-text-field/vaadin-email-field';
import '@vaadin/vaadin-combo-box/vaadin-combo-box';
import { getPeople } from '../../domain/DataService';
import Person from '../../../generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'generated/theme';

@customElement('crud-editor-content')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  static get styles() {
    return css`
      vaadin-crud {
        --vaadin-crud-editor-max-height: 100%;
      }
    `;
  }

  @internalProperty()
  private items: Person[] = [];

  async firstUpdated() {
    this.items = await getPeople();
    const crud = this.shadowRoot?.querySelector('vaadin-crud');
    if (crud) {
      crud.editorOpened = true;
      const comboBox = crud?.shadowRoot?.querySelector('vaadin-combo-box');
      if (comboBox) {
        // Items need to be assigned before setting editedItem
        comboBox.items = [...new Set(this.items.map(i => i.profession))];
      }
      crud.editedItem = this.items[0];
      (crud as any).__isNew = false;
    }
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <!-- Bottom editor position with 100% max-height is used only for demonstration purposes -->
      <vaadin-crud
        editor-position="bottom"
        include="firstName, lastName, email, profession"
        .items=${this.items}
      >
        <vaadin-form-layout slot="form">
          <vaadin-text-field path="firstName" label="First name" required></vaadin-text-field>
          <vaadin-text-field path="lastName" label="Last name" required></vaadin-text-field>
          <vaadin-email-field path="email" label="Email" required></vaadin-email-field>
          <vaadin-combo-box
            path="profession"
            label="Profession"
            .items="${[...new Set(this.items.map(i => i.profession))]}"
          ></vaadin-combo-box>
        </vaadin-form-layout>
      </vaadin-crud>
      <!-- end::snippet[] -->
    `;
  }
}
