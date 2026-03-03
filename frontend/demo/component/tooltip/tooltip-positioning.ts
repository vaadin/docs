import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/app-layout';
import '@vaadin/app-layout/vaadin-drawer-toggle.js';
import '@vaadin/icon';
import '@vaadin/icons';
import '@vaadin/side-nav';
import '@vaadin/tooltip';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { patchSideNavNavigation } from 'Frontend/demo/component/side-nav/side-nav-helper'; // hidden-source-line
import { applyTheme } from 'Frontend/demo/theme';

@customElement('tooltip-positioning')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  /* prettier-ignore */ protected firstUpdated() { // hidden-source-line
    patchSideNavNavigation(this.shadowRoot!.querySelector('vaadin-side-nav')!); // hidden-source-line
  } // hidden-source-line

  protected override render() {
    return html`
      <vaadin-app-layout theme="narrow-drawer">
        <vaadin-drawer-toggle slot="navbar"
          ><vaadin-tooltip slot="tooltip" text="Expand menu" position="end"></vaadin-tooltip
        ></vaadin-drawer-toggle>
        <vaadin-side-nav
          slot="drawer"
          style="margin: 0 var(--vaadin-gap-xs); --vaadin-icon-size: 1.5rem "
        >
          <!-- tag::snippet[] -->
          <vaadin-side-nav-item path="/dashboard">
            <vaadin-icon icon="vaadin:dashboard" slot="prefix"></vaadin-icon>
            <vaadin-tooltip slot="tooltip" text="Dashboard" position="end"></vaadin-tooltip>
          </vaadin-side-nav-item>
          <!-- end::snippet[] -->
          <vaadin-side-nav-item path="/orders">
            <vaadin-icon icon="vaadin:cart" slot="prefix"></vaadin-icon>
            <vaadin-tooltip slot="tooltip" text="Orders" position="end"></vaadin-tooltip>
          </vaadin-side-nav-item>
          <vaadin-side-nav-item path="/customers">
            <vaadin-icon icon="vaadin:user-heart" slot="prefix"></vaadin-icon>
            <vaadin-tooltip slot="tooltip" text="Customers" position="end"></vaadin-tooltip>
          </vaadin-side-nav-item>
        </vaadin-side-nav>
      </vaadin-app-layout>
    `;
  }
}
