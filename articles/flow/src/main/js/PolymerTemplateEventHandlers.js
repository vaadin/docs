// tutorial::polymer-templates/tutorial-template-event-handlers.asciidoc
import {PolymerElement,html} from '@polymer/polymer/polymer-element.js';

class EventhandlerDemo extends PolymerElement {
    static get template() {
        return html`<button on-click="handleClick">Say hello</button>`;
    }

    static get is() {return 'eventhandler-demo'}

    handleClick() {
      console.log('Button was clicked.');
      window.alert('Hello');
    }
}
customElements.define(XCustom.is, XCustom);


class EventHandler extends PolymerElement {
    static get template() {
        return html`<button on-click="handleClick">Click me</button>`;
    }
    static get is() { return 'event-handler' }
}
customElements.define(EventHandler.is, EventHandler);


class ModelItemHandler extends PolymerElement {
    static get template() {
        return html`
            <dom-repeat items="[[messages]]">
                <template><div class='msg' on-click="handleClick">[[item.text]]</div></template>
            </dom-repeat>`;
    }
    static get is() { return 'model-item-handler' }
}
customElements.define(ModelItemHandler.is, ModelItemHandler);


class ContactHandler extends PolymerElement {

    static get template() {
        return html`
            <input id="name" type="text">
            <button on-click="onClick">Send the contact</button>`;
    }

    static get is() { return 'contact-handler' }

    onClick(event) {
        this.userInfo.name = this.$.name.value;
        event.detail = {
            userInfo: this.userInfo,
        };
    }
}
customElements.define(ContactHandler.is, ContactHandler);

class MyComponent extends PolymerElement {

    static get template() {
        return html`
            <div>
                <div>[[text]]</div>
            </div>`;
    }

    static get is() {
          return 'my-component';
    }

    afterServerUpdate(){
        console.log("The new 'text' value is: "+this.text);
    }
}

customElements.define(MyComponent.is, MyComponent);