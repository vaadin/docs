import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react'; // hidden-source-line
// tag::snippet[]
import { ExperimentalAutoCrud as AutoCrud } from '@hilla/react-crud';
// tag::apply-backend[]
import { EmployeeService } from 'Frontend/generated/endpoints';
import EmployeeModel from 'Frontend/generated/com/vaadin/demo/fusion/crud/EmployeeModel';
import Employee from 'Frontend/generated/com/vaadin/demo/fusion/crud/Employee';

function ActiveRenderer({ item }: { item: Employee }) {
  const { active } = item;
  const color = active ? 'red' : 'green';
  return <span style={{ fontWeight: 'bold', color }}>{active}</span>;
}

function Example() {
  return (
    <AutoCrud
      service={EmployeeService}
      model={EmployeeModel}
      gridProps={{
        visibleColumns: ['firstName', 'lastName', 'active'],
        columnOptions: { firstName: { header: 'Name' }, active: { renderer: ActiveRenderer } },
      }}
    />
  );
}
// end::apply-backend[]
// end::snippet[]

export default reactExample(Example); // hidden-source-line
