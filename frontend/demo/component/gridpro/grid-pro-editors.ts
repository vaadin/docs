import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/date-picker';
import { columnBodyRenderer } from '@vaadin/grid/lit.js';
import '@vaadin/grid-pro';
import '@vaadin/grid-pro/vaadin-grid-pro-edit-column.js';
import { columnEditModeRenderer } from '@vaadin/grid-pro/lit.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'Frontend/generated/theme';
import { format, parseISO } from 'date-fns';

@customElement('grid-pro-editors')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
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
      <vaadin-grid-pro .items="${this.items}" enter-next-row>
        <vaadin-grid-pro-edit-column path="firstName"></vaadin-grid-pro-edit-column>
        <vaadin-grid-pro-edit-column
          path="membership"
          editor-type="select"
          .editorOptions="${['Regular', 'Premium', 'VIP']}"
        ></vaadin-grid-pro-edit-column>
        <vaadin-grid-pro-edit-column path="subscriber" editor-type="checkbox">
        </vaadin-grid-pro-edit-column>
        <vaadin-grid-pro-edit-column
          path="birthday"
          ${columnBodyRenderer<Person>(
            ({ birthday }) => html`${format(parseISO(birthday), 'MM/dd/yyyy')}`,
            []
          )}
          ${columnEditModeRenderer<Person>(
            ({ birthday }) =>
              html`
                <vaadin-date-picker style="width: 100%" .value="${birthday}"></vaadin-date-picker>
              `,
            []
          )}
        ></vaadin-grid-pro-edit-column>
      </vaadin-grid-pro>
      <!-- end::snippet[] -->
    `;
  }
}
