import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement, internalProperty } from 'lit-element';
import { AvatarGroupI18n } from '@vaadin/vaadin-avatar/src/interfaces';
import '@vaadin/vaadin-avatar/vaadin-avatar-group';
import { applyTheme } from 'generated/theme';
import { getPeople } from '../../domain/DataService';
import Person from '../../../generated/com/vaadin/demo/domain/Person';

@customElement('avatar-group-internationalistion')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  @internalProperty()
  private items: Person[] = [];

  async firstUpdated() {
    this.items = await getPeople(2);

    // Add an anonymous user
    this.items.unshift({
      address: {
        city: '',
        country: '',
        phone: '',
        state: '',
        street: '',
        zip: ''
      },
      birthday: '',
      email: '',
      firstName: '',
      id: -1,
      lastName: '',
      membership: '',
      pictureUrl: '',
      profession: '',
      subscriber: false
    });
  }

  //tag::snippet[]
  private i18n: AvatarGroupI18n = {
    anonymous: 'Anonyymi',
    activeUsers: {
      one: 'Yksi käyttäjä aktiivisena',
      many: '{count} käyttäjää aktiivisena'
    }
  };

  render() {
    return html`
      <vaadin-avatar-group
        .i18n=${this.i18n}
        .items=${this.items.map(person => {
          return {
            name: `${person.firstName} ${person.lastName}`
          };
        })}
      >
      </vaadin-avatar-group>
    `;
  }
  //end::snippet[]
}
