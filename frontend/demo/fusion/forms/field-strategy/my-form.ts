import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { field } from '@hilla/form';
import './my-text-field.js';
import { MyBinder } from './my-binder.js';
import SamplePersonModel from 'Frontend/generated/com/vaadin/demo/fusion/forms/fieldstrategy/SamplePersonModel.js';

@customElement('person-form-view')
export class PersonFormViewElement extends LitElement {
  private binder = new MyBinder(this, SamplePersonModel);

  render() {
    return html`
      <h3>Personal information</h3>
      <vaadin-form-layout>
        <my-text-field
          label="First name"
          ...="${field(this.binder.model.firstName)}"
        ></my-text-field>
      </vaadin-form-layout>
    `;
  }
  //...
}
