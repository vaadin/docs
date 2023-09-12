import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/generated/theme';
import '@vaadin/icon';
// import codeBranchIcon from '../../../../src/main/resources/icons/code-branch.svg';
// import solidSprite from '../../../../src/main/resources/icons/solid.svg';

// console.log(codeBranchIcon);
// <vaadin-icon src="${codeBranchIcon}"></vaadin-icon>
//       <vaadin-icon src="${solidSprite}"></vaadin-icon>
@customElement('svg-standalone')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-icon src="../../../../src/main/resources/icons/code-branch.svg"></vaadin-icon>
      <!-- end::snippet[] -->
    `;
  }
}
