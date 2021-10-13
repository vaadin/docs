import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import '@vaadin/checkbox';
import '@vaadin/combo-box';
import type { ComboBoxValueChangedEvent } from '@vaadin/combo-box';

@customElement('greeting-view')
export class GreetingView extends LitElement {
  @state()
  private greetings = ['Hi', 'Hello', 'Dear'];

  @state()
  private allowCustomGreeting = false;

  @state()
  private greeting = 'Hi';

  render() {
    return html`
      <vaadin-combo-box
        label="Greeting"
        .items="${this.greetings}"
        .allowCustomValue="${this.allowCustomGreeting}"
        .value="${this.greeting}"
        @value-changed="${(e: ComboBoxValueChangedEvent) => (this.greeting = e.detail.value)}"
      ></vaadin-combo-box>
      <vaadin-checkbox @change="${this.checkboxChange}">Type Custom greeting</vaadin-checkbox>
    `;
  }

  checkboxChange(event: Event) {
    this.allowCustomGreeting = (event.target as HTMLInputElement).checked;
    if (!this.allowCustomGreeting) {
      this.greeting = this.greetings[0];
    }
  }
}
