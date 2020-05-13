// tutorial::components/tutorial-enabled-state.asciidoc
import {PolymerElement,html} from '@polymer/polymer/polymer-element.js';

class RegistrationForm extends PolymerElement {

    static get template() {
        return html`
            <vaadin-text-field id='name'>
                {{name}}
            </vaadin-text-field>
            <vaadin-text-field id='email'>
                {{email}}
            </vaadin-text-field>
            <vaadin-button id='submit' 
                on-click='register'>
                Register
            </vaadin-button>
            <vaadin-checkbox id='enable'>
                Accept License Agreement
            </vaadin-checkbox>`;
    }

    static get is() {
        return 'registration-form';
    }
}

customElements.define(RegistrationForm.is,
        RegistrationForm);
