import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/flow-frontend/gridConnector.js'; // hidden-source-line

import { html, LitElement, customElement, internalProperty } from 'lit-element';
import '@vaadin/vaadin-crud/vaadin-crud';
import { getPeople } from 'Frontend/demo/domain/DataService';
import Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('crud-localization')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  @internalProperty()
  private items: Person[] = [];

  async firstUpdated() {
    this.items = (await getPeople()).people;
    // tag::snippet[]
    const crud = this.shadowRoot?.querySelector('vaadin-crud');
    if (crud) {
      crud.i18n = {
        newItem: 'Luo uusi',
        editItem: 'Muuta tietoja',
        saveItem: 'Tallenna',
        cancel: 'Peruuta',
        deleteItem: 'Poista...',
        editLabel: 'Muokkaa',
        confirm: {
          delete: {
            title: 'Poista kohde',
            content: 'Haluatko varmasti poistaa tämän kohteen? Poistoa ei voi perua.',
            button: {
              confirm: 'Poista',
              dismiss: 'Peruuta',
            },
          },
          cancel: {
            title: 'Hylkää muutokset',
            content: 'Kohteessa on tallentamattomia muutoksia',
            button: {
              confirm: 'Hylkää',
              dismiss: 'Peruuta',
            },
          },
        },
      };
    }
    // end::snippet[]
  }

  render() {
    return html`
      <!-- tag::snippethtml[] -->

      <vaadin-crud
        editor-position="aside"
        include="firstName, lastName, email, profession"
        .items="${this.items}"
      >
        <vaadin-grid slot="grid">
          <vaadin-crud-edit-column></vaadin-crud-edit-column>
          <vaadin-grid-column path="firstName" header="Etunimi"></vaadin-grid-column>
          <vaadin-grid-column path="lastName" header="Sukunimi"></vaadin-grid-column>
          <vaadin-grid-column path="email" header="Sähköposti"></vaadin-grid-column>
          <vaadin-grid-column path="profession" header="Ammatti"></vaadin-grid-column>
        </vaadin-grid>
        <vaadin-form-layout slot="form">
          <vaadin-text-field path="firstName" label="Etunimi" required></vaadin-text-field>
          <vaadin-text-field path="lastName" label="Sukunimi" required></vaadin-text-field>
          <vaadin-email-field path="email" label="Sähköposti" required></vaadin-email-field>
          <vaadin-combo-box
            path="profession"
            label="Ammatti"
            .items="${[...new Set(this.items.map((i) => i.profession))]}"
          ></vaadin-combo-box>
        </vaadin-form-layout>
      </vaadin-crud>
      <!-- end::snippethtml[] -->
    `;
  }
}
