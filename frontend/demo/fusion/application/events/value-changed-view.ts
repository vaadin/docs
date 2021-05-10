import 'Frontend/demo/init'; // hidden-source-line
import { customElement, html, internalProperty, LitElement } from 'lit-element';
import '@vaadin/vaadin-button/vaadin-button';
import '@vaadin/vaadin-text-field/vaadin-text-field';

// tag::snippet[]
@customElement('value-changed-view')
export class ValueChangedView extends LitElement {
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
