import 'Frontend/demo/init'; // hidden-source-line

import { css, html, LitElement, render } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { guard } from 'lit/directives/guard.js';

import '@vaadin/button';
import '@vaadin/dialog';
import '@vaadin/text-field';
import '@vaadin/vertical-layout';

import { applyTheme } from 'Frontend/generated/theme';

@customElement('dialog-basic')
export class Example extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  @state()
  private dialogOpened = true;

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-dialog
        header-title="New employee"
        .opened="${this.dialogOpened}"
        @opened-changed="${(e: CustomEvent) => (this.dialogOpened = e.detail.value)}"
        .footerRenderer="${guard([], () => (root: HTMLElement) => {
          render(this.footerLayout, root);
        })}"
        .renderer="${guard([], () => (root: HTMLElement) => {
          render(this.dialogLayout, root);
        })}"
      ></vaadin-dialog>

      <vaadin-button @click="${() => (this.dialogOpened = true)}">Show dialog</vaadin-button>
      <!-- end::snippet[] -->
    `;
  }

  dialogLayout = html`
    <vaadin-vertical-layout style="align-items: stretch; width: 18rem; max-width: 100%;">
      <vaadin-text-field label="First name"></vaadin-text-field>
      <vaadin-text-field label="Last name"></vaadin-text-field>
    </vaadin-vertical-layout>
  `;

  footerLayout = html`
    <vaadin-button @click="${() => (this.dialogOpened = false)}"> Cancel </vaadin-button>
    <vaadin-button theme="primary" @click="${() => (this.dialogOpened = false)}">
      Add
    </vaadin-button>
  `;

  static styles = css`
    /* Center the button within the example */
    :host {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      display: flex !important;
      align-items: center;
      justify-content: center;
    }
  `;
}
