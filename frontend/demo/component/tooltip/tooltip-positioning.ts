import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/app-layout';
import '@vaadin/app-layout/vaadin-drawer-toggle.js';
import '@vaadin/icon';
import '@vaadin/icons';
import '@vaadin/tabs';
import '@vaadin/tooltip';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('tooltip-positioning')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <vaadin-app-layout theme="narrow-drawer">
        <vaadin-drawer-toggle slot="navbar">
          <vaadin-tooltip slot="tooltip" text="Expand menu" position="end"></vaadin-tooltip>
        </vaadin-drawer-toggle>
        <vaadin-tabs slot="drawer" orientation="vertical">
          <!-- tag::snippet[] -->
          <vaadin-tab>
            <a tabindex="-1">
              <vaadin-icon icon="vaadin:home"></vaadin-icon>
            </a>
            <vaadin-tooltip slot="tooltip" text="Home" position="end"></vaadin-tooltip>
          </vaadin-tab>
          <!-- end::snippet[] -->
          <vaadin-tab>
            <a tabindex="-1">
              <vaadin-icon icon="vaadin:calendar"></vaadin-icon>
            </a>
            <vaadin-tooltip slot="tooltip" text="Calendar" position="end"></vaadin-tooltip>
          </vaadin-tab>
          <vaadin-tab>
            <a tabindex="-1">
              <vaadin-icon icon="vaadin:chart"></vaadin-icon>
            </a>
            <vaadin-tooltip slot="tooltip" text="Reports" position="end"></vaadin-tooltip>
          </vaadin-tab>
        </vaadin-tabs>
      </vaadin-app-layout>
    `;
  }
}
