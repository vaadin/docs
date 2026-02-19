import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/dashboard/vaadin-dashboard-widget.js';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('dashboard-widget-contents')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-dashboard-widget widget-title="Widget title">
        <span>Widget content</span>
        <span slot="header-content">Additional header content</span>
      </vaadin-dashboard-widget>
      <!-- end::snippet[] -->
    `;
  }
}
