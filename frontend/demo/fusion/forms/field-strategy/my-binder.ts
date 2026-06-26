import type {
  FieldStrategy,
  ProvisionalModel,
  ProvisionalModelConstructor,
} from '@vaadin/hilla-lit-form';
import { Binder, StringModel } from '@vaadin/hilla-lit-form';
import { MyTextFieldStrategy } from './my-text-field-strategy';

export class MyBinder<M extends ProvisionalModel> extends Binder<M> {
  constructor(context: Element, model: ProvisionalModelConstructor<M>) {
    super(context, model);
  }

  override getFieldStrategy(element: any, model?: ProvisionalModel): FieldStrategy {
    if (element.localName === 'my-text-field' && model instanceof StringModel) {
      return new MyTextFieldStrategy(element);
    }
    return super.getFieldStrategy(element);
  }
}
