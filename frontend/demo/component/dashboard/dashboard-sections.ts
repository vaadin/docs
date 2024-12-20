import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/dashboard/vaadin-dashboard.js'; // hidden-source-line
import '@vaadin/dashboard/vaadin-dashboard-layout.js';
import '@vaadin/dashboard/vaadin-dashboard-section.js';
import '@vaadin/dashboard/vaadin-dashboard-widget.js';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('dashboard-sections')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-dashboard-layout
        style="--vaadin-dashboard-col-min-width: 150px; --vaadin-dashboard-col-max-count: 3"
      >
        <vaadin-dashboard-section section-title="Monthly Funnel Stats">
          <vaadin-dashboard-widget widget-title="Visitors">
            <div class="dashboard-widget-content"></div>
          </vaadin-dashboard-widget>
          <vaadin-dashboard-widget widget-title="Downloads">
            <div class="dashboard-widget-content"></div>
          </vaadin-dashboard-widget>
          <vaadin-dashboard-widget widget-title="Conversions">
            <div class="dashboard-widget-content"></div>
          </vaadin-dashboard-widget>
        </vaadin-dashboard-section>
        <!-- end::snippet[] -->

        <vaadin-dashboard-section section-title="Visitor Details">
          <vaadin-dashboard-widget
            widget-title="Visitors by country"
            style="--vaadin-dashboard-item-rowspan: 2;"
          >
            <div class="dashboard-widget-content"></div>
          </vaadin-dashboard-widget>
          <vaadin-dashboard-widget widget-title="Browsers">
            <div class="dashboard-widget-content"></div>
          </vaadin-dashboard-widget>
          <vaadin-dashboard-widget widget-title="A kittykat!">
            <div class="dashboard-widget-content"></div>
          </vaadin-dashboard-widget>
          <vaadin-dashboard-widget
            widget-title="Visitors by browser"
            style="--vaadin-dashboard-item-colspan: 2;"
          >
            <div class="dashboard-widget-content"></div>
          </vaadin-dashboard-widget>
        </vaadin-dashboard-section>
        <!-- tag::snippet[] -->
      </vaadin-dashboard-layout>
      <!-- end::snippet[] -->
    `;
  }
}
