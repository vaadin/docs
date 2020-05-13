// tutorial::polymer-templates/tutorial-template-bindings.asciidoc
import {PolymerElement,html} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-radio-button/paper-radio-button.js';
import '@polymer/paper-radio-group/paper-radio-group.js';
import '@polymer/paper-checkbox/paper-checkbox.js';

class TwoWayBinding extends PolymerElement {

    static get template() {
        return html`
            <table>
                <tr>
                    <td>Paper name:</td>
                    <td>
                        <paper-input value="{{name}}"></paper-input>
                    </td>
                </tr>
                <tr>
                    <td>Input name:</td>
                    <td>
                        <input value="{{name::input}}">
                    </td>
                </tr>
                <tr>
                    <td>Change name:</td>
                    <td>
                        <input value="{{name::change}}">
                    </td>
                </tr>
                <tr>
                    <td>Input accepted:</td>
                    <td>
                        <input type="checkbox" checked="{{accepted::change}}">
                    </td>
                </tr>
                <tr>
                    <td>Polymer accepted:</td>
                    <td>
                        <paper-checkbox checked="{{accepted}}"></paper-checkbox>
                    </td>
                </tr>
                <tr>
                    <td>Size:</td>
                    <td>
                        <paper-radio-group selected="{{size}}">
                            <paper-radio-button name="small">Small</paper-radio-button>
                            <paper-radio-button name="medium">Medium</paper-radio-button>
                            <paper-radio-button name="large">Large</paper-radio-button>
                        </paper-radio-group>
                    </td>
                </tr>
                <tr>
                    <td>Size:</td>
                    <td>
                        <select value="{{size::change}}">
                            <option value="small">Small</option>
                            <option value="medium">Medium</option>
                            <option value="large">Large</option>
                        </select>
                    </td>
                </tr>
            </table>
            <div>
                <button on-click="reset">Reset values</button>
            </div>
            <slot></slot>`;
    }

    static get is() {
        return 'two-way-template';
    }
}
customElements.define(TwoWayBinding.is, TwoWayBinding);
