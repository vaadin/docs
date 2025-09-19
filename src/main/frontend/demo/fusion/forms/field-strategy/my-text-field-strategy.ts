// tag::snippet[]
import type { FieldStrategy } from '@vaadin/hilla-lit-form';
import type { MyTextField } from './my-text-field';

export class MyTextFieldStrategy implements FieldStrategy {
  element: MyTextField;

  constructor(element: MyTextField) {
    this.element = element;
  }

  set required(required: boolean) {
    this.element.mandatory = required;
  }

  set invalid(invalid: boolean) {
    this.element.hasError = invalid;
  }

  set errorMessage(errorMessage: string) {
    this.element.error = errorMessage;
  }

  // ...
  // end::snippet[]
  validate = async () => [];

  get value() {
    return this.element.value;
  }

  set value(value) {
    this.element.value = value;
  }

  setAttribute(key: string, val: unknown) {
    if (val) {
      this.element.setAttribute(key, '');
    } else {
      this.element.removeAttribute(key);
    }
  }

  get validity() {
    return new ValidityState();
  }

  checkValidity() {
    return true;
  }

  removeEventListeners() {}
  // tag::snippet[]
}
// end::snippet[]
