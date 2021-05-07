import { LitElement, customElement } from 'lit-element';
import { renderBanner } from './vaadin-docs-banner';
import img from './images/migration-assistance.png';

@customElement('migration-banner')
export class MigrationBanner extends LitElement {
  content = 'Are you planning on migrating your application? Get help from Vaadin experts.';
  link = 'https://vaadin.com/solutions/migration-assistance';

  connectedCallback() {
    super.connectedCallback();
    renderBanner(img, this.content, this.link);
  }
}
