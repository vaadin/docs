import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/generated/theme';
import '@vaadin/icon';
import '@vaadin/horizontal-layout';
import codeBranch from '../../../../src/main/resources/icons/code-branch.svg';

@customElement('icons-color')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <vaadin-horizontal-layout theme="spacing" class="items-center">
        <!-- tag::snippet[] -->
        <vaadin-icon src="${codeBranch}" style="color: red"></vaadin-icon>
        <vaadin-icon font="icomoon icomoon-user" style="color: red"></vaadin-icon>
        <!-- end::snippet[] -->
      </vaadin-horizontal-layout>
    `;
  }
}
