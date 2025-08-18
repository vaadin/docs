import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/date-picker';
import '@vaadin/horizontal-layout';
import '@vaadin/icon';
import '@vaadin/popover';
import '@vaadin/select';
import '@vaadin/text-field';
import '@vaadin/vaadin-lumo-styles/vaadin-iconset.js';
import { formatISO, subMonths, subWeeks, subYears } from 'date-fns';
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import type { DatePickerChangeEvent } from '@vaadin/date-picker';
import { popoverRenderer } from '@vaadin/popover/lit.js';
import type { SelectChangeEvent } from '@vaadin/select';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('popover-dropdown-field')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  @state()
  range = '';

  @state()
  from = '';

  @state()
  to = '';

  @state()
  opened = false;

  @state()
  presets = [
    { label: 'Today', value: 'today' },
    { label: 'Last week', value: 'last-week' },
    { label: 'Last month', value: 'last-month' },
    { label: 'Year to date', value: 'year-to-date' },
    { label: 'Last year', value: 'last-year' },
    { label: 'Past 5 years', value: 'past-5-years' },
  ];

  protected override render() {
    return html`
      <vaadin-text-field
        id="range-field"
        label="Search date range"
        style="width: 340px"
        .value="${this.from && this.to ? `${this.from} − ${this.to}` : ''}"
        @keydown="${this.onKeyDown}"
      >
        <vaadin-icon icon="lumo:dropdown" slot="suffix"></vaadin-icon>
      </vaadin-text-field>
      <!-- tag::snippet[] -->
      <vaadin-popover
        for="range-field"
        modal
        width="340px"
        position="bottom-start"
        accessible-name="Select a date range"
        .opened="${this.opened}"
        @closed="${this.onClosed}"
        ${popoverRenderer(this.popoverRenderer, [this.from, this.to])}
      ></vaadin-popover>
      <!-- end::snippet[] -->
    `;
  }

  // tag::snippet[]
  popoverRenderer() {
    return html`
      <vaadin-select
        label="Common ranges"
        .items="${this.presets}"
        placeholder="Select preset"
        style="width: 100%"
        .value="${this.range}"
        @change="${this.onRangeChange}"
      ></vaadin-select>
      <vaadin-horizontal-layout theme="spacing-s" style="align-items: baseline">
        <vaadin-date-picker
          label="From"
          style="width: 150px"
          .value="${this.from}"
          @change="${this.onFromChange}"
        ></vaadin-date-picker>
        <div>−</div>
        <vaadin-date-picker
          label="To"
          style="width: 150px"
          .value="${this.to}"
          @change="${this.onToChange}"
        ></vaadin-date-picker>
      </vaadin-horizontal-layout>
    `;
  }
  // end::snippet[]

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'ArrowDown') {
      this.opened = true;
    }
  }

  onFromChange(event: DatePickerChangeEvent) {
    this.range = '';
    this.from = event.target.value;
  }

  onToChange(event: DatePickerChangeEvent) {
    this.range = '';
    this.to = event.target.value;
  }

  onClosed() {
    this.opened = false;
  }

  onRangeChange(event: SelectChangeEvent) {
    this.range = event.target.value;
    this.to = this.formatDate(new Date());

    switch (event.target.value) {
      case 'today':
        this.from = this.formatDate(new Date());
        break;
      case 'last-week':
        this.from = this.formatDate(subWeeks(new Date(), 1));
        break;
      case 'last-month':
        this.from = this.formatDate(subMonths(new Date(), 1));
        break;
      case 'year-to-date':
        this.from = this.formatDate(new Date(new Date().getFullYear(), 0, 1));
        break;
      case 'last-year':
        this.from = this.formatDate(subYears(new Date(), 1));
        break;
      case 'past-5-years':
        this.from = this.formatDate(subYears(new Date(), 5));
        break;
      default:
      // Do nothing
    }

    this.opened = false;
  }

  formatDate(date: Date) {
    return formatISO(date, { representation: 'date' });
  }
}
