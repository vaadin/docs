// tutorial::polymer-templates/tutorial-template-model-bean.asciidoc
import {PolymerElement,html} from '@polymer/polymer/polymer-element.js';

class MyForm extends PolymerElement {
    static get template() {
        return html`
            <div>
                <div>
                    <span>First name</span>
                    <input value="{{person.firstName}}" />
                </div>
                <div>
                    <span>Last name</span>
                    <input value="{{person.lastName}}" />
                </div>
                <div>
                    <span>Age</span>
                    <input value="{{person.age}}" />
                </div>
            </div>
            <div>
                <button on-click="setNameToJeff">Set Name To Jeff</button>
            </div>`;
    }

    static get is() {
        return 'my-form'
    }
}

customElements.define(MyForm.is, MyForm);
