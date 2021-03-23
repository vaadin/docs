import '../../init'; // hidden-full-source-line
import './upload-demo-helpers'; // hidden-full-source-line
import { css, customElement, html, internalProperty, LitElement } from 'lit-element';
import { guard } from 'lit-html/directives/guard';
import '@vaadin/vaadin-notification/vaadin-notification';
import '@vaadin/vaadin-upload/vaadin-upload';
import type { UploadFileReject } from '@vaadin/vaadin-upload/vaadin-upload';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('upload-file-count')
export class Example extends LitElement {
  static get styles() {
    return css`
      h4 {
        margin-top: 0;
      }

      p {
        color: var(--lumo-secondary-text-color);
      }
    `;
  }

  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  @internalProperty()
  private errorMessage = '';

  @internalProperty()
  private notificationOpened = false;

  // tag::snippet[]
  render() {
    const maxFiles = 3;
    return html`
      <h4>Upload files</h4>
      <p>Maximum of ${maxFiles} files allowed</p>
      <vaadin-upload
        .maxFiles="${maxFiles}"
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
