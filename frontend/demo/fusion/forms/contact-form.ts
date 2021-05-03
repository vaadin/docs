import { customElement, html, LitElement, property } from 'lit-element';

import '@vaadin/vaadin-upload';
import '@vaadin/vaadin-button';

import Contact from 'Frontend/generated/com/vaadin/demo/fusion/forms/Contact';
import ContactModel from 'Frontend/generated/com/vaadin/demo/fusion/forms/ContactModel';
import { ContactEndpoint } from 'Frontend/generated/ContactEndpoint';

import { Binder } from '@vaadin/form';

import { readAsDataURL } from 'promise-file-reader';

@customElement('contact-form')
export class ContactForm extends LitElement {
  private binder = new Binder(this, ContactModel);

  @property({ type: Object })
  set contact(value: Contact) {
    this.binder.read(value);
  }
  render() {
    return html`
      <img src="${this.binder.model.avatarBase64}" alt="contact's avatar" />

      <vaadin-upload
        capture="camera"
        accept="image/*"
        max-files="1"
        @upload-before="${async (e: CustomEvent) => {
          const file = e.detail.file;
          e.preventDefault();
          const base64Image = await readAsDataURL(file);
          this.binder.for(this.binder.model.avatarBase64).value = base64Image;
        }}"
      ></vaadin-upload>

      <!-- other form fields -->

      <vaadin-button @click="${this.save}">Save</vaadin-button>
    `;
  }

  async save() {
    await this.binder.submitTo(ContactEndpoint.saveContact);
  }
}
