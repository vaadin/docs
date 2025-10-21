import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/horizontal-layout';
import '@vaadin/icon';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';
import codeBranch from '../../../../src/main/resources/META-INF/resources/icons/code-branch.svg?url';

@customElement('icons-color')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <vaadin-horizontal-layout theme="spacing" class="items-center">
        <!-- tag::snippet[] -->
        <vaadin-icon src="${codeBranch}" style="color: red"></vaadin-icon>
        <vaadin-icon icon-class="fa fa-user" style="color: red"></vaadin-icon>
        <!-- end::snippet[] -->
      </vaadin-horizontal-layout>
    `;
  }
}
