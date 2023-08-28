// tag::snippet[]
import type { FieldStrategy } from '@hilla/form';
import type { MyTextField } from './my-text-field';

export class MyTextFieldStrategy implements FieldStrategy {
  public element: MyTextField;

  public constructor(element: MyTextField) {
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

  public get validity() {
    return new ValidityState();
  }

  public checkValidity() {
    return true;
  }

  public removeEventListeners() {}
  // tag::snippet[]
}
// end::snippet[]
