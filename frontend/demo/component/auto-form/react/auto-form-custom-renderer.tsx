import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react'; // hidden-source-line
// tag::snippet[]
import {
  type AutoFormLayoutRendererProps,
  ExperimentalAutoForm as AutoForm,
} from '@hilla/react-crud';
// tag::apply-backend[]
import { EmployeeService } from 'Frontend/generated/endpoints.js';

import EmployeeModel from 'Frontend/generated/com/vaadin/demo/fusion/crud/EmployeeModel';
import { VerticalLayout } from '@hilla/react-components/VerticalLayout.js';

function VerticalLayoutRenderer({ children, form }: AutoFormLayoutRendererProps<EmployeeModel>) {
  return <VerticalLayout>{children}</VerticalLayout>;
}

function Example() {
  return (
    <AutoForm
      service={EmployeeService}
      model={EmployeeModel}
      customLayoutRenderer={VerticalLayoutRenderer}
    />
  );
}
// end::apply-backend[]
// end::snippet[]

export default reactExample(Example); // hidden-source-line
