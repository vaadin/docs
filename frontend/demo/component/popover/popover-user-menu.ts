import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/avatar';
import '@vaadin/horizontal-layout';
import '@vaadin/popover';
import '@vaadin/vertical-layout';
import { popoverRenderer } from '@vaadin/popover/lit.js';
import { applyTheme } from 'Frontend/generated/theme';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

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
        <vaadin-avatar
          id="avatar"
          .img="${this.person?.pictureUrl}"
          .name="${`${this.person?.firstName} ${this.person?.lastName}`}"
          style="margin: var(--lumo-space-s); margin-inline-start: auto"
        ></vaadin-avatar>
      </vaadin-horizontal-layout>
      <!-- tag::snippet[] -->
      <vaadin-popover
        for="avatar"
        position="bottom-end"
        modal
        overlay-role="menu"
        accessible-name="User menu"
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
      <vaadin-horizontal-layout
        theme="spacing"
        style="background: var(--lumo-contrast-5pct); padding: var(--lumo-space-s); margin: calc(var(--lumo-space-s) * -1)"
      >
        <vaadin-avatar
          .img="${pictureUrl}"
          .name="${`${firstName} ${lastName}`}"
          style="align-self: center"
        ></vaadin-avatar>
        <vaadin-vertical-layout style="margin-top: var(--lumo-space-s)">
          <div style="font-weight: bold; line-height: 1">${firstName} ${lastName}</div>
          <div>${nickName}</div>
        </vaadin-vertical-layout>
      </vaadin-horizontal-layout>
      <vaadin-vertical-layout style="margin-top: var(--lumo-space-s); align-items: stretch">
        <a href="#" role="menuitem" style="padding: var(--lumo-space-xs); text-decoration: none;">
          User profile
        </a>
        <a href="#" role="menuitem" style="padding: var(--lumo-space-xs); text-decoration: none;">
          Preferences
        </a>
        <a href="#" role="menuitem" style="padding: var(--lumo-space-xs); text-decoration: none;">
          Sign out
        </a>
      </vaadin-vertical-layout>
    `;
  }
}
