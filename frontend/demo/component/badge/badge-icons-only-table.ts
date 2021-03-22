import { getUserPermissions } from 'Frontend/demo/domain/DataService'; // hidden-full-source-line
import 'Frontend/demo/init'; // hidden-full-source-line
import UserPermissions from 'Frontend/generated/com/vaadin/demo/domain/UserPermissions'; // hidden-full-source-line

import '@vaadin/vaadin-grid';
import '@vaadin/vaadin-icons/vaadin-icons';
import '@vaadin/vaadin-lumo-styles/icons';
import type { GridColumnElement, GridItemModel } from '@vaadin/vaadin-grid';
import { applyTheme } from 'Frontend/generated/theme';
import { css, customElement, html, internalProperty, LitElement } from 'lit-element';
import { render } from 'lit-html';

const renderBoolean = (
  root: HTMLElement,
  column?: GridColumnElement,
  model?: GridItemModel
): void => {
  if (!column || !model) {
    return;
  }

  let icon: string;
  let title: string;
  let theme: string;

  if ((model.item as UserPermissions)[column.id as keyof UserPermissions]) {
    icon = 'vaadin:check-circle';
    title = 'Confirmed';
    theme = 'success';
  } else {
    icon = 'vaadin:close-circle';
    title = 'Cancelled';
    theme = 'error';
  }

  render(
    html`
      <iron-icon
        icon=${icon}
        theme="badge ${theme} pill"
        title=${title}
        aria-label=${title}
      ></iron-icon>
    `,
    root
  );
};

@customElement('badge-icons-only-table')
export class Example extends LitElement {
  static styles = css`
    .container {
      box-sizing: border-box;
      width: calc(var(--lumo-space-xl) * 15);
    }

    .container vaadin-grid {
      height: calc(var(--lumo-space-xl) * 4.25);
    }
  `;

  @internalProperty() private _items: readonly UserPermissions[] = [];

  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  async firstUpdated() {
    this._items = await getUserPermissions();
  }

  render() {
    return html`
      <section class="container">
        <!-- tag::snippet[] -->
        <vaadin-grid .items=${this._items}>
          <vaadin-grid-column path="name" header="Name"></vaadin-grid-column>
          <vaadin-grid-column
            id="view"
            header="View"
            .renderer=${renderBoolean}
          ></vaadin-grid-column>
          <vaadin-grid-column
            id="comment"
            header="Comment"
            .renderer=${renderBoolean}
          ></vaadin-grid-column>
          <vaadin-grid-column
            id="edit"
            header="Edit"
            .renderer=${renderBoolean}
          ></vaadin-grid-column>
        </vaadin-grid>
        <!-- end::snippet[] -->
      </section>
    `;
  }
}
