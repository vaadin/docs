import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/context-menu';
import type { ContextMenuOpenedChangedEvent } from '@vaadin/context-menu';
import '@vaadin/grid';
import type { Grid } from '@vaadin/grid';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('context-menu-left-click')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  // tag::snippet[]
  @state()
  private items = [{ text: 'View' }, { text: 'Edit' }, { text: 'Delete' }];
  // end::snippet[]

  @state()
  private gridItems: Person[] = [];

  private contextMenuOpened?: boolean;

  private onClick = (e: MouseEvent) => {
    // Prevent opening context menu on header row click.
    const target = e.currentTarget as Grid<Person>;
    if (!this.contextMenuOpened && target.getEventContext(e).section !== 'body') {
      e.stopPropagation();
    }
  };

  protected override async firstUpdated() {
    this.gridItems = (await getPeople({ count: 5 })).people;
  }

  protected override render() {
    return html`
      <!-- tag::snippethtml[] -->
      <vaadin-context-menu
        open-on="click"
        .items=${this.items}
        @opened-changed="${(event: ContextMenuOpenedChangedEvent) => {
          this.contextMenuOpened = event.detail.value;
        }}"
      >
        <vaadin-grid all-rows-visible .items=${this.gridItems} @click=${this.onClick}>
          <vaadin-grid-column path="firstName"></vaadin-grid-column>
          <vaadin-grid-column path="lastName"></vaadin-grid-column>
          <vaadin-grid-column path="email"></vaadin-grid-column>
          <vaadin-grid-column header="Phone number" path="address.phone"></vaadin-grid-column>
        </vaadin-grid>
      </vaadin-context-menu>
      <!-- end::snippethtml[] -->
    `;
  }
}
