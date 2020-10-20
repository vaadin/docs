import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-radio-button/vaadin-radio-group';
import '@vaadin/vaadin-radio-button/vaadin-radio-button';

// tag::snippet[]
@customElement('radio-button-orientation-1')
export class RadioButtonOrientation1 extends LitElement {

  render() {
    return html`
      <vaadin-radio-group
        label="Travel Class"
        theme="vertical"
      >
        <vaadin-radio-button>Pending</vaadin-radio-button>
        <vaadin-radio-button>Submitted</vaadin-radio-button>
        <vaadin-radio-button>Confirmed</vaadin-radio-button>
        <vaadin-radio-button>Failed</vaadin-radio-button>
        <vaadin-radio-button>Cancelled</vaadin-radio-button>
      </vaadin-radio-group>
    `;
  }
}
// end::snippet[]
