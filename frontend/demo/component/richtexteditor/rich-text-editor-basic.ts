import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement, property } from 'lit-element';
import '@vaadin/vaadin-rich-text-editor/vaadin-rich-text-editor';

import templates from '../../../data/templates.json';

// tag::snippet[]
@customElement('rich-text-editor-basic')
export class Example extends LitElement {
  @property() richText = templates.richTextDelta;

  render() {
    return html`
      <vaadin-rich-text-editor
        style="max-height: 400px"
        value=${this.richText}
      ></vaadin-rich-text-editor>
    `;
  }
}
// end::snippet[]
