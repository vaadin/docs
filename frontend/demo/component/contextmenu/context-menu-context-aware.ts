import 'Frontend/demo/init'; // hidden-full-source-line
import '@vaadin/flow-frontend/contextMenuConnector.js'; // hidden-full-source-line
import '@vaadin/flow-frontend/gridConnector.js'; // hidden-full-source-line
import './hint-badge'; // hidden-full-source-line

import { html, LitElement, customElement, internalProperty } from 'lit-element';
import { render } from 'lit-html';
import '@vaadin/vaadin-context-menu/vaadin-context-menu';
import '@vaadin/vaadin-grid/vaadin-grid';
import { getPeople } from 'Frontend/demo/domain/DataService';
import Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'Frontend/generated/theme';
import { GridElement, GridEventContext } from '@vaadin/vaadin-grid/vaadin-grid';
import {
  ContextMenuElement,
  ContextMenuRendererContext
} from '@vaadin/vaadin-context-menu/vaadin-context-menu';

@customElement('context-menu-context-aware')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  @internalProperty()
  private gridItems: Person[] = [];

  async firstUpdated() {
    this.gridItems = (await getPeople()).people;
  }

  render() {
    return html`
      <hint-badge></hint-badge>
      <!-- tag::snippethtml[] -->
      <vaadin-context-menu .renderer=${this.contextRenderer}>
        <vaadin-grid .items=${this.gridItems}>
          <vaadin-grid-column label="First name" path="firstName"></vaadin-grid-column>
          <vaadin-grid-column label="Last name" path="lastName"></vaadin-grid-column>
          <vaadin-grid-column label="Email" path="email"></vaadin-grid-column>
          <vaadin-grid-column label="Phone number" path="address.phone"></vaadin-grid-column>
        </vaadin-grid>
      </vaadin-context-menu>
      <!-- end::snippethtml[] -->
    `;
  }

  // tag::snippet[]
  contextRenderer(
    root: HTMLElement,
    contextMenu: ContextMenuElement,
    context: ContextMenuRendererContext
  ) {
    let listBox = root.firstElementChild;
    if (!listBox) {
      render(
        html`
          <vaadin-list-box></vaadin-list-box>
        `,
        root
      );
      listBox = root.firstElementChild;
    }

    let result;
    if (
      ((contextMenu.querySelector('vaadin-grid') as GridElement).getEventContext(
        (context.detail as any).sourceEvent
      ) as GridEventContext).section === 'body'
    ) {
      result = html`
        ${['View', 'Edit', 'Delete'].map(
          action =>
            html`
              <vaadin-item>${action}</vaadin-item>
            `
        )}
      `;
    } else {
      result = html`
        <vaadin-item disabled>Please open Context Menu on Grid's body row</vaadin-item>
      `;
    }
    render(result, listBox as Element);
  }
  // end::snippet[]
}
