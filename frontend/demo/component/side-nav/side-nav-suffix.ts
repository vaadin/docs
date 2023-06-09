import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/side-nav';
import '@vaadin/icon';
import '@vaadin/icons';
import { applyTheme } from 'Frontend/generated/theme';
import { patchSideNavNavigation } from 'Frontend/demo/component/side-nav/side-nav-helper'; // hidden-source-line

@customElement('side-nav-suffix')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  /* prettier-ignore */ protected firstUpdated() { // hidden-source-line
    patchSideNavNavigation(this.shadowRoot!.querySelector('vaadin-side-nav')!); // hidden-source-line
  } // hidden-source-line

  protected override render() {
    return html`
      <div class="side-nav-sample">
        <div>
          <!-- tag::snippet[] -->
          <vaadin-side-nav style="width:100%">
            <vaadin-side-nav-item path="/inbox">
              <vaadin-icon icon="vaadin:envelope" slot="prefix"></vaadin-icon>
              Inbox
              <span theme="badge contrast pill" aria-label="12 unread messages" slot="suffix"
                >12</span
              >
            </vaadin-side-nav-item>
            <vaadin-side-nav-item path="/calendar">
              <vaadin-icon icon="vaadin:calendar" slot="prefix"></vaadin-icon>
              Calendar
              <vaadin-icon
                icon="vaadin:bell"
                theme="badge error pill"
                style="padding:var(--lumo-space-xs)"
                aria-label="Upcoming appointment"
                slot="suffix"
              ></vaadin-icon>
            </vaadin-side-nav-item>
          </vaadin-side-nav>
          <!-- end::snippet[] -->
        </div>
      </div>
    `;
  }
}
