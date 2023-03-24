import { Binder, StringModel } from '@hilla/form';
import type { AbstractModel, FieldStrategy, ModelConstructor } from '@hilla/form';
import { MyTextFieldStrategy } from './my-text-field-strategy.js';

export class MyBinder<T, M extends AbstractModel<T>> extends Binder<T, M> {
  constructor(context: Element, model: ModelConstructor<T, M>) {
    super(context, model);
  }

  override getFieldStrategy<T>(element: any, model?: AbstractModel<T>): FieldStrategy {
    if (element.localName === 'my-text-field' && model instanceof StringModel) {
      return new MyTextFieldStrategy(element);
    }
    return super.getFieldStrategy(element);
  }
}
