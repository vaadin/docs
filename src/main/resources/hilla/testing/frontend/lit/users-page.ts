import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { View } from '../../views/view.js';
import * as UsersEndpoint from 'Frontend/generated/UsersEndpoint.js';
import User from 'Frontend/generated/com/vaadin/demo/hilla/testing/User.js';

@customElement('users-page')
export default class UsersPage extends View {
  #users: readonly User[] = [];

  async connectedCallback() {
    super.connectedCallback();
    this.#users = await UsersEndpoint.findAll();
  }

  render() {
    return html`
      <table data-testid="users">
        <th>
          <td>First Name</td>
          <td>Last Name</td>
        </th>
        ${repeat(
          this.#users,
          ({ id }) => id,
          ({ firstName, lastName }) => html`<tr>
            <td>${firstName}</td>
            <td>${lastName}</td>
          </tr>`
        )}
      </table>
    `;
  }
}
