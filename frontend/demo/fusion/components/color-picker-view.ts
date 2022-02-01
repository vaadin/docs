import { html, LitElement } from 'lit';
import { customElement, query } from 'lit/decorators.js';

import '@vaadin/text-field';
import { TextField } from '@vaadin/text-field';

import 'vanilla-colorful';

@customElement('color-picker-view')
export class ColorPickerView extends LitElement {
  @query('#hex')
  hex!: TextField;

  render() {
    return html`
      <vaadin-text-field id="hex" label="HEX" readonly></vaadin-text-field>
      <hex-color-picker @color-changed="${this.colorChanged}"></hex-color-picker>
    `;
  }

  colorChanged(e: CustomEvent) {
    this.hex.value = e.detail.value;
  }
}
