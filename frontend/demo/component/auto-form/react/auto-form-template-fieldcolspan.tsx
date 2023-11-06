import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react'; // hidden-source-line
import { ExperimentalAutoForm as AutoForm } from '@hilla/react-crud';
// tag::apply-backend[]
import { EmployeeService } from 'Frontend/generated/endpoints';
import EmployeeModel from 'Frontend/generated/com/vaadin/demo/fusion/crud/form/EmployeeModel';

function Example() {
  return (
    // tag::snippet[]
    <AutoForm
      service={EmployeeService}
      model={EmployeeModel}
      customLayoutRenderer={{
        template: [
          [
            { property: 'firstName', colSpan: 2 },
            { property: 'lastName', colSpan: 2 },
            { property: 'gender', colSpan: 2 },
          ],
          [
            { property: 'dateOfBirth', colSpan: 2 },
            { property: 'email', colSpan: 4 },
          ],
          [
            { property: 'startDate', colSpan: 2 },
            { property: 'endDate', colSpan: 2 },
            { property: 'active', colSpan: 2 },
          ],
          [
            { property: 'team', colSpan: 4 },
            { property: 'manager', colSpan: 2 },
          ],
          [{ property: 'description', colSpan: 6 }],
        ],
      }}
    />
    // end::snippet[]
  );
}
// end::apply-backend[]

export default reactExample(Example); // hidden-source-line
