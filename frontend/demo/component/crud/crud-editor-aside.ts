import '../../init'; // hidden-full-source-line
import '@vaadin/flow-frontend/gridConnector.js'; // hidden-full-source-line

import { html, LitElement, customElement, internalProperty } from 'lit-element';
import '@vaadin/vaadin-crud/vaadin-crud';
import { getPeople } from '../../domain/DataService';
import Person from '../../../generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'generated/theme';

@customElement('crud-editor-aside')
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
    const crud = this.shadowRoot?.querySelector('vaadin-crud');
    if (crud) {
      crud.editorOpened = true;
      crud.editedItem = this.items[0];
      (crud as any).__isNew = false;
    }
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-crud
        editor-position="aside"
        include="firstName, lastName, email, profession"
        .items=${this.items}
      ></vaadin-crud>
      <!-- end::snippet[] -->
    `;
  }
}
