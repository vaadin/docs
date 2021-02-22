import '../../init'; // hidden-full-source-line
import '@vaadin/flow-frontend/gridProConnector.js'; // hidden-full-source-line
import '@vaadin/flow-frontend/gridConnector.js'; // hidden-full-source-line

import { html, LitElement, internalProperty, customElement } from 'lit-element';
import '@vaadin/vaadin-grid-pro/vaadin-grid-pro';
import '@vaadin/vaadin-grid-pro/vaadin-grid-pro-edit-column';
import '@vaadin/vaadin-date-picker/vaadin-date-picker';
import { getPeople } from '../../domain/DataService';
import Person from '../../../generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'themes/theme-generated.js';
import { GridColumnElement, GridItemModel } from '@vaadin/vaadin-grid';

@customElement('grid-pro-editors')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  @internalProperty()
  private items: Person[] = [];

  async firstUpdated() {
    this.items = await getPeople();
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-grid-pro .items=${this.items} enter-next-row>
        <vaadin-grid-pro-edit-column path="firstName"> </vaadin-grid-pro-edit-column>
        <vaadin-grid-pro-edit-column
          path="membership"
          editor-type="select"
          .editorOptions=${['Regular', 'Premium', 'VIP']}
        >
        </vaadin-grid-pro-edit-column>
        <vaadin-grid-pro-edit-column path="subscriber" editor-type="checkbox">
        </vaadin-grid-pro-edit-column>
        <vaadin-grid-pro-edit-column
          path="birthday"
          .renderer=${(root: HTMLElement, _column?: GridColumnElement, model?: GridItemModel) => {
            const person = model?.item as Person;
            const birthday = new Date(`${person.birthday} 00:00.0000`).toLocaleDateString();
            root.textContent = birthday;
          }}
          .editModeRenderer=${(
            root: HTMLElement,
            _column?: GridColumnElement,
            model?: GridItemModel
          ) => {
            root.innerHTML = '';
            const datePicker = document.createElement('vaadin-date-picker');
            datePicker.value = (model?.item as Person).birthday;
            root.appendChild(datePicker);
          }}
        ></vaadin-grid-pro-edit-column>
      </vaadin-grid-pro>
      <!-- end::snippet[] -->
    `;
  }
}
