import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/avatar';
import '@vaadin/menu-bar';
import type { MenuBarItem } from '@vaadin/menu-bar';
import { applyTheme } from 'Frontend/generated/theme';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

@customElement('avatar-menu-bar')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  @state()
  private menuBarItems: MenuBarItem[] = [];

  @state()
  private person: Person | undefined;

  // tag::snippet[]
  protected override async firstUpdated() {
    const { people } = await getPeople({ count: 1 });
    this.person = people[0];

    const avatarElement = document.createElement('vaadin-avatar');
    avatarElement.name = `${this.person?.firstName} ${this.person?.lastName}`;
    avatarElement.img = this.person?.pictureUrl;

    this.menuBarItems = [
      {
        component: avatarElement,
        children: [
          {
            text: 'Profile',
          },
          {
            text: 'Settings',
          },
          {
            text: 'Help',
          },
          {
            text: 'Sign out',
          },
        ],
      },
    ];
  }

  protected override render() {
    return html`
      <vaadin-menu-bar .items="${this.menuBarItems}" theme="tertiary-inline"></vaadin-menu-bar>
    `;
  }
  // end::snippet[]
}
