import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/checkbox';
import '@vaadin/checkbox-group';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'Frontend/generated/theme';

// tag::snippet[]
@customElement('checkbox-custom-presentation')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  @state()
  private items: Person[] = [];

  protected override async firstUpdated() {
    const { people } = await getPeople({ count: 4 });
    this.items = people;
  }

  protected override render() {
    return html`
      <vaadin-checkbox-group label="Invitees" theme="vertical">
        ${this.items.map(
          (person) => html`
            <vaadin-checkbox .value="${String(person.id)}">
              <label slot="label">
                <div style="display: flex;">
                  <img style="height: 2em" src="${person.pictureUrl}" alt="User avatar" />
                  <div>
                    ${person.firstName} ${person.lastName}
                    <div>${person.profession}</div>
                  </div>
                </div>
              </label>
            </vaadin-checkbox>
          `
        )}
      </vaadin-checkbox-group>
    `;
  }
}
// end::snippet[]
