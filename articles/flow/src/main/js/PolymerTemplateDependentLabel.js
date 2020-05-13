// tutorial::cdi/tutorial-cdi-instantiated-beans.asciidoc
import {PolymerElement,html} from
        '@polymer/polymer/polymer-element.js';

class TestTemplate extends Polymer.Element {
    static get template() {
        return html`
            <div>
                <dependent-label id="label"/>
            </div>`;
    }

    static get is() { return 'test-template' }
}
customElements.define(TestTemplate.is, TestTemplate);
