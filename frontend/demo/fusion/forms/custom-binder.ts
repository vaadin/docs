import {
  AbstractModel,
  Binder,
  BinderConfiguration,
  FieldStrategy,
  ModelConstructor,
} from '@vaadin/form';
import { CustomFieldStrategy } from './custom-field-strategy';

export class CustomBinder<T, M extends AbstractModel<T>> extends Binder<T, M> {
  constructor(context: any, model: ModelConstructor<T, M>, config?: BinderConfiguration<T>) {
    super(context, model, config);
  }

  getFieldStrategy(element: any): FieldStrategy {
    if (element.localName === 'custom-text-field') {
      return new CustomFieldStrategy(element);
    }
    return super.getFieldStrategy(element);
  }
}
