// tutorial::introduction/introduction-overview.asciidoc
import {PolymerElement,html} from '@polymer/polymer/polymer-element.js';

class MyComponent extends PolymerElement {

    static get template() {
        return html`
            <vaadin-vertical-layout>
                <vaadin-text-field id="textField"></vaadin-text-field>
                <label id="greeting">Hello stranger</label>

                <input type="color" on-input="updateFavoriteColor">
                <label>Favorite color: </label>
            </vaadin-vertical-layout>`;
    }

    static get is() {
        return 'my-component';
    }
}

customElements.define(MyComponent.is, MyComponent);
