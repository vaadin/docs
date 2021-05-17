import { css, LitElement, html } from 'lit';
import {customElement} from 'lit/decorators.js';
import styles from './my-view.css';

@customElement('my-view')
class MyView extends LitElement {
  static styles = [
    styles,
    css`
      h1 {
        color: red;
      }
    `,
  ];

  render() {
    return html`<h1>My View</h1>`;
  }
}

export default MyView;
