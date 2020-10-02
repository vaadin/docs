// tutorial::polymer-templates/tutorial-polymer-template-components-in-slot.asciidoc
import {PolymerElement,html} from '@polymer/polymer/polymer-element.js';

class ComponentContainer extends PolymerElement {
    static get template() {
        return html`
            <div>
                <slot></slot>
            </div>`;
    }

    static get is() {
        return 'component-container';
    }
}
customElements.define(ComponentContainer.is, ComponentContainer);

class MainLayout extends PolymerElement {
    static get template() {
        return html`
            <h1>Site title</h1>
            <div class="menu">...</div>
            <!-- child content comes here -->
            <slot></slot>`;
    }

    static get is() {
        return 'main-layout'
    }
}
customElements.define(MainLayout.is, MainLayout);
