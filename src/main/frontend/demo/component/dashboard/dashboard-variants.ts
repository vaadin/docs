import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/dashboard/vaadin-dashboard.js'; // hidden-source-line
import '@vaadin/dashboard/vaadin-dashboard-layout.js';
import '@vaadin/dashboard/vaadin-dashboard-widget.js';
import '@vaadin/select';
import '@vaadin/checkbox';
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/generated/theme';
import { SelectChangeEvent } from '@vaadin/select';
import { CheckboxChangeEvent } from '@vaadin/checkbox';

@customElement('dashboard-variants')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  @state()
  items = [
    { label: 'Outlined (default)', value: ' ' },
    { label: 'Flat', value: 'flat-widgets' },
    { label: 'Elevated', value: 'elevated-widgets' },
  ];

  @state()
  widgetVariant: string = ' ';

  @state()
  shadedBoard: string = '';

  onWidgetVariantChange(event: SelectChangeEvent) {
    this.widgetVariant = event.target.value;
  }

  onShadedBgChange(event: CheckboxChangeEvent) {
    this.shadedBoard = event.target.checked ? 'shaded-background' : '';
  }

  render() {
    return html`
      <div style="display:flex; align-items:baseline; gap:1rem; padding-inline:var(--lumo-space-m);">
        <vaadin-select
            label="Widget variant"
            .items="${this.items}"
            value=" "
            @change="${this.onWidgetVariantChange}"
        ></vaadin-select>
        <vaadin-checkbox
            label="Shaded board background"
            @change="${this.onShadedBgChange}"
        ></vaadin-checkbox>
      </div>
      <vaadin-dashboard-layout theme="${this.widgetVariant} ${this.shadedBoard}"
        style=" width:100%; --vaadin-dashboard-row-min-height:200px; --vaadin-dashboard-col-min-width: 100px; --vaadin-dashboard-col-max-count: 3;"
      >
        <vaadin-dashboard-widget widget-title="Visitors">
        </vaadin-dashboard-widget>
        <vaadin-dashboard-widget widget-title="Downloads">
        </vaadin-dashboard-widget>
        <vaadin-dashboard-widget widget-title="Conversions">
        </vaadin-dashboard-widget>
      </vaadin-dashboard-layout>
    `;
  }
}
