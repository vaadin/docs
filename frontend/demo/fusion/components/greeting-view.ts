import { LitElement, customElement, html } from 'lit-element';
import { query } from 'lit-element/lib/decorators.js';

import '@vaadin/vaadin-combo-box';
import '@vaadin/vaadin-checkbox';
import { ComboBoxElement } from '@vaadin/vaadin-combo-box';
import { CheckboxElement } from '@vaadin/vaadin-checkbox';

@customElement('greeting-view')
export class GreetingView extends LitElement {
  @query('#greeting')
  greeting!: ComboBoxElement;

  @query('#custom')
  custom!: CheckboxElement;

  render() {
    return html`
      <vaadin-combo-box
        id="greeting"
        label="Greeting"
        items='["Hi", "Hello", "Dear"]'
        value="Hi"
      ></vaadin-combo-box>
      <vaadin-checkbox id="custom" @checked-changed="${this.checkboxChanged}"
        >Type Custom greeting</vaadin-checkbox
      >
    `;
  }

  checkboxChanged() {
    this.greeting.allowCustomValue = this.custom.checked;
    if (!this.greeting.allowCustomValue) {
      this.greeting.value = this.greeting.items![0] as string;
    }
  }
}
