import { getCountries } from 'Frontend/demo/domain/DataService';
import { CrudMockService } from 'Frontend/demo/services/CrudService';
import type Country from 'Frontend/generated/com/vaadin/demo/domain/Country';
import type PropertyStringFilter from 'Frontend/generated/com/vaadin/hilla/crud/filter/PropertyStringFilter';
import Matcher from 'Frontend/generated/com/vaadin/hilla/crud/filter/PropertyStringFilter/Matcher';
import type Pageable from 'Frontend/generated/com/vaadin/hilla/mappedtypes/Pageable';

class ComboBoxCountryService {
  private mockService?: CrudMockService<Country>;

  async list(pageable: Pageable, filter: string): Promise<Country[]> {
    await this.initMockService();

    return this.mockService!.list(pageable, this.createFilter(filter));
  }

  private createFilter(filter: string): PropertyStringFilter {
    return {
      '@type': 'propertyString',
      propertyId: 'name',
      filterValue: filter,
      matcher: Matcher.CONTAINS,
    };
  }

  private async initMockService() {
    if (this.mockService) {
      return;
    }
    const data = await getCountries();
    this.mockService = new CrudMockService(data);
  }
}

export default new ComboBoxCountryService();
