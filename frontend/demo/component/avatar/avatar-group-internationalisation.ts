import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-avatar/vaadin-avatar-group';
import { applyTheme } from 'themes/theme-generated.js';
import { AvatarGroupItem, AvatarGroupI18n } from '@vaadin/vaadin-avatar/src/interfaces';

@customElement('avatar-group-internationalistion')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  private people: AvatarGroupItem[] = [{}, { name: 'Katherine Johnson' }, { name: 'Alan Turing' }];

  private i18n: AvatarGroupI18n = {
    anonymous: 'Anonyymi',
    activeUsers: {
      one: 'Yksi käyttäjä aktiivisena',
      many: '{count} käyttäjää aktiivisena'
    }
  };

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-avatar-group .items=${this.people} .i18n=${this.i18n}></vaadin-avatar-group>
      <!-- end::snippet[] -->
    `;
  }
}
