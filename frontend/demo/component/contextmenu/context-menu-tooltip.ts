import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/context-menu';
import '@vaadin/grid';
import '@vaadin/tooltip';
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import type { Grid } from '@vaadin/grid';
import { getPeople } from 'Frontend/demo/domain/DataService';
import { applyTheme } from 'Frontend/demo/theme';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

@customElement('context-menu-tooltip')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  // tag::snippet[]
  @state()
  private items = [
    { text: 'Edit', tooltip: 'Edit selected person' },
    {
      text: 'Share',
      children: [
        { text: 'Copy link', tooltip: 'Copy a shareable link to the clipboard' },
        {
          text: 'Email',
          tooltip: 'Send the contact details by email',
          tooltipPosition: 'end',
        },
      ],
    },
  ];
  // end::snippet[]

  @state()
  private gridItems: Person[] = [];

  protected override async firstUpdated() {
    this.gridItems = (await getPeople({ count: 5 })).people;
  }

  protected override render() {
    return html`
      <!-- tag::snippethtml[] -->
      <vaadin-context-menu .items=${this.items}>
        <vaadin-tooltip slot="tooltip"></vaadin-tooltip>
        <vaadin-grid
          all-rows-visible
          .items=${this.gridItems}
          @vaadin-contextmenu=${this.onContextMenu}
        >
          <vaadin-grid-column path="firstName"></vaadin-grid-column>
          <vaadin-grid-column path="lastName"></vaadin-grid-column>
          <vaadin-grid-column path="email"></vaadin-grid-column>
        </vaadin-grid>
      </vaadin-context-menu>
      <!-- end::snippethtml[] -->
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
