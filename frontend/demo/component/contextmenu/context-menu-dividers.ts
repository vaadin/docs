import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/context-menu';
import '@vaadin/grid';
import type { Grid } from '@vaadin/grid';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('context-menu-dividers')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  @state()
  private gridItems: Person[] = [];

  protected override async firstUpdated() {
    this.gridItems = (await getPeople({ count: 5 })).people;
  }

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-context-menu
        .items=${[
          { text: 'View' },
          { component: 'hr' },
          { text: 'Edit' },
          { text: 'Delete' },
          { component: 'hr' },
          { text: 'Email' },
          { text: 'Call' },
        ]}
      >
        <vaadin-grid
          all-rows-visible
          .items=${this.gridItems}
          @vaadin-contextmenu=${this.onContextMenu}
        >
          <vaadin-grid-column path="firstName"></vaadin-grid-column>
          <vaadin-grid-column path="lastName"></vaadin-grid-column>
          <vaadin-grid-column path="email"></vaadin-grid-column>
          <vaadin-grid-column header="Phone number" path="address.phone"></vaadin-grid-column>
        </vaadin-grid>
      </vaadin-context-menu>
      <!-- end::snippet[] -->
    `;
  }

  onContextMenu(e: MouseEvent) {
    // Prevent opening context menu on header row.
    const target = e.currentTarget as Grid<Person>;
    if (target.getEventContext(e).section !== 'body') {
      e.stopPropagation();
    }
  }
}
