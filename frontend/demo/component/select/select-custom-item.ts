import '../../init'; // hidden-full-source-line
import '@vaadin/flow-frontend/selectConnector.js'; // hidden-full-source-line

import { html, LitElement, customElement, property } from 'lit-element';
import { render } from 'lit-html';
import '@vaadin/vaadin-select/vaadin-select';
import '@vaadin/vaadin-list-box/vaadin-list-box';
import '@vaadin/vaadin-item/vaadin-item';
import { getPeople } from '../../domain/DataService';
import Person from '../../../generated/com/vaadin/demo/domain/Person';

// tag::snippet[]
@customElement('select-custom-item')
export class Example extends LitElement {
  @property({ type: Array })
  private availableDoctors: Person[] = [];

  async firstUpdated() {
     const allDoctors = await getPeople();
     this.availableDoctors = allDoctors.splice(0, 5);
  }

  // TODO: fix async property problem
  render() {
    return html`
      <vaadin-select
        label="Choose doctor"
        .renderer=${(root: HTMLElement) =>
          render(
            html`
              <vaadin-list-box>
                ${this.availableDoctors.map((doctor) => {
                  return html`
                  <vaadin-item .value=${String(doctor.id)}>
                    <div style="display: flex;">
                      <img style="height: 2em" src=${doctor.pictureUrl} alt="User avatar" />
                      <div style="margin-left: var(--lumo-space-s);">
                        ${doctor.firstName} ${doctor.lastName}
                        <div style="font-size: var(--lumo-font-size-xs);">${doctor.profession}</div>
                      </div>
                    </div>
                  </vaadin-item>`;
                })}
              </vaadin-list-box>
            `,
            root
          )}
      ></vaadin-select>
    `;
  }
}
// tag::snippet[]
