import { LitElement, html, customElement } from 'lit-element';

// NOTE: This can't currently work because of how resources
// are referenced in the embedded docs examples.

@customElement('fusion-application-images-basic')
export class ImagesBasic extends LitElement {
  render() {
    return html`
      <!-- tag::snippet[] -->
      <img src="foobar.png" alt="Alt Text"></img>
      <!-- end::snippet[] -->
      `;
  }
}
