import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/grid-pro';
import '@vaadin/grid-pro/vaadin-grid-pro-edit-column.js';
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import type { GridItemModel } from '@vaadin/grid';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('grid-pro-cell-editability')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  @state()
  private items: Person[] = [];

  protected override async firstUpdated() {
    const { people } = await getPeople();
    this.items = people;
  }

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-grid-pro .items="${this.items}">
        <vaadin-grid-pro-edit-column path="firstName"></vaadin-grid-pro-edit-column>
        <vaadin-grid-pro-edit-column path="lastName"></vaadin-grid-pro-edit-column>
        <vaadin-grid-pro-edit-column
          path="email"
          .isCellEditable="${this.isSubscriber}"
        ></vaadin-grid-pro-edit-column>
        <vaadin-grid-pro-edit-column
          path="subscriber"
          editor-type="checkbox"
        ></vaadin-grid-pro-edit-column>
      </vaadin-grid-pro>
      <!-- end::snippet[] -->
    `;
  }

  protected isSubscriber(model: GridItemModel<Person>) {
    return model.item.subscriber;
  }
}
