import './my-text-field';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { field } from '@vaadin/hilla-lit-form';
import SamplePersonModel from 'Frontend/generated/com/vaadin/demo/fusion/forms/fieldstrategy/SamplePersonModel';
import { MyBinder } from './my-binder';

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
  // ...
}
