import '../../init'; // hidden-full-source-line
import '@vaadin/flow-frontend/gridConnector.js'; // hidden-full-source-line

import { html, LitElement, customElement, internalProperty, css } from 'lit-element';
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
      crud.editedItem = this.items[0];
      (crud as any).__isNew = false;
    }
    // TODO(yuriy): update once https://github.com/vaadin/vaadin-crud/issues/228 is closed.
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
        editor-position="bottom"
        include="firstName, lastName, email, profession"
        .items=${this.items}
      ></vaadin-crud>
      <!-- end::snippethtml[] -->
    `;
  }
}
