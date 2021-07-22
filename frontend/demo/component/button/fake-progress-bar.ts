import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '@vaadin/vaadin-progress-bar/vaadin-progress-bar';

@customElement('fake-progress-bar')
export class FakeProgressBar extends LitElement {
  static get styles() {
    return css`
      :host {
        width: 100%;
      }
    `;
  }

  @property()
  progress = 0;

  public simulateProgress() {
    this.progress = 0;
    const breakInterval = setInterval(() => {
      this.progress += 0.005;
      if (this.progress >= 1) {
        this.dispatchEvent(new CustomEvent('progress-end'));
        this.progress = 0;
        clearInterval(breakInterval);
      }
    }, 25);
  }

  render() {
    return html` <vaadin-progress-bar .value="${this.progress}"></vaadin-progress-bar>`;
  }
}
