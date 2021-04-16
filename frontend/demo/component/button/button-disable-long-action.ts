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
  private progressBarValue = 0;

  @internalProperty()
  private disableButton = false;

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-button ?disabled="${this.disableButton}" @click=${this.performAction}
        >Perform action</vaadin-button
      >
      <vaadin-progress-bar
        value="${this.progressBarValue}"
        style="display: inline-block; width: 350px;"
      ></vaadin-progress-bar>
      <!-- end::snippet[] -->
    `;
  }

  performAction() {
    // disable the button
    this.disableButton = true;
    this.progressBarValue = 0;
    // simulate a long running process
    const breakInterval = setInterval(() => {
      this.progressBarValue += 0.005;
      if (this.progressBarValue >= 1) {
        this.disableButton = false;
        clearInterval(breakInterval);
      }
    }, 25);
  }
}
