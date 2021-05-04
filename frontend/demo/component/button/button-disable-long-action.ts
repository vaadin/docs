import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement, customElement, internalProperty } from 'lit-element';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import '@vaadin/vaadin-button/vaadin-button';
import '@vaadin/vaadin-progress-bar/vaadin-progress-bar';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('button-disable-long-action')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  @internalProperty()
  private progress?: number;

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-horizontal-layout theme="spacing" style="align-items: center;">
        <vaadin-button
          .disabled="${this.progress !== undefined}"
          @click="${this.performAction}"
          style="flex: none;"
          >Perform Action</vaadin-button
        >
        <vaadin-progress-bar .value="${this.progress}"></vaadin-progress-bar>
      </vaadin-horizontal-layout>
      <!-- end::snippet[] -->
    `;
  }

  performAction() {
    this.progress = 0;
    // simulate a long running process
    const breakInterval = setInterval(() => {
      if (this.progress !== undefined) {
        this.progress += 0.005;
        if (this.progress >= 1) {
          this.progress = undefined;
          clearInterval(breakInterval);
        }
      }
    }, 25);
  }
}
