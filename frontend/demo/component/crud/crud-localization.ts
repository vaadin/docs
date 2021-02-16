import '../../init'; // hidden-full-source-line
import '@vaadin/flow-frontend/gridConnector.js'; // hidden-full-source-line

import { html, LitElement, customElement, internalProperty } from 'lit-element';
import '@vaadin/vaadin-crud/vaadin-crud';
import { getPeople } from '../../domain/DataService';
import Person from '../../../generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'generated/theme';

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
    this.items = await getPeople();
    // TODO use Finnish i18n; translate the object / update the form / leave as is
    // tag::snippet[]
    const crud = this.shadowRoot?.querySelector('vaadin-crud');
    if (crud) {
      crud.i18n = {
        newItem: 'Nuevo usuario',
        editItem: 'Editar usuario',
        saveItem: 'Guardar',
        cancel: 'Cancelar',
        deleteItem: 'Borrar...',
        editLabel: 'Editar usuario',
        confirm: {
          delete: {
            title: 'Confirmar borrado',
            content:
              '¿Estás seguro de querer borrar el usuario seleccionado? La acción no es reversible.',
            button: {
              confirm: 'Borrar',
              dismiss: 'Cancelar'
            }
          },
          cancel: {
            title: 'Cancelar la edición',
            content: 'Se han hecho cambios en el usuario que no se han guardado.',
            button: {
              confirm: 'Descartar cambios',
              dismiss: 'Continuar editando'
            }
          }
        }
      };
    }
    // end::snippet[]
    if (crud) {
      crud.editorOpened = true;
      crud.editedItem = this.items[0];
      (crud as any).__isNew = false;
    }
  }

  render() {
    return html`
      <!-- tag::snippethtml[] -->

      <vaadin-crud
        editor-position="aside"
        .editorOpened="${true}"
        include="firstName, lastName, email, profession"
        .items=${this.items}
      ></vaadin-crud>
      <!-- end::snippethtml[] -->
    `;
  }
}
