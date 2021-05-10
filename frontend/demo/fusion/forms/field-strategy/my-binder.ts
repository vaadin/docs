import { Binder } from '@vaadin/form';
import type { AbstractModel, FieldStrategy, ModelConstructor } from '@vaadin/form';
import { MyTextFieldStrategy } from './my-text-field-strategy';

export class MyBinder<T, M extends AbstractModel<T>> extends Binder<T, M> {
  constructor(context: Element, model: ModelConstructor<T, M>) {
    super(context, model);
  }

  getFieldStrategy(element: any): FieldStrategy {
    if (element.localName === 'my-text-field') {
      return new MyTextFieldStrategy(element);
    }
    return super.getFieldStrategy(element);
  }
}
