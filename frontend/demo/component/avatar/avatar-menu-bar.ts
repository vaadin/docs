import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/vaadin-avatar/vaadin-avatar';
import '@vaadin/vaadin-menu-bar/vaadin-menu-bar';
import { applyTheme } from 'Frontend/generated/theme';
import { getPeople } from 'Frontend/demo/domain/DataService';
import Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { AvatarElement } from '@vaadin/vaadin-avatar/vaadin-avatar';
import { MenuBarItem } from '@vaadin/vaadin-menu-bar/vaadin-menu-bar';

@customElement('avatar-menu-bar')
export class Example extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  @state()
  private menuBarItems: MenuBarItem[] = [];

  @state()
  private person?: Person;

  async firstUpdated() {
    const { people } = await getPeople({ count: 1 });
    this.person = people[0];

    const avatarElement: AvatarElement = document.createElement('vaadin-avatar');
    avatarElement.name = this.person?.firstName + ' ' + this.person?.lastName;
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

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-menu-bar .items="${this.menuBarItems}" theme="tertiary-inline"> </vaadin-menu-bar>
      <!-- end::snippet[] -->
    `;
  }
}
