// tutorial::creating-components/tutorial-component-mixins.asciidoc
import {PolymerElement,html} from '@polymer/polymer/polymer-element.js';

class Tooltip extends PolymerElement {
    static get template() {
        return html`
            <div part="content" theme="dark">
                <slot></slot>
            </div>`;
    }
}
