import 'Frontend/demo/init'; // hidden-full-source-line

import { html, LitElement, customElement, internalProperty } from 'lit-element';
import '@vaadin/vaadin-avatar/vaadin-avatar';
import '@vaadin/vaadin-menu-bar/vaadin-menu-bar';
import { applyTheme } from 'Frontend/generated/theme';
import { getPeople } from 'Frontend/demo/domain/DataService';
import { MenuBarItem } from '@vaadin/vaadin-menu-bar/vaadin-menu-bar';
import { AvatarElement } from '@vaadin/vaadin-avatar/vaadin-avatar';

@customElement('avatar-menu-bar')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  @internalProperty()
  private menuBarItems: MenuBarItem[] = [];

  async firstUpdated() {
    const { people } = await getPeople({ count: 1 });
    const [person] = people;

    const avatarElement: AvatarElement = document.createElement('vaadin-avatar');
    avatarElement.img = person.pictureUrl;

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
      <vaadin-menu-bar .items=${this.menuBarItems} theme="tertiary-inline"></vaadin-menu-bar>
      <!-- end::snippet[] -->
    `;
  }
}
