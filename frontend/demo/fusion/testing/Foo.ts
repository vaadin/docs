import { html, LitElement } from 'lit';
import { customElement, property } from "lit/decorators.js";

export type FooEventData = { value: string };

// tag::snippet[]
@customElement('x-foo')
export default class Foo extends LitElement {
  @property()
  title = 'Bar';

  render() {
    return html`<button @click=${this._listener}">${this.title}</button>`;
  }

  private _listener() {
    this.dispatchEvent(
      new CustomEvent<FooEventData>('foo-click', { detail: { value: `${this.title} is clicked` } })
    );
  }
}
// end::snippet[]
