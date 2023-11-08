import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react'; // hidden-source-line
import { ExperimentalAutoForm as AutoForm } from '@hilla/react-crud';
// tag::apply-backend[]
import { EmployeeService } from 'Frontend/generated/endpoints.js';
import EmployeeModel from 'Frontend/generated/com/vaadin/demo/fusion/crud/EmployeeModel';

function Example() {
  return (
    // tag::snippet[]
    <AutoForm
      service={EmployeeService}
      model={EmployeeModel}
      customLayoutRenderer={{
        template: [
          [
            { property: 'firstName', colSpan: 1 },
            { property: 'lastName', colSpan: 1 },
            { property: 'gender', colSpan: 1 },
          ],
          [
            { property: 'dateOfBirth', colSpan: 1 },
            { property: 'email', colSpan: 2 },
          ],
          [
            { property: 'startDate', colSpan: 1 },
            { property: 'endDate', colSpan: 1 },
            { property: 'active', colSpan: 1 },
          ],
          [
            { property: 'team', colSpan: 2 },
            { property: 'manager', colSpan: 1 },
          ],
          [{ property: 'description', colSpan: 3 }],
        ],
        responsiveSteps: [
          { minWidth: '0', columns: 1 },
          { minWidth: '800px', columns: 3 },
        ],
      }}
    />
    // end::snippet[]
  );
}
// end::apply-backend[]

export default reactExample(Example); // hidden-source-line
