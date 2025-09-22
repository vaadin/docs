import '@vaadin/button';
import '@vaadin/upload';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { readAsDataURL } from 'promise-file-reader';
import { Binder } from '@vaadin/hilla-lit-form';
import type { UploadBeforeEvent } from '@vaadin/upload';
import type Contact from 'Frontend/generated/com/vaadin/demo/fusion/forms/Contact';
import ContactModel from 'Frontend/generated/com/vaadin/demo/fusion/forms/ContactModel';
import { ContactEndpoint } from 'Frontend/generated/endpoints';

@customElement('contact-form')
export class ContactForm extends LitElement {
  private binder = new Binder(this, ContactModel);

  @property({ type: Object })
  set contact(value: Contact) {
    this.binder.read(value);
  }

  render() {
    return html`
      <img src="${this.binder.model.avatarBase64.valueOf()}" alt="contact's avatar" />

      <vaadin-upload
        capture="camera"
        accept="image/*"
        max-files="1"
        @upload-before="${async (e: UploadBeforeEvent) => {
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
