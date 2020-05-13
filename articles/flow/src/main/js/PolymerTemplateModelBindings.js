// tutorial::polymer-templates/tutorial-template-bindings.asciidoc
import {PolymerElement,html} from '@polymer/polymer/polymer-element.js';

class MyTemplate extends PolymerElement {
    static get template() {
        return html`<div>[[hostProperty]]</div>`;
        return html`<my-element my-property="[[hostProperty]]"></my-element>`;
        return html`<div something$="[[hostProperty]]"></div>`;
        return html`<a href$="[[hostProperty]]"></a>`;
    }

    static get is() {return 'my-template'}
}

customElements.define(MyTemplate.is, MyTemplate);

