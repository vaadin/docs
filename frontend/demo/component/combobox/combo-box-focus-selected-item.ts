import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/combo-box';
import { html, LitElement } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import type { ComboBox, ComboBoxOpenedChangedEvent } from '@vaadin/combo-box';
import { getCountries } from 'Frontend/demo/domain/DataService';
import { applyTheme } from 'Frontend/demo/theme';
import type Country from 'Frontend/generated/com/vaadin/demo/domain/Country';

@customElement('combo-box-focus-selected-item')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  @query('vaadin-combo-box')
  private comboBox!: ComboBox<Country>;

  @state()
  private items: Country[] = [];

  @state()
  private selectedItem?: Country;

  protected override firstUpdated() {
    getCountries().then((data) => {
      this.items = data;
      this.selectedItem = data.find((c) => c.name === 'United States');
    });
  }

  // tag::snippet[]
  private handleOpenedChanged(e: ComboBoxOpenedChangedEvent) {
    if (e.detail.value && this.comboBox.selectedItem) {
      const index = this.items.indexOf(this.comboBox.selectedItem);
      if (index >= 0) {
        this.comboBox.scrollToIndex(index);
      }
    }
  }
  // end::snippet[]

  protected override render() {
    return html`
      <vaadin-combo-box
        label="Country"
        item-label-path="name"
        item-value-path="id"
        .items="${this.items}"
        .selectedItem="${this.selectedItem}"
        @opened-changed="${this.handleOpenedChanged}"
      ></vaadin-combo-box>
    `;
  }
}
