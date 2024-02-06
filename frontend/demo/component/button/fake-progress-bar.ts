import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '@vaadin/progress-bar';

@customElement('fake-progress-bar')
export class FakeProgressBar extends LitElement {
  static override styles = css`
    :host {
      width: 100%;
    }
  `;

  @property({ type: Number })
  progress = 0;

  simulateProgress() {
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

  protected override render() {
    return html`<vaadin-progress-bar .value="${this.progress}"></vaadin-progress-bar>`;
  }
}
