import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/combo-box';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import type {
  ComboBoxDataProviderCallback,
  ComboBoxDataProviderParams,
} from '@vaadin/react-components';
import type Country from 'Frontend/generated/com/vaadin/demo/domain/Country';
import { ComboBoxCountryService } from 'Frontend/generated/endpoints';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('combo-box-lazy-loading')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  // tag::snippet[]
  async dataProvider(
    params: ComboBoxDataProviderParams,
    callback: ComboBoxDataProviderCallback<Country>
  ) {
    // Convert the params to Spring Data Pageable
    const filter = params.filter;
    const pageable = {
      pageNumber: params.page,
      pageSize: params.pageSize,
      sort: { orders: [] },
    };
    // Call backend service with pageable and current combo box filter
    const pageItems = await ComboBoxCountryService.list(pageable, filter);

    // Estimate the total count of filtered items
    let filteredCount;
    if (pageItems.length === params.pageSize) {
      filteredCount = (params.page + 1) * params.pageSize + 1;
    } else {
      filteredCount = params.page * params.pageSize + pageItems.length;
    }

    callback(pageItems, filteredCount);
  }

  protected override render() {
    return html`
      <vaadin-combo-box
        .dataProvider="${this.dataProvider}"
        label="Country"
        item-label-path="name"
        item-value-path="id"
      ></vaadin-combo-box>
    `;
  }
  // end::snippet[]
}
