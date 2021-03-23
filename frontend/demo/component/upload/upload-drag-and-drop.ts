import '../../init'; // hidden-full-source-line
import './upload-demo-helpers'; // hidden-full-source-line
import { css, customElement, html, LitElement } from 'lit-element';
import '@vaadin/vaadin-upload/vaadin-upload';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('upload-drag-and-drop')
export class Example extends LitElement {
  static get styles() {
    return css`
      .flex {
        display: flex;
        flex-wrap: wrap;
        align-items: stretch;
        margin: calc(-1 * var(--lumo-space-m));
      }

      .flex > div {
        margin: var(--lumo-space-m);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
    `;
  }

  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  render() {
    return html`
      <div class="flex">
        <!-- tag::snippet[] -->
        <div>
          <vaadin-upload .nodrop="${false}"></vaadin-upload>
          <p>Drag and drop enabled</p>
        </div>
        <div>
          <vaadin-upload nodrop></vaadin-upload>
          <p>Drag and drop disabled</p>
        </div>
        <!-- end::snippet[] -->
      </div>
    `;
  }
}
