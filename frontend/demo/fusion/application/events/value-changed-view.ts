import '../../init'; // hidden-full-source-line
import { customElement, html, internalProperty } from 'lit-element';
import '@vaadin/vaadin-button/vaadin-button';
import { View } from '../../view';

// tag::snippet[]
@customElement('value-changed-view')
export class ValueChangedView extends View {
  @internalProperty()
  private name = '';

  render() {
    return html`
      <vaadin-text-field label="Your name" @value-changed="${this.nameChanged}"></vaadin-text-field>
      <div>Your name is: ${this.name}</div>
    `;
  }

  private nameChanged(event: CustomEvent) {
    this.name = event.detail.value;
  }
}
// end::snippet[]
