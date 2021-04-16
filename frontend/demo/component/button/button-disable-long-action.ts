import 'Frontend/demo/init'; // hidden-full-source-line

import { html, LitElement, customElement, internalProperty } from 'lit-element';
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
  private progress: number | undefined = undefined;

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-button
        ?disabled="${this.progress !== undefined && this.progress < 1}"
        @click=${this.performAction}
        >Perform action</vaadin-button
      >
      <vaadin-progress-bar
        value="${this.progress}"
        style="display: inline-block; width: 350px;"
      ></vaadin-progress-bar>
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
          clearInterval(breakInterval);
        }
      }
    }, 25);
  }
}
