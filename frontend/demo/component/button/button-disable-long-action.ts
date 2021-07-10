import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import '@vaadin/vaadin-button/vaadin-button';
import '@vaadin/vaadin-progress-bar/vaadin-progress-bar';
import { applyTheme } from 'Frontend/generated/theme';
import './fake-progress-bar';
import { FakeProgressBar } from './fake-progress-bar';

@customElement('button-disable-long-action')
export class Example extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  @state()
  private isDisabled = false;

  @query('fake-progress-bar')
  private fakeProgressBar!: FakeProgressBar;

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-horizontal-layout theme="spacing" style="align-items: center;">
        <vaadin-button
          ?disabled=${this.isDisabled}
          @click=${() => {
            this.isDisabled = true;
            this.fakeProgressBar.simulateProgress();
          }}
          style="flex: none;"
          >Perform Action</vaadin-button
        >
        <fake-progress-bar
          @progress-end=${() => {
            this.isDisabled = false;
          }}
        ></fake-progress-bar>
      </vaadin-horizontal-layout>
      <!-- end::snippet[] -->
    `;
  }
}
