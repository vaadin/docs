import 'Frontend/demo/init'; // hidden-full-source-line
import { customElement, html, LitElement } from 'lit-element';
import '@vaadin/vaadin-split-layout/vaadin-split-layout';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('split-layout-initial-splitter-position')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-split-layout>
        <div style="width: 50%;">First content element</div>
        <div style="width: 50%;">Second content element</div>
      </vaadin-split-layout>
      <!-- end::snippet[] -->
    `;
  }
}
