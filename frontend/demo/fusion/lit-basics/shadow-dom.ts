import { LitElement, html, TemplateResult } from 'lit';
import {customElement} from 'lit/decorators.js';

@customElement('my-view')
class MyView extends LitElement {
  render(): TemplateResult {
    return html`<h1>My View</h1>`;
  }
}

export default MyView;
