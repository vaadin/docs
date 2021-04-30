import { AbstractFieldStrategy } from '@vaadin/form';

export class CustomFieldStrategy extends AbstractFieldStrategy {
  set required(required: boolean) {
    this.element.required = required;
  }

  set invalid(invalid: boolean) {
    this.element.invalid = invalid;
  }

  set errorMessage(errorMessage: string) {
    this.element.errorMessage = errorMessage;
  }
}
