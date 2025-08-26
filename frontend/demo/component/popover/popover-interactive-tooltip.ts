import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/button';
import '@vaadin/integer-field';
import '@vaadin/popover';
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import type { PopoverTrigger } from '@vaadin/popover';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('popover-interactive-tooltip')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  @state()
  trigger: PopoverTrigger[] = ['hover', 'focus'];

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-integer-field id="cvv-field" label="CVV" style="width: 60px"></vaadin-integer-field>
      <vaadin-popover
        for="cvv-field"
        .trigger="${this.trigger}"
        position="top"
        theme="arrow"
        aria-labelledby="cvv-heading"
      >
        <h3 id="cvv-heading" style="margin: 0; font-size: 1rem">Card Verification Value</h3>
        <div style="max-width: 300px">
          A three or four digit code, usually printed on the back of the card, next to, or at the
          end of, the signature strip.
        </div>
        <a href="https://www.cvvnumber.com/cvv.html" target="_blank">
          See where to find CVV on different cards
        </a>
      </vaadin-popover>
      <!-- end::snippet[] -->
    `;
  }
}
