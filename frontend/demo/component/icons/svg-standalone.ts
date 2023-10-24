import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/generated/theme';
import '@vaadin/icon';
import codeBranchIcon from '../../../../src/main/resources/icons/code-branch.svg';

@customElement('svg-standalone')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  protected override render() {
    // As an alternative to importing the SVG file, you can set the "src" property to be any relative or absolute URL.
    // For example, if you have the icons in your "myapp" application theme, you could set the value to "/themes/myapp/code-branch.svg"
    return html`
      <!-- tag::snippet[] -->
      <vaadin-icon src="${codeBranchIcon}"></vaadin-icon>
      <!-- end::snippet[] -->
    `;
  }
}
