import { renderBanner } from '../render-banner';
import img from './migration-assistance.png';
export class MigrationBanner extends HTMLElement {
  content =
    'Are you planning on migrating your application? Get help from Vaadin experts.';
  link = 'https://vaadin.com/solutions/migration-assistance';

  connectedCallback() {
    renderBanner(img, this.content, this.link);
  }
}

window.customElements.define('migration-banner', MigrationBanner);
