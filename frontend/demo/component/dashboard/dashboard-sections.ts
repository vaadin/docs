import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/dashboard/vaadin-dashboard.js'; // hidden-source-line
import '@vaadin/dashboard/vaadin-dashboard-layout.js';
import '@vaadin/dashboard/vaadin-dashboard-section.js';
import '@vaadin/dashboard/vaadin-dashboard-widget.js';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';
import {
  renderBrowsersWidget,
  renderConversionsWidget,
  renderDownloadsWidget,
  renderTrafficSourcesWidget,
  renderVisitorsByCountryWidget,
  renderVisitorsPerMonthWidget,
  renderVisitorsWidget,
} from './mock-widgets';

@customElement('dashboard-sections')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
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
            ${renderVisitorsWidget()}
          </vaadin-dashboard-widget>
          <vaadin-dashboard-widget widget-title="Downloads">
            ${renderDownloadsWidget()}
          </vaadin-dashboard-widget>
          <vaadin-dashboard-widget widget-title="Conversions">
            ${renderConversionsWidget()}
          </vaadin-dashboard-widget>
        </vaadin-dashboard-section>
        <!-- end::snippet[] -->

        <vaadin-dashboard-section section-title="Visitor Details">
          <vaadin-dashboard-widget
            widget-title="Visitors by country"
            style="--vaadin-dashboard-widget-rowspan: 2;"
          >
            ${renderVisitorsByCountryWidget()}
          </vaadin-dashboard-widget>
          <vaadin-dashboard-widget widget-title="Browsers">
            ${renderBrowsersWidget()}
          </vaadin-dashboard-widget>
          <vaadin-dashboard-widget widget-title="Traffic sources">
            ${renderTrafficSourcesWidget()}
          </vaadin-dashboard-widget>
          <vaadin-dashboard-widget
            widget-title="Visitors per month"
            style="--vaadin-dashboard-widget-colspan: 2;"
          >
            ${renderVisitorsPerMonthWidget()}
          </vaadin-dashboard-widget>
        </vaadin-dashboard-section>
        <!-- tag::snippet[] -->
      </vaadin-dashboard-layout>
      <!-- end::snippet[] -->
    `;
  }
}
