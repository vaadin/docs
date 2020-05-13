// tutorial::polymer-templates/tutorial-template-list-bindings.asciidoc
import {PolymerElement,html} from '@polymer/polymer/polymer-element.js';

class EmployeesList extends PolymerElement {
    static get template() {
        return html`
            <table>
                <tr on-click="processElement">
                    <th>Name</th><th>Title</th><th>Email</th>
                </tr>
                <dom-repeat items="[[employees]]">
                    <template>
                        <tr on-click="handleClick" id="[[item.name]]">
                            <td>{{item.name}}</td>
                            <td>{{item.title}}</td>
                            <td>{{item.email}}</td>
                        </tr>
                    </template>
                </dom-repeat>
            </table>`;
    }

    static get is() {return 'employees-list'}
}
customElements.define(EmployeesList.is, EmployeesList);


class MyTemplate extends PolymerElement {
    static get properties() {
        return {
            messages: {
                type: Array,
                value: [],
                notify: true
            }
        };
    }
    addItem() {
        this.push('messages', 'foo');
    }
}
