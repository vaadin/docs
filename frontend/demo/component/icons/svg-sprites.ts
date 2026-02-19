import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/horizontal-layout';
import '@vaadin/icon';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';
import solidSprite from '../../../../src/main/resources/META-INF/resources/icons/solid.svg?url';

@customElement('svg-sprites')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <vaadin-horizontal-layout theme="spacing" style="align-items: center">
        <!-- tag::snippet[] -->
        <vaadin-icon src=${solidSprite} symbol="code-branch"></vaadin-icon>
        <vaadin-icon src=${solidSprite} symbol="user"></vaadin-icon>
        <!-- end::snippet[] -->
      </vaadin-horizontal-layout>
    `;
  }
}
