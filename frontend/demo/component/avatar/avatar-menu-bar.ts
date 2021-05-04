import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/flow-frontend/contextMenuConnector'; // hidden-source-line
import '@vaadin/flow-frontend/menubarConnector'; // hidden-source-line

import { html, LitElement, customElement, internalProperty } from 'lit-element';
import '@vaadin/vaadin-avatar/vaadin-avatar';
import '@vaadin/vaadin-menu-bar/vaadin-menu-bar';
import { applyTheme } from 'Frontend/generated/theme';
import { getPeople } from 'Frontend/demo/domain/DataService';
import Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { AvatarElement } from '@vaadin/vaadin-avatar/vaadin-avatar';
import { MenuBarItem } from '@vaadin/vaadin-menu-bar/vaadin-menu-bar';

@customElement('avatar-menu-bar')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  @internalProperty()
  private menuBarItems: MenuBarItem[] = [];

  @internalProperty()
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
