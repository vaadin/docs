import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement, css } from 'lit-element';
import { registerStyles } from '@vaadin/vaadin-themable-mixin/register-styles';
import '@vaadin/vaadin-tabs/vaadin-tabs';

@customElement('tabs-badges')
export class Example extends LitElement {
  constructor() {
    registerStyles(
      'vaadin-tab',
      css`
        ::slotted(span[theme='badge']) {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
          padding: 0.4em calc(0.5em + var(--lumo-border-radius-s) / 4);
          color: var(--lumo-primary-text-color);
          background-color: var(--lumo-primary-color-10pct);
          border-radius: var(--lumo-border-radius-s);
          font-family: var(--lumo-font-family);
          font-size: var(--lumo-font-size-s);
          line-height: 1;
          font-weight: 500;
          text-transform: initial;
          letter-spacing: initial;
          min-width: calc(var(--lumo-line-height-xs) * 1em + 0.45em);
          margin-left: var(--lumo-space-xs);
        }
      `
    );

    super();
    //TODO(yuriy): Fix badges styles, should load styles before first example
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-tabs>
        <vaadin-tab>
          Open
          <span theme="badge">24</span>
        </vaadin-tab>
        <vaadin-tab>
          Completed
          <span theme="badge">439</span>
        </vaadin-tab>
        <vaadin-tab>
          Cancelled
          <span theme="badge">5</span>
        </vaadin-tab>
      </vaadin-tabs>
      <!-- end::snippet[] -->
    `;
  }
}
