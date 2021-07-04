import 'Frontend/demo/init'; // hidden-source-line

import { css, html, LitElement } from 'lit';
import '@vaadin/vaadin-notification/vaadin-notification';
import '@vaadin/vaadin-button/vaadin-button';
import '@vaadin/vaadin-text-field/vaadin-text-field';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import '@vaadin/vaadin-ordered-layout/vaadin-vertical-layout';

export class Example extends LitElement {
  static get styles() {
    return css`
      :host {
        display: flex !important;
        justify-content: center;
        background-color: var(--lumo-shade-20pct);
        padding: var(--lumo-space-l);
        pointer-events: none;
        user-select: none;
        -webkit-user-select: none;
      }

      .overlay {
        display: flex;
        justify-content: center;
        outline: none;
        -webkit-tap-highlight-color: transparent;
        background-color: var(--lumo-base-color);
        background-image: linear-gradient(var(--lumo-tint-5pct), var(--lumo-tint-5pct));
        border-radius: var(--lumo-border-radius-m);
        box-shadow: 0 0 0 1px var(--lumo-shade-5pct), var(--lumo-box-shadow-m);
        color: var(--lumo-body-text-color);
        font-family: var(--lumo-font-family);
        font-size: var(--lumo-font-size-m);
        font-weight: 400;
        line-height: var(--lumo-line-height-m);
        letter-spacing: 0;
        text-transform: none;
        -webkit-text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
      }

      .content {
        padding: var(--lumo-space-l);
        width: 300px;
        max-width: 100%;
      }
    `;
  }
  render() {
    return html`
      <div class="overlay">
        <div class="content">
          <vaadin-vertical-layout theme="spacing" style="align-items: stretch;">
            <h2 style="margin: var(--lumo-space-m) 0 0 0;">New employee</h2>
            <vaadin-vertical-layout style="align-items: stretch;">
              <vaadin-text-field label="First name"></vaadin-text-field>
              <vaadin-text-field label="Last name"></vaadin-text-field>
            </vaadin-vertical-layout>
            <vaadin-horizontal-layout theme="spacing" style="justify-content: flex-end">
              <vaadin-button>Cancel</vaadin-button>
              <vaadin-button theme="primary">Save changes</vaadin-button>
            </vaadin-horizontal-layout>
          </vaadin-vertical-layout>
        </div>
      </div>
    `;
  }
}
