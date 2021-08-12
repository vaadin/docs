import { getUserPermissions } from 'Frontend/demo/domain/DataService'; // hidden-source-line
import 'Frontend/demo/init'; // hidden-source-line
import UserPermissions from 'Frontend/generated/com/vaadin/demo/domain/UserPermissions'; // hidden-source-line
import '@vaadin/flow-frontend/gridConnector.js'; // hidden-source-line (Grid's connector)
import '@vaadin/vaadin-template-renderer/src/vaadin-template-renderer.js'; // hidden-source-line (Legacy template renderer)
import { html, LitElement, render } from 'lit';
import { guard } from 'lit/directives/guard';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/vaadin-grid/vaadin-grid';
import { GridColumnElement, GridItemModel } from '@vaadin/vaadin-grid';
import '@vaadin/vaadin-icon/vaadin-icon';
import '@vaadin/vaadin-icons/vaadin-iconset';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('badge-icons-only-table')
export class Example extends LitElement {
  @state()
  private items: readonly UserPermissions[] = [];

  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  async firstUpdated() {
    this.items = await getUserPermissions();
  }

  render() {
    // tag::snippet[]
    const renderBoolean = guard(
      [],
      () =>
        (
          root: HTMLElement,
          column?: GridColumnElement,
          model?: GridItemModel<UserPermissions>
        ): void => {
          if (!column || !model) {
            return;
          }

          let icon: string;
          let title: string;
          let theme: string;

          if (model.item[column.id as keyof UserPermissions]) {
            icon = 'vaadin:check';
            title = 'Yes';
            theme = 'success';
          } else {
            icon = 'vaadin:close-small';
            title = 'No';
            theme = 'error';
          }

          render(
            html`
              <vaadin-icon
                aria-label="${title}"
                icon="${icon}"
                style="padding: var(--lumo-space-xs)"
                theme="badge ${theme}"
                title="${title}"
              ></vaadin-icon>
            `,
            root
          );
        }
    );

    return html`
      <vaadin-grid .items="${this.items}">
        <vaadin-grid-column path="name" header="Name"></vaadin-grid-column>
        <vaadin-grid-column
          id="view"
          header="View"
          .renderer="${renderBoolean}"
        ></vaadin-grid-column>
        <vaadin-grid-column
          id="comment"
          header="Comment"
          .renderer="${renderBoolean}"
        ></vaadin-grid-column>
        <vaadin-grid-column
          id="edit"
          header="Edit"
          .renderer="${renderBoolean}"
        ></vaadin-grid-column>
      </vaadin-grid>
    `;
    // end::snippet[]
  }
}
