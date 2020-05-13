// tutorial::polymer-templates/tutorial-template-subtemplate.asciidoc
import {PolymerElement,html} from '@polymer/polymer/polymer-element.js';
import 'child-template.js';

class ParentTemplate extends PolymerElement {
    static get template() {
        return html`
            <div>Parent Template</div>
            <div>[[name]]</div>
            <child-template id="childTemplate"></child-template>`;
    }

    static get is() { return 'parent-template' }
}

customElements.define(ParentTemplate.is, ParentTemplate);


class ChildTemplate extends PolymerElement {
    static get template() {
        return html`<button on-click="handleClick">Child Template</button>`;
    }

    static get is() { return 'child-template' }
}

customElements.define(ChildTemplate.is, ChildTemplate);
