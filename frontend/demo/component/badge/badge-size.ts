import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('badge-size')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <span theme="badge small">Pending</span>
      <span theme="badge success small">Confirmed</span>
      <span theme="badge error small">Denied</span>
      <span theme="badge contrast small">On hold</span>
      <!-- end::snippet[] -->
    `;
  }
}
