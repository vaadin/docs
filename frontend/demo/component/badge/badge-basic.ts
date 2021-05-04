import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement, customElement } from 'lit-element';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('badge-basic')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <span theme="badge">Pending</span>
      <span theme="badge success">Confirmed</span>
      <span theme="badge error">Denied</span>
      <!-- end::snippet[] -->
    `;
  }
}
