import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/avatar';
import '@vaadin/button';
import '@vaadin/horizontal-layout';
import '@vaadin/popover';
import '@vaadin/vertical-layout';
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { popoverRenderer } from '@vaadin/popover/lit.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('popover-user-menu')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  @state()
  private person: Person | undefined;

  protected override async firstUpdated() {
    const { people } = await getPeople({ count: 1 });
    this.person = people[0];
  }

  protected override render() {
    return html`
      <vaadin-horizontal-layout style="background: var(--lumo-contrast-5pct);">
        <vaadin-button
          id="avatar"
          theme="icon tertiary-inline"
          style="margin: var(--lumo-space-s); margin-inline-start: auto; border-radius: 50%;"
        >
          <vaadin-avatar
            tabindex="-1"
            style="display: block; cursor:pointer;"
            .img="${this.person?.pictureUrl}"
            .name="${`${this.person?.firstName} ${this.person?.lastName}`}"
          ></vaadin-avatar>
        </vaadin-button>
      </vaadin-horizontal-layout>
      <!-- tag::snippet[] -->
      <vaadin-popover
        for="avatar"
        position="bottom-end"
        modal
        overlay-role="menu"
        accessible-name="User menu"
        theme="no-padding"
        ${popoverRenderer(this.userMenuRenderer, [this.person])}
      ></vaadin-popover>
      <!-- end::snippet[] -->
    `;
  }

  // NOTE
  // We are using inline styles here to keep the example simple.
  // We recommend placing CSS in a separate style sheet and
  // encapsulating the styling in a new component.
  userMenuRenderer() {
    const { firstName, lastName, pictureUrl } = this.person ?? {};
    const nickName = `@${firstName}${lastName}`.toLowerCase();

    return html`
      <vaadin-horizontal-layout class="userMenuHeader">
        <vaadin-avatar
          tabindex="-1"
          .img="${pictureUrl}"
          .name="${`${firstName} ${lastName}`}"
          theme="large"
        ></vaadin-avatar>
        <vaadin-vertical-layout>
          <div style="font-weight: bold;">${firstName} ${lastName}</div>
          <div class="userMenuNickname">${nickName}</div>
        </vaadin-vertical-layout>
      </vaadin-horizontal-layout>
      <vaadin-vertical-layout class="userMenuLinks">
        <a href="#" role="menuitem">User profile</a>
        <a href="#" role="menuitem">Preferences</a>
        <a href="#" role="menuitem">Sign out</a>
      </vaadin-vertical-layout>
    `;
  }
}
