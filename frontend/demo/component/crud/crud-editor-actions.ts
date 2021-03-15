import '../../init'; // hidden-full-source-line
import '@vaadin/flow-frontend/gridConnector.js'; // hidden-full-source-line

import { html, LitElement, customElement, internalProperty } from 'lit-element';
import '@vaadin/vaadin-crud/vaadin-crud';
import { getPeople } from '../../domain/DataService';
import Person from '../../../generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'generated/theme';

@customElement('crud-editor-actions')
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
    const deleteBtn = this.shadowRoot
      ?.querySelector('vaadin-crud')
      ?.shadowRoot?.querySelector('vaadin-dialog-layout')
      ?.querySelectorAll('vaadin-button')[2];
    deleteBtn?.setAttribute('theme', 'primary error');
    // end::snippet[]
  }

  render() {
    return html`
      <!-- tag::snippethtml[] -->

      <vaadin-crud
        include="firstName, lastName, email, profession"
        .items=${this.items}
      ></vaadin-crud>
      <!-- end::snippethtml[] -->
    `;
  }
}
