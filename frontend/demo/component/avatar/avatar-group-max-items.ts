import 'Frontend/demo/init'; // hidden-full-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-avatar/vaadin-avatar-group';
import { applyTheme } from 'Frontend/generated/theme';
import { AvatarGroupItem } from '@vaadin/vaadin-avatar/src/interfaces';

@customElement('avatar-group-max-items')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  private people: AvatarGroupItem[] = [
    { name: 'Ada Lovelace' },
    { name: 'Katherine Johnson' },
    { name: 'Alan Turing' },
    { name: 'Linus Torvalds' },
    { name: 'Tim Berners-Lee ' },
  ];

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-avatar-group .items=${this.people} .maxItemsVisible=${3}></vaadin-avatar-group>
      <!-- end::snippet[] -->
    `;
  }
}
