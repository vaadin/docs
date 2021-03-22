import { getUserPermissions, UserPermissions } from 'Frontend/demo/domain/DataService'; // hidden-full-source-line
import 'Frontend/demo/init'; // hidden-full-source-line
import './init'; // hidden-full-source-line

import '@vaadin/vaadin-grid/vaadin-grid';
import type { GridItemModel } from '@vaadin/vaadin-grid';
import type { GridColumnElement } from '@vaadin/vaadin-grid/vaadin-grid';
import { applyTheme } from 'Frontend/generated/theme';
import { css, customElement, html, LitElement } from 'lit-element';
import { render } from 'lit-html';

@customElement('badge-icons-only-table')
export class Example extends LitElement {
  static styles = css`
    :host {
      box-sizing: border-box;
      width: calc(var(--lumo-space-xl) * 15);
    }

    :host vaadin-grid {
      height: calc(var(--lumo-space-xl) * 4.25);
    }
  `;

  private static _renderBoolean(
    root: HTMLElement,
    column?: GridColumnElement,
    model?: GridItemModel
  ): void {
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
  }

  public ['constructor']: typeof Example;

  private _items: readonly UserPermissions[] = [];

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
      <!-- tag::snippet[] -->
      <vaadin-grid .items=${this._items}>
        <vaadin-grid-column path="name" header="Name"></vaadin-grid-column>
        <vaadin-grid-column
          id="view"
          header="View"
          .renderer=${this.constructor._renderBoolean}
        ></vaadin-grid-column>
        <vaadin-grid-column
          id="comment"
          header="Comment"
          .renderer=${this.constructor._renderBoolean}
        ></vaadin-grid-column>
        <vaadin-grid-column
          id="edit"
          header="Edit"
          .renderer=${this.constructor._renderBoolean}
        ></vaadin-grid-column>
      </vaadin-grid>
      <!-- end::snippet[] -->
    `;
  }
}
