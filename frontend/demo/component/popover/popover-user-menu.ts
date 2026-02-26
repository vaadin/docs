import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/avatar';
import '@vaadin/button';
import '@vaadin/horizontal-layout';
import '@vaadin/popover';
import '@vaadin/vertical-layout';
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import { applyTheme } from 'Frontend/demo/theme';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

@customElement('popover-user-menu')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  @state()
  private person: Person | undefined;

  protected override async firstUpdated() {
    const { people } = await getPeople({ count: 1 });
    // eslint-disable-next-line
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
        role="menu"
        aria-label="User menu"
        theme="no-padding"
      >
        ${this.renderUserMenu(this.person)}
      </vaadin-popover>
      <!-- end::snippet[] -->
    `;
  }

  // NOTE
  // We are using inline styles here to keep the example simple.
  // We recommend placing CSS in a separate style sheet and
  // encapsulating the styling in a new component.
  renderUserMenu(person?: Person) {
    const { firstName, lastName, pictureUrl } = person ?? {};
    const nickName = `@${firstName}${lastName}`.toLowerCase();

    return html`
      <div class="person-item" style="padding: var(--vaadin-padding-s);">
        <vaadin-avatar .img="${pictureUrl}" .name="${`${firstName} ${lastName}`}"></vaadin-avatar>
        <span>${firstName} ${lastName}</span>
        <span>${nickName}</span>
      </div>
      <vaadin-vertical-layout class="userMenuLinks" style="align-items:stretch; width:100%;">
        <a href="#" role="menuitem">User profile</a>
        <a href="#" role="menuitem">Preferences</a>
        <a href="#" role="menuitem">Sign out</a>
      </vaadin-vertical-layout>
    `;
  }
}
