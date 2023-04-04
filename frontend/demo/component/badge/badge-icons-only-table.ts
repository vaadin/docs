import { getUserPermissions } from 'Frontend/demo/domain/DataService'; // hidden-source-line
import 'Frontend/demo/init'; // hidden-source-line
import type UserPermissions from 'Frontend/generated/com/vaadin/demo/domain/UserPermissions'; // hidden-source-line
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/grid';
import { columnBodyRenderer } from '@vaadin/grid/lit.js';
import type { GridColumnBodyLitRenderer } from '@vaadin/grid/lit.js';
import '@vaadin/icon';
import '@vaadin/icons';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('badge-icons-only-table')
export class Example extends LitElement {
  @state()
  private items: readonly UserPermissions[] = [];

  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  protected override async firstUpdated() {
    this.items = await getUserPermissions();
  }

  protected override render() {
    // tag::snippet[]
    const renderBoolean: GridColumnBodyLitRenderer<UserPermissions> = (item, _model, column) => {
      let icon: string;
      let title: string;
      let theme: string;

      if (item[column.id as keyof UserPermissions]) {
        icon = 'vaadin:check';
        title = 'Yes';
        theme = 'success';
      } else {
        icon = 'vaadin:close-small';
        title = 'No';
        theme = 'error';
      }

      return html`
        <vaadin-icon
          aria-label="${title}"
          icon="${icon}"
          style="padding: var(--lumo-space-xs)"
          theme="badge ${theme}"
          title="${title}"
        ></vaadin-icon>
      `;
    };

    return html`
      <vaadin-grid .items="${this.items}">
        <vaadin-grid-column path="name" header="Name"></vaadin-grid-column>
        <vaadin-grid-column
          id="view"
          header="View"
          ${columnBodyRenderer(renderBoolean, [])}
        ></vaadin-grid-column>
        <vaadin-grid-column
          id="comment"
          header="Comment"
          ${columnBodyRenderer(renderBoolean, [])}
        ></vaadin-grid-column>
        <vaadin-grid-column
          id="edit"
          header="Edit"
          ${columnBodyRenderer(renderBoolean, [])}
        ></vaadin-grid-column>
      </vaadin-grid>
    `;
    // end::snippet[]
  }
}
