import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react'; // hidden-source-line
import { autoGridHostStyles } from 'Frontend/demo/component/auto-grid/react/auto-grid-host-styles'; // hidden-source-line
import {
  type AutoFormLayoutRendererProps,
  ExperimentalAutoForm as AutoForm,
} from '@hilla/react-crud';
import { EmployeeService } from 'Frontend/generated/endpoints.js';
import EmployeeModel from 'Frontend/generated/com/vaadin/demo/fusion/crud/EmployeeModel';
import { VerticalLayout } from '@hilla/react-components/VerticalLayout.js';
import { HorizontalLayout } from '@hilla/react-components/HorizontalLayout.js';

// tag::snippet[]
function GroupingLayoutRenderer({ children, form }: AutoFormLayoutRendererProps<EmployeeModel>) {
  const fieldsMapping = new Map<string, JSX.Element>();
  children.forEach((field) => fieldsMapping.set(field.props?.propertyInfo?.name, field));
  return (
    <VerticalLayout>
      <h4>Personal Information:</h4>
      <HorizontalLayout theme="spacing" className="pb-l">
        {fieldsMapping.get('firstName')}
        {fieldsMapping.get('lastName')}
        {fieldsMapping.get('gender')}
      </HorizontalLayout>
      <h4>Employment Information:</h4>
      <HorizontalLayout theme="spacing" className="pb-l items-baseline">
        {fieldsMapping.get('startDate')}
        {fieldsMapping.get('shiftStartsAt')}
        {fieldsMapping.get('active')}
      </HorizontalLayout>
      <h4>Other:</h4>
      <HorizontalLayout theme="spacing">
        {fieldsMapping.get('description')}
      </HorizontalLayout>
    </VerticalLayout>
  );
}
// end::snippet[]

function Example() {
  return (
    // tag::snippet[]
    <AutoForm
      service={EmployeeService}
      model={EmployeeModel}
      layoutRenderer={GroupingLayoutRenderer}
    />
    // end::snippet[]
  );
}

export default reactExample(Example, autoGridHostStyles); // hidden-source-line
