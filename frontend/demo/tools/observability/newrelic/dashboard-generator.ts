import 'Frontend/demo/init'; // hidden-source-line

import { css, html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/button';
import '@vaadin/icon';
import '@vaadin/icons';
import '@vaadin/text-field';
import '@vaadin/text-area';
import { applyTheme } from 'Frontend/generated/theme';
import template from './dashboard-template.json';
import type { TextFieldValueChangedEvent } from '@vaadin/text-field';
import { Notification } from '@vaadin/notification';

@customElement('new-relic-dashboard-generator')
export class DashboardGenerator extends LitElement {
  static override styles = css`
    .json-result {
      width: 100%;
      height: 200px;
    }
  `;

  @state()
  accountId = '';

  @state()
  json = '';

  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  private handleGenerate() {
    let json = JSON.stringify(template, null, 2);
    // Replace account ID in template
    json = json.replace(/"accountId": \d+/g, `"accountId": ${this.accountId}`);

    this.json = json;
  }

  private handleCopyToClipboard() {
    navigator.clipboard.writeText(this.json).then(() => {
      const notification = Notification.show('Copied!', {
        position: 'middle',
        duration: 2000,
      });
      notification.setAttribute('theme', 'success');
    });
  }

  protected override render() {
    return html`
      <vaadin-text-field
        label="Account ID"
        .value="${this.accountId}"
        @value-changed="${(event: TextFieldValueChangedEvent) => {
          this.accountId = event.detail.value;
        }}"
      >
        <vaadin-icon slot="prefix" icon="vaadin:user"></vaadin-icon>
      </vaadin-text-field>
      <vaadin-button @click="${this.handleGenerate}" ?disabled="${this.accountId.length === 0}">
        Generate
      </vaadin-button>
      <br />
      <vaadin-text-area
        class="json-result"
        label="Dashboard JSON"
        theme="monospace"
        readonly
        .value="${this.json}"
      ></vaadin-text-area>
      <vaadin-button @click="${this.handleCopyToClipboard}" ?disabled="${this.json.length === 0}">
        Copy
      </vaadin-button>
    `;
  }
}
