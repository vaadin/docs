import { Binder, StringModel } from '@hilla/form';
import type { AbstractModel, DetachedModelConstructor, FieldStrategy } from '@hilla/form';
import { MyTextFieldStrategy } from './my-text-field-strategy';

export class MyBinder<M extends AbstractModel> extends Binder<M> {
  constructor(context: Element, model: DetachedModelConstructor<M>) {
    super(context, model);
  }

  override getFieldStrategy(element: any, model?: AbstractModel): FieldStrategy {
    if (element.localName === 'my-text-field' && model instanceof StringModel) {
      return new MyTextFieldStrategy(element);
    }
    return super.getFieldStrategy(element);
  }
}
