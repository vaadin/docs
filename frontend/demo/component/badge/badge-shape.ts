import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement, customElement } from 'lit-element';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('badge-shape')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <span theme="badge pill">Pending</span>
      <span theme="badge success pill">Confirmed</span>
      <span theme="badge error pill">Denied</span>
      <span theme="badge contrast pill">On hold</span>
      <!-- end::snippet[] -->
    `;
  }
}
