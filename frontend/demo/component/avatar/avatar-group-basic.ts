import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-avatar/vaadin-avatar-group';
import { applyTheme } from 'generated/theme';
import { AvatarGroupItem } from '@vaadin/vaadin-avatar/src/interfaces';

@customElement('avatar-group-basic')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  //tag::snippet[]
  private people: AvatarGroupItem[] = [
    { name: 'Ada Lovelace' },
    { name: 'Katherine Johnson' },
    { name: 'Tim Berners-Lee ' }
  ];

  render() {
    return html`
      <vaadin-avatar-group .items=${this.people}></vaadin-avatar-group>
    `;
  }
  //end::snippet[]
}
