import { customElement, html, LitElement } from 'lit-element';

import '@vaadin/vaadin-button/vaadin-button';
import '@vaadin/vaadin-form-layout/vaadin-form-item';
import '@vaadin/vaadin-form-layout/vaadin-form-layout';
import '@vaadin/vaadin-notification/vaadin-notification';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import '@vaadin/vaadin-ordered-layout/vaadin-vertical-layout';
import '@vaadin/vaadin-text-field/vaadin-text-area';
import '@vaadin/vaadin-text-field/vaadin-text-field';

// import the remote endpoint
import * as viewEndpoint from '../generated/DashboardEndpoint';

import client from '../generated/connect-client.default';
// @ts-ignore
client.prefix = __VAADIN_CONNECT_PREFIX__;

@customElement('dashboard-view')
export class DashboardViewElement extends LitElement {
  render() {
    return html`
      <vaadin-vertical-layout
        id="wrapper"
        theme="padding"
        style="background: #fff"
      >
        <h1>Form</h1>
        <vaadin-form-layout>
          <vaadin-form-item>
            <label slot="label">First name</label>
            <vaadin-text-field
              id="firstname"
              class="full-width"
            ></vaadin-text-field>
          </vaadin-form-item>
          <vaadin-form-item>
            <label slot="label">Last name</label>
            <vaadin-text-field
              class="full-width"
              id="lastname"
            ></vaadin-text-field>
          </vaadin-form-item>
          <vaadin-form-item colspan="2">
            <label slot="label">Email</label>
            <vaadin-text-field
              class="full-width"
              id="email"
            ></vaadin-text-field>
          </vaadin-form-item>
          <br />
          <vaadin-form-item colspan="2">
            <label slot="label">Notes</label>
            <vaadin-text-area class="full-width" id="notes"></vaadin-text-area>
          </vaadin-form-item>
        </vaadin-form-layout>
        <vaadin-horizontal-layout class="button-layout" theme="spacing">
          <vaadin-button theme="tertiary" slot="" @click="${this.clearForm}">
            Cancel
          </vaadin-button>
          <vaadin-button theme="primary" @click="${this.save}">
            Save
          </vaadin-button>
        </vaadin-horizontal-layout>
        <vaadin-notification duration="5000" id="notification">
        </vaadin-notification>
      </vaadin-vertical-layout>
    `;
  }

  private async save() {
    try {
      const value = await viewEndpoint.saveEmployee();
      alert(value);
    } catch (error) {
      console.log(error);
    }
  }

  private clearForm() {}
}
