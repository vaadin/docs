import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/button';
import '@vaadin/checkbox-group';
import '@vaadin/grid';
import '@vaadin/horizontal-layout';
import '@vaadin/icon';
import '@vaadin/icons';
import '@vaadin/popover';
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import type { CheckboxChangeEvent } from '@vaadin/checkbox';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'Frontend/generated/theme';

type ColumnConfig = { label: string; key: string; visible: boolean };

const DEFAULT_COLUMNS = [
  { label: 'First name', key: 'firstName', visible: true },
  { label: 'Last name', key: 'lastName', visible: true },
  { label: 'Email', key: 'email', visible: true },
  { label: 'Phone', key: 'address.phone', visible: false },
  { label: 'Birthday', key: 'birthday', visible: false },
  { label: 'Profession', key: 'profession', visible: true },
];

@customElement('popover-anchored-dialog')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  @state()
  private items: Person[] = [];

  @state()
  private gridColumns: ColumnConfig[] = [...DEFAULT_COLUMNS];

  protected override async firstUpdated() {
    const { people } = await getPeople();
    this.items = people;
  }

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-horizontal-layout style="align-items: baseline">
        <h3 style="flex: 1;">Employees</h3>
        <vaadin-button id="toggle-columns" theme="icon" aria-label="Show / hide columns">
          <vaadin-icon icon="vaadin:grid-h"></vaadin-icon>
        </vaadin-button>
      </vaadin-horizontal-layout>

      <vaadin-popover for="toggle-columns" modal with-backdrop position="bottom-end">
        ${this.renderPopover(this.gridColumns)}
      </vaadin-popover>
      <!-- end::snippet[] -->

      <!-- tag::gridsnippet[] -->
      <vaadin-grid .items="${this.items}">
        ${this.gridColumns.map(
          (column) => html`
            <vaadin-grid-column
              path="${column.key}"
              .hidden="${!column.visible}"
            ></vaadin-grid-column>
          `
        )}
      </vaadin-grid>
      <!-- end::gridsnippet[] -->
    `;
  }

  // tag::snippet[]
  renderPopover(columns: ColumnConfig[]) {
    const visibleColumns = columns.filter((column) => column.visible).map((column) => column.key);

    return html`
      <div style="font-weight: 600; padding: var(--lumo-space-xs);">Configure columns</div>
      <vaadin-checkbox-group theme="vertical" .value="${visibleColumns}">
        ${columns.map(
          (column) => html`
            <vaadin-checkbox
              .label="${column.label}"
              .value="${column.key}"
              @change="${this.onCheckboxChange}"
            ></vaadin-checkbox>
          `
        )}
      </vaadin-checkbox-group>
      <vaadin-horizontal-layout style="justify-content: space-between;">
        <vaadin-button theme="small" @click="${this.showAllColumns}">Show all</vaadin-button>
        <vaadin-button theme="small" @click="${this.resetColumns}">Reset</vaadin-button>
      </vaadin-horizontal-layout>
    `;
  }
  // end::snippet[]

  onCheckboxChange(event: CheckboxChangeEvent) {
    const idx = this.gridColumns.findIndex(({ key }) => key === event.target.value);
    this.gridColumns = this.gridColumns.map((column, index) => ({
      ...column,
      visible: idx === index ? event.target.checked : column.visible,
    }));
  }

  showAllColumns() {
    this.gridColumns = this.gridColumns.map((column) => ({ ...column, visible: true }));
  }

  resetColumns() {
    this.gridColumns = this.gridColumns.map((column, idx) => ({
      ...column,
      visible: DEFAULT_COLUMNS[idx].visible,
    }));
  }
}
