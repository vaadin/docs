// tag::snippet[]
import type { FieldStrategy } from '@vaadin/form';
import type { MyTextField } from './my-text-field';

export class MyTextFieldStrategy implements FieldStrategy {
  constructor(public element: MyTextField) {}

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

  setAttribute(key: string, val: any) {
    if (val) {
      this.element.setAttribute(key, '');
    } else {
      this.element.removeAttribute(key);
    }
  }

  // tag::snippet[]
}
// end::snippet[]
