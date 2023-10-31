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
                                   [
                                     { property: 'description', colSpan: 3 },
                                   ],
                                ],
                                 responsiveSteps: [
                                   { minWidth: '0', columns: 1 },
                                   { minWidth: '800px', columns: 3 }
                                 ],
                              }}
        />;
}
// end::apply-backend[]
// end::snippet[]

export default reactExample(Example); // hidden-source-line
