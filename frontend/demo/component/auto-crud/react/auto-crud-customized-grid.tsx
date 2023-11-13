import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react'; // hidden-source-line
import { autoGridHostStyles } from 'Frontend/demo/component/auto-grid/react/auto-grid-host-styles'; // hidden-source-line
import { ExperimentalAutoCrud as AutoCrud } from '@hilla/react-crud';
import { EmployeeService } from 'Frontend/generated/endpoints';
import EmployeeModel from 'Frontend/generated/com/vaadin/demo/fusion/crud/EmployeeModel';
import Employee from 'Frontend/generated/com/vaadin/demo/fusion/crud/Employee';

function Example() {
  // tag::snippet[]
  function ActiveRenderer({ item }: { item: Employee }) {
    const { active } = item;
    const color = active ? 'green' : 'red';
    return <span style={{ fontWeight: 'bold', color }}>{active ? 'Yes' : 'No'}</span>;
  }

  return (
    <AutoCrud
      service={EmployeeService}
      model={EmployeeModel}
      gridProps={{
        visibleColumns: ['firstName', 'lastName', 'active', 'version'],
        columnOptions: {
          firstName: { header: 'Name' },
          active: { renderer: ActiveRenderer },
        },
      }}
    />
  );
  // end::snippet[]
}

export default reactExample(Example, autoGridHostStyles); // hidden-source-line
