import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/badge';
import '@vaadin/icon';
import '@vaadin/icons';
import '@vaadin/side-nav';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { patchSideNavNavigation } from 'Frontend/demo/component/side-nav/side-nav-helper'; // hidden-source-line
import { applyTheme } from 'Frontend/demo/theme';

@customElement('side-nav-suffix')
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
      <div class="side-nav-sample">
        <div>
          <!-- tag::snippet[] -->
          <vaadin-side-nav style="width:100%">
            <vaadin-side-nav-item path="/inbox">
              <vaadin-icon icon="vaadin:envelope" slot="prefix"></vaadin-icon>
              Inbox
              <vaadin-badge number="12" theme="filled number-only" slot="suffix">
                unread messages
              </vaadin-badge>
            </vaadin-side-nav-item>
            <vaadin-side-nav-item path="/calendar">
              <vaadin-icon icon="vaadin:calendar" slot="prefix"></vaadin-icon>
              Calendar
              <vaadin-badge theme="error icon-only" slot="suffix">
                <vaadin-icon icon="vaadin:bell" slot="icon"></vaadin-icon>
                Upcoming appointment
              </vaadin-badge>
            </vaadin-side-nav-item>
          </vaadin-side-nav>
          <!-- end::snippet[] -->
        </div>
      </div>
    `;
  }
}
