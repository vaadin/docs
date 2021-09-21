import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/vaadin-grid-pro/vaadin-grid-pro';
import '@vaadin/vaadin-grid-pro/vaadin-grid-pro-edit-column';
import '@vaadin/vaadin-date-picker/vaadin-date-picker';
import { getPeople } from 'Frontend/demo/domain/DataService';
import Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'Frontend/generated/theme';
import type { GridColumnElement, GridItemModel } from '@vaadin/vaadin-grid';
import { format, parseISO } from 'date-fns';

@customElement('grid-pro-editors')
export class Example extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  @state()
  private items: Person[] = [];

  async firstUpdated() {
    const { people } = await getPeople();
    this.items = people;
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-grid-pro .items="${this.items}" enter-next-row>
        <vaadin-grid-pro-edit-column path="firstName"> </vaadin-grid-pro-edit-column>
        <vaadin-grid-pro-edit-column
          path="membership"
          editor-type="select"
          .editorOptions="${['Regular', 'Premium', 'VIP']}"
        >
        </vaadin-grid-pro-edit-column>
        <vaadin-grid-pro-edit-column path="subscriber" editor-type="checkbox">
        </vaadin-grid-pro-edit-column>
        <vaadin-grid-pro-edit-column
          path="birthday"
          .renderer="${(
            root: HTMLElement,
            _column?: GridColumnElement,
            model?: GridItemModel<Person>
          ) => {
            if (!model) {
              return;
            }
            const person = model.item;
            root.textContent = format(parseISO(person.birthday), 'MM/dd/yyyy');
          }}"
          .editModeRenderer="${(
            root: HTMLElement,
            _column?: GridColumnElement,
            model?: GridItemModel<Person>
          ) => {
            if (!model) {
              return;
            }
            const person = model.item;

            let datePicker = root.querySelector('vaadin-date-picker');
            if (!datePicker) {
              root.innerHTML = '';
              datePicker = document.createElement('vaadin-date-picker');
              datePicker.style.width = '100%';
              root.appendChild(datePicker);
            }
            datePicker.value = person.birthday;
          }}"
        ></vaadin-grid-pro-edit-column>
      </vaadin-grid-pro>
      <!-- end::snippet[] -->
    `;
  }
}
