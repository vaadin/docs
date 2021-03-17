import 'Frontend/demo/init'; // hidden-full-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-avatar/vaadin-avatar-group';
import { applyTheme } from 'Frontend/generated/theme';
import { AvatarGroupItem } from '@vaadin/vaadin-avatar/src/interfaces';

@customElement('avatar-group-bg-color')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  //tag::snippet[]
  private people: AvatarGroupItem[] = [
    { name: 'Ada Lovelace', colorIndex: 0 },
    { name: 'Katherine Johnson', colorIndex: 1 },
    { name: 'Alan Turing', colorIndex: 2 },
    { name: 'Linus Torvalds', colorIndex: 3 },
    { name: 'Tim Berners-Lee ', colorIndex: 4 },
    { name: 'Steve Wozniak', colorIndex: 5 },
    { name: 'Ken Thompson', colorIndex: 6 },
  ];

  render() {
    return html`<vaadin-avatar-group .items=${this.people}></vaadin-avatar-group>`;
  }
  //end::snippet[]
}
