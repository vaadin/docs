// tutorial::polymer-templates/tutorial-template-mapped-components-limitations.asciidoc
import {PolymerElement,html} from '@polymer/polymer/polymer-element.js';

class MainPage extends PolymerElement {

    static get template() {
        return html`
            <div id="header">Main page</div>
            <div id="content"></div>
            <hr>
            <div id="footer">
                <a href="mailto:someone@example.com?Subject=Hello" target="_top">Send Mail</a>
            </div>`;
    }

    static get is() {
          return 'main-page';
    }
}

customElements.define(MainPage.is, MainPage);
