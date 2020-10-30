import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-progress-bar/vaadin-progress-bar';
import '@vaadin/vaadin-ordered-layout/vaadin-vertical-layout';
import '@vaadin/vaadin-custom-field/vaadin-custom-field';

@customElement('progress-bar-theme-variants')
export class Example extends LitElement {
  render() {
    return html`
      <vaadin-vertical-layout theme="spacing">
        <!-- tag::snippet[] -->
        <vaadin-custom-field theme="helper-above-field" style="width: 100%">
          <div slot="helper" style="display: flex; justify-content: space-between;">
            <div>Transferring files...</div>
            <div>60/120</div>
          </div>
          <vaadin-progress-bar value="0.5" theme="contrast"></vaadin-progress-bar>
        </vaadin-custom-field>

        <vaadin-custom-field label="Tasks" theme="helper-above-field" style="width: 100%">
          <div slot="helper" style="display: flex; justify-content: space-between;">
            <div>15/20 completed</div>
            <div>75%</div>
          </div>
          <vaadin-progress-bar value="0.75" theme="success"></vaadin-progress-bar>
        </vaadin-custom-field>

        <vaadin-custom-field label="Tasks" theme="helper-above-field" style="width: 100%">
          <div slot="helper" style="display: flex; justify-content: space-between;">
            <div>4/20 completed</div>
            <div>20%</div>
          </div>
          <vaadin-progress-bar value="0.2" theme="error"></vaadin-progress-bar>
        </vaadin-custom-field>
        <!-- end::snippet[] -->
      </vaadin-vertical-layout>
    `;
  }
}
