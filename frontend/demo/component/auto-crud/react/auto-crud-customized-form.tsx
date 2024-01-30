import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react'; // hidden-source-line
import { autoGridHostStyles } from 'Frontend/demo/component/auto-grid/react/auto-grid-host-styles'; // hidden-source-line
import { AutoCrud } from '@vaadin/hilla-react-crud';
import { EmployeeService } from 'Frontend/generated/endpoints';
import EmployeeModel from 'Frontend/generated/com/vaadin/demo/fusion/crud/EmployeeModel';
import { TextArea } from '@vaadin/react-components/TextArea';

function Example() {
  return (
    // tag::snippet[]
    <AutoCrud
      service={EmployeeService}
      model={EmployeeModel}
      formProps={{
        visibleFields: ['firstName', 'lastName', 'active', 'version', 'description'],
        fieldOptions: {
          firstName: { label: 'Name' },
          description: {
            renderer: ({ field }) => <TextArea {...field} label="Full description" />,
          },
        },
      }}
    />
    // end::snippet[]
  );
}

export default reactExample(Example, autoGridHostStyles); // hidden-source-line
