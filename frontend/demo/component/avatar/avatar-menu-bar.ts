import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement, internalProperty } from 'lit-element';
import '@vaadin/vaadin-avatar/vaadin-avatar';
import { AvatarElement } from '@vaadin/vaadin-avatar/vaadin-avatar';
import '@vaadin/vaadin-menu-bar/vaadin-menu-bar';
import { MenuBarItem } from '@vaadin/vaadin-menu-bar/vaadin-menu-bar';
import { applyTheme } from 'generated/theme';
import { getPeople } from '../../domain/DataService';

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
    const [person] = await getPeople(1);

    const avatarElement: AvatarElement = document.createElement('vaadin-avatar');
    avatarElement.name = person.firstName + ' ' + person.lastName;
    avatarElement.img = person.pictureUrl;

    this.menuBarItems = [
      {
        component: avatarElement,
        children: [
          {
            text: 'Profile'
          },
          {
            text: 'Settings'
          },
          {
            text: 'Help'
          },
          {
            text: 'Sign out'
          }
        ]
      }
    ];
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-menu-bar .items=${this.menuBarItems} theme="tertiary-inline"> </vaadin-menu-bar>
      <!-- end::snippet[] -->
    `;
  }
}
