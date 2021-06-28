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
        max-width: 400px;
      }

      #footer {
        margin: calc(var(--lumo-space-l) * -1);
        margin-top: var(--lumo-space-l);
        padding: 0 var(--lumo-space-m);
        background-color: var(--lumo-contrast-5pct);
      }

      #footer vaadin-button {
        margin: calc(var(--lumo-space-xs) * 3) 0;
      }

      #footer vaadin-button[theme~='error'] {
        margin-right: calc(var(--lumo-space-xs) * 3);
      }
    `;
  }
  render() {
    return html`
      <div class="overlay">
        <div class="content">
          <vaadin-vertical-layout theme="spacing" style="align-items: stretch;">
            <h3 style="margin: var(--lumo-space-l) 0 0 0;">Unsaved changes</h3>
            <p style="margin-bottom: 0;">
              There are unsaved changes. Do you want to discard or save them?
            </p>
            <vaadin-horizontal-layout id="footer">
              <vaadin-button theme="tertiary">Cancel</vaadin-button>
              <div style="flex-grow: 1;"></div>
              <vaadin-button theme="error tertiary">Discard</vaadin-button>
              <vaadin-button theme="primary">Save</vaadin-button>
            </vaadin-horizontal-layout>
          </vaadin-vertical-layout>
        </div>
      </div>
    `;
  }
}
