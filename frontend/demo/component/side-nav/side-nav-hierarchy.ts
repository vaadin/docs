import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/side-nav';
import '@vaadin/icon';
import '@vaadin/icons';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('side-nav-hierarchy')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <div class="side-nav-sample">
        <div>
          <!-- tag::snippet[] -->
          <vaadin-side-nav style="width:100%">
            <vaadin-side-nav-item path="/messages">
              <vaadin-icon icon="vaadin:envelope" slot="prefix"></vaadin-icon>
              Messages
              <vaadin-side-nav-item path="/inbox" slot="children">
                <vaadin-icon icon="vaadin:inbox" slot="prefix"></vaadin-icon>
                Inbox
              </vaadin-side-nav-item>
              <vaadin-side-nav-item path="/sent" slot="children">
                <vaadin-icon icon="vaadin:paperplane" slot="prefix"></vaadin-icon>
                Sent
              </vaadin-side-nav-item>
              <vaadin-side-nav-item path="/trash" slot="children">
                <vaadin-icon icon="vaadin:trash" slot="prefix"></vaadin-icon>
                Trash
              </vaadin-side-nav-item>
            </vaadin-side-nav-item>
            <vaadin-side-nav-item>
              <vaadin-icon icon="vaadin:cog" slot="prefix"></vaadin-icon>
              Admin
              <vaadin-side-nav-item path="/users" slot="children">
                <vaadin-icon icon="vaadin:group" slot="prefix"></vaadin-icon>
                Users
              </vaadin-side-nav-item>
              <vaadin-side-nav-item path="/permissions" slot="children">
                <vaadin-icon icon="vaadin:key" slot="prefix"></vaadin-icon>
                Permissions
              </vaadin-side-nav-item>
            </vaadin-side-nav-item>
          </vaadin-side-nav>
          <!-- end::snippet[] -->
        </div>
      </div>
    `;
  }
}
