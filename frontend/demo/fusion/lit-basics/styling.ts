import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import myComponentStyles from './my-component.css?inline';

@customElement('my-component')
class MyComponent extends LitElement {
  static styles = [
    myComponentStyles,
    css`
      h1 {
        color: red;
      }
    `,
  ];

  render() {
    return html`<h1>My Component</h1>`;
  }
}

export default MyComponent;
