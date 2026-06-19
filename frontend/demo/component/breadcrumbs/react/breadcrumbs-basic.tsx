import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Breadcrumbs } from '@vaadin/react-components/Breadcrumbs.js';
import { BreadcrumbsItem } from '@vaadin/react-components/BreadcrumbsItem.js';

function Example() {
  return (
    // tag::snippet[]
    <Breadcrumbs>
      <BreadcrumbsItem path="/">Home</BreadcrumbsItem>
      <BreadcrumbsItem path="/components">Components</BreadcrumbsItem>
      <BreadcrumbsItem>Breadcrumbs</BreadcrumbsItem>
    </Breadcrumbs>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
