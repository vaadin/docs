import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/horizontal-layout';
import '@vaadin/icon';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';
import codeBranch from '../../../../src/main/resources/META-INF/resources/icons/code-branch.svg?url';

@customElement('icons-sizing')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <vaadin-horizontal-layout theme="spacing" style="align-items: flex-end">
        <!-- tag::snippet[] -->
        <vaadin-icon src="${codeBranch}"></vaadin-icon>
        <vaadin-icon src="${codeBranch}" style="--vaadin-icon-size: 2rem;"></vaadin-icon>
        <vaadin-icon src="${codeBranch}" style="--vaadin-icon-size: 3rem;"></vaadin-icon>
        <!-- end::snippet[] -->
      </vaadin-horizontal-layout>
    `;
  }
}
