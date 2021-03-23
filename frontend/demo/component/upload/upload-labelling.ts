import '../../init'; // hidden-full-source-line
import './upload-demo-helpers'; // hidden-full-source-line
import { customElement, html, internalProperty, LitElement, query } from 'lit-element';
import { guard } from 'lit-html/directives/guard';
import '@vaadin/vaadin-notification/vaadin-notification';
import '@vaadin/vaadin-upload/vaadin-upload';
import type { UploadElement, UploadFileReject } from '@vaadin/vaadin-upload/vaadin-upload';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('upload-labelling')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  @query('vaadin-upload')
  private upload?: UploadElement;

  @internalProperty()
  private errorMessage = '';

  @internalProperty()
  private notificationOpened = false;

  // tag::snippet[]
  firstUpdated() {
    if (this.upload?.i18n) {
      this.upload.i18n.addFiles.one = 'Upload PDF...';
      this.upload.i18n.dropFiles.one = 'Drop PDF here';
      this.upload.i18n = { ...this.upload.i18n };
    }
  }

  render() {
    return html`
      <vaadin-upload
        max-files="1"
        accept="application/pdf,.pdf"
        @file-reject="${this.fileRejectHandler}"
      ></vaadin-upload>
      <!-- end::snippet[] -->
      <vaadin-notification
        theme="error"
        position="middle"
        .opened="${this.notificationOpened}"
        @opened-changed="${(e: CustomEvent) => (this.notificationOpened = e.detail.value)}"
        .renderer="${guard([this.errorMessage], () => (root: HTMLElement) => {
          root.textContent = this.errorMessage;
        })}"
      ></vaadin-notification>
      <!-- tag::snippet[] -->
    `;
  }
  // end::snippet[]

  fileRejectHandler(event: UploadFileReject) {
    this.errorMessage = `Error: ${event.detail.error} '${event.detail.file.name}'`;
    this.notificationOpened = true;
  }
}
