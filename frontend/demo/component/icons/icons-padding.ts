import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/generated/theme';
import '@vaadin/icon';
import '@vaadin/horizontal-layout';
import codeBranch from '../../../../src/main/resources/icons/code-branch.svg';

@customElement('icons-padding')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <vaadin-horizontal-layout theme="spacing" class="items-end">
        <!-- tag::snippet[] -->
        <vaadin-icon src="${codeBranch}"></vaadin-icon>
        <vaadin-icon src="${codeBranch}" style="padding: 0.25em"></vaadin-icon>
        <vaadin-icon src="${codeBranch}" style="padding: 0.5em"></vaadin-icon>
        <!-- end::snippet[] -->
      </vaadin-horizontal-layout>
    `;
  }
}
