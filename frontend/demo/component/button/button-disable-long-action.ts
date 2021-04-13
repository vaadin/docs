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
  progressBarValue = 0;

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-button @click=${this.performAction}>Perform Action</vaadin-button>
      <vaadin-progress-bar
        value="${this.progressBarValue}"
        style="display: inline-block; width: 350px;"
      ></vaadin-progress-bar>
      <!-- end::snippet[] -->
    `;
  }

  performAction() {
    const button = this.shadowRoot?.querySelector('vaadin-button');
    if (button) {
      // disable the button
      button.disabled = true;
      this.progressBarValue = 0;
      // we need an interval to update the progress-bar
      const breakInterval = setInterval(() => {
        this.progressBarValue += 0.005;
      }, 25);
      // simulate a long running process
      setTimeout(() => {
        // re-enable the button the the process is finished
        button.disabled = false;
        this.progressBarValue = 1.0;
        // stop updating the progress-bar
        clearInterval(breakInterval);
      }, 5000);
    }
  }
}
