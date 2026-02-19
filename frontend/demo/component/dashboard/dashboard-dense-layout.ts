import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/dashboard/vaadin-dashboard.js'; // hidden-source-line
import '@vaadin/checkbox';
import '@vaadin/dashboard/vaadin-dashboard-layout.js';
import '@vaadin/dashboard/vaadin-dashboard-widget.js';
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('dashboard-dense-layout')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  @state()
  private denseLayout = false;

  protected override render() {
    return html`
      <vaadin-checkbox
        label="Use dense layout"
        @change="${() => {
          this.denseLayout = !this.denseLayout;
        }}"
      ></vaadin-checkbox>
      <vaadin-dashboard-layout
        .denseLayout="${this.denseLayout}"
        style="--vaadin-dashboard-col-min-width: 0; --vaadin-dashboard-col-max-count: 3; --vaadin-dashboard-row-min-height: 50px;"
      >
        <vaadin-dashboard-widget
          widget-title="Wide widget 1"
          style="--vaadin-dashboard-widget-colspan: 2"
        >
          <div class="dashboard-widget-content small"></div>
        </vaadin-dashboard-widget>
        <vaadin-dashboard-widget
          widget-title="Wide widget 2"
          style="--vaadin-dashboard-widget-colspan: 2"
        >
          <div class="dashboard-widget-content small"></div>
        </vaadin-dashboard-widget>
        <vaadin-dashboard-widget widget-title="Small widget 1">
          <div class="dashboard-widget-content small"></div>
        </vaadin-dashboard-widget>
        <vaadin-dashboard-widget widget-title="Small widget 2">
          <div class="dashboard-widget-content small"></div>
        </vaadin-dashboard-widget>
      </vaadin-dashboard-layout>
    `;
  }
}
