import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react'; // hidden-source-line
// tag::snippet[]
import { ExperimentalAutoForm as AutoForm } from '@hilla/react-crud';
// tag::apply-backend[]
import { EmployeeService } from 'Frontend/generated/endpoints';
import ProductModel from 'Frontend/generated/com/vaadin/demo/fusion/crud/ProductModel';

function Example() {
  return <AutoForm service={EmployeeService} model={ProductModel}
                               customLayoutRenderer={{
                                 template: [
                                   ['firstName', 'lastName', 'gender'],
                                   ['dateOfBirth', 'email'],
                                   ['startDate', 'endDate', 'active'],
                                   ['team', 'manager'],
                                   ['description']
                                ],
                              }}
        />;
}
// end::apply-backend[]
// end::snippet[]

export default reactExample(Example); // hidden-source-line
