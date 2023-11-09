import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react'; // hidden-source-line
import { autoGridHostStyles } from 'Frontend/demo/component/auto-grid/react/auto-grid-host-styles'; // hidden-source-line
// tag::snippet[]
import { ExperimentalAutoCrud as AutoCrud } from '@hilla/react-crud';
// tag::apply-backend[]
import { EmployeeService } from 'Frontend/generated/endpoints';
import EmployeeModel from 'Frontend/generated/com/vaadin/demo/fusion/crud/EmployeeModel';
import { TextArea } from '@hilla/react-components/TextArea';

function Example() {
  return (
    <AutoCrud
      service={EmployeeService}
      model={EmployeeModel}
      formProps={{
        fieldOptions: {
          firstName: { label: 'Name' },
          description: {
            renderer: ({ field }) => (
              <TextArea key={field.name} {...field} label="Full description" />
            ),
          },
        },
      }}
    />
  );
}
// end::apply-backend[]
// end::snippet[]

export default reactExample(Example, autoGridHostStyles); // hidden-source-line
