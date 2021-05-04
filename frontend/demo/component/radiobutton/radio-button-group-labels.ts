import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-radio-button/vaadin-radio-group';
import '@vaadin/vaadin-radio-button/vaadin-radio-button';
import '@vaadin/vaadin-ordered-layout/vaadin-vertical-layout';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('radio-button-group-labels')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  render() {
    return html`
      <vaadin-vertical-layout>
        <!-- tag::snippet[] -->
        <vaadin-radio-group label="Job title" theme="vertical">
          <vaadin-radio-button value="analyst" checked>Analyst</vaadin-radio-button>
          <vaadin-radio-button value="administrator">Administrator</vaadin-radio-button>
          <vaadin-radio-button value="engineer">Engineer</vaadin-radio-button>
        </vaadin-radio-group>

        <vaadin-radio-group label="Department" theme="vertical">
          <vaadin-radio-button value="engineering" checked>Engineering</vaadin-radio-button>
          <vaadin-radio-button value="humanResources">Human Resources</vaadin-radio-button>
          <vaadin-radio-button value="marketing">Marketing</vaadin-radio-button>
        </vaadin-radio-group>
        <!-- end::snippet[] -->
      </vaadin-vertical-layout>
    `;
  }
}
