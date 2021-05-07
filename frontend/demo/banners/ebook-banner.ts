import { LitElement, customElement } from 'lit-element';
import { renderBanner } from './vaadin-docs-banner';
import img from './images/ebook.png';

@customElement('ebook-banner')
export class EbookBanner extends LitElement {
  content = `<b>Download free e-book.</b><br />The complete guide is also available in an easy-to-follow PDF format.`;
  link = 'https://pages.vaadin.com/en/build-a-modern-web-app-with-spring-boot-vaadin-pdf';

  connectedCallback() {
    super.connectedCallback();
    renderBanner(img, this.content, this.link);
  }
}
