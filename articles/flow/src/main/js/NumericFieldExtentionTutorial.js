// tutorial::creating-components/tutorial-extending-component.asciidoc
import {html} from
        '@polymer/polymer/lib/utils/html-tag.js';
import {TextFieldElement} from
        '@vaadin/vaadin-text-field/src/vaadin-text-field.js';

let memoizedTemplate;

class NumberFieldElement extends TextFieldElement {

    static get template() {
        if (!memoizedTemplate) {
            const superTemplate = super.template
                    .cloneNode(true);
            const inputField = superTemplate.content
                .querySelector('[part="input-field"]');
            const prefixSlot = superTemplate.content
                .querySelector('[name="prefix"]');
            const decreaseButton = html`<div 
part="decrease-button" 
on-click="_decreaseValue"></div>`;
            const increaseButton = html`<div 
part="increase-button" 
on-click="_increaseValue"></div>`;
            inputField.insertBefore(
                decreaseButton.content, prefixSlot);
            inputField.appendChild(
                increaseButton.content);
            memoizedTemplate = html`<style>
                 [part="decrease-button"]::before {
                   content: "−";
                 }

                 [part="increase-button"]::before {
                   content: "+";
                 }
               </style>
               ${superTemplate}`;
        }
        return memoizedTemplate;
    }

    static get is() {
        return 'vaadin-number-field';
    }

    static get properties() {
        return {
            decrementValue: {
              type: Number,
              value: -1,
              reflectToAttribue: true,
              observer: '_decrementChanged'
            },
            incrementValue: {
              type: Number,
              value: 1,
              reflectToAttribue: true,
              observer: '_incrementChanged'
            }

            // Note: the value is stored in the
            // TF's value property.
        };
    }

    _decreaseValue() {
        this.__add(this.decrementValue);
    }

    _increaseValue() {
        this.__add(this.incrementValue);
    }

    __add(value) {
        this.value = parseInt(this.value, 10) + value;
        this.dispatchEvent(
            new CustomEvent('change', {bubbles: true}));
    }

    _valueChanged(newVal, oldVal) {
        this.value = this.focusElement.value;
        super._valueChanged(this.value, oldVal);
    }

    /* ... */
}
