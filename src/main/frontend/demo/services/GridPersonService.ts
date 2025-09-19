import { getPeople } from 'Frontend/demo/domain/DataService';
import { CrudMockService } from 'Frontend/demo/services/CrudService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import type OrFilter from 'Frontend/generated/com/vaadin/hilla/crud/filter/OrFilter';
import Matcher from 'Frontend/generated/com/vaadin/hilla/crud/filter/PropertyStringFilter/Matcher';
import type Pageable from 'Frontend/generated/com/vaadin/hilla/mappedtypes/Pageable';

interface PersonWithFullName extends Person {
  fullName: string;
}

class GridPersonService {
  private mockService?: CrudMockService<PersonWithFullName>;

  async list(pageable: Pageable, searchTerm: string): Promise<PersonWithFullName[]> {
    await this.initMockService();

    return this.mockService!.list(pageable, this.createFilter(searchTerm));
  }

  private createFilter(searchTerm: string): OrFilter {
    return {
      '@type': 'or',
      children: [
        {
          '@type': 'propertyString',
          propertyId: 'fullName',
          filterValue: searchTerm,
          matcher: Matcher.CONTAINS,
        },
        {
          '@type': 'propertyString',
          propertyId: 'profession',
          filterValue: searchTerm,
          matcher: Matcher.CONTAINS,
        },
      ],
    };
  }

  private async initMockService() {
    if (this.mockService) {
      return;
    }
    const data = (await getPeople()).people.map((person) => ({
      ...person,
      fullName: `${person.firstName} ${person.lastName}`,
    }));
    this.mockService = new CrudMockService(data);
  }
}

export default new GridPersonService();
