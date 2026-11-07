import type { FieldStrategy } from '@vaadin/hilla-lit-form';
import { Binder } from '@vaadin/hilla-lit-form';
import { type Model, StringModel } from '@vaadin/hilla-models';
import { MyTextFieldStrategy } from './my-text-field-strategy';

export class MyBinder<M extends Model> extends Binder<M> {
  override getFieldStrategy<TField>(element: any, model?: Model<TField>): FieldStrategy {
    if (element.localName === 'my-text-field' && model instanceof StringModel) {
      return new MyTextFieldStrategy(element);
    }
    return super.getFieldStrategy(element);
  }
}
