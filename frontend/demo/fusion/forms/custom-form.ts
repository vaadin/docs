import { customElement, html, LitElement } from 'lit-element';

import { field } from '@vaadin/form';
import './custom-text-field';
import { CustomBinder } from './custom-binder';

import PersonModel from 'Frontend/generated/com/vaadin/demo/domain/PersonModel';

@customElement('custom-form')
export class CustomForm extends LitElement {
  private binder = new CustomBinder(this, PersonModel);

  render() {
    return html`
      <custom-text-field
        label="Last name"
        ...="${field(this.binder.model.lastName)}"
      ></custom-text-field>
    `;
  }
}
