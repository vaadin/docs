import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement, customElement, internalProperty } from 'lit-element';
import '@vaadin/vaadin-avatar/vaadin-avatar-group';
import { applyTheme } from 'Frontend/generated/theme';
import { AvatarGroupI18n } from '@vaadin/vaadin-avatar/src/interfaces';
import { getPeople } from 'Frontend/demo/domain/DataService';
import Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

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
    const { people } = await getPeople({ count: 2 });

    // Add an anonymous user
    people.unshift({
      address: {
        city: '',
        country: '',
        phone: '',
        state: '',
        street: '',
        zip: '',
      },
      birthday: '',
      email: '',
      firstName: '',
      id: -1,
      lastName: '',
      membership: '',
      pictureUrl: '',
      profession: '',
      subscriber: false,
      manager: false,
      managerId: -1,
      status: '',
    });

    this.items = people;
  }

  //tag::snippet[]
  private i18n: AvatarGroupI18n = {
    anonymous: 'Anonyymi',
    activeUsers: {
      one: 'Yksi käyttäjä aktiivisena',
      many: '{count} käyttäjää aktiivisena',
    },
    joined: 'liittyi',
    left: 'lähti',
  };

  render() {
    return html`
      <vaadin-avatar-group
        .i18n="${this.i18n}"
        .items="${this.items.map((person) => {
          return {
            name: `${person.firstName} ${person.lastName}`,
          };
        })}"
      >
      </vaadin-avatar-group>
    `;
  }
  //end::snippet[]
}
