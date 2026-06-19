import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Breadcrumbs } from '@vaadin/react-components/Breadcrumbs.js';
import { BreadcrumbsItem } from '@vaadin/react-components/BreadcrumbsItem.js';

function Example() {
  return (
    // tag::snippet[]
    <Breadcrumbs style={{ width: '300px' }}>
      <BreadcrumbsItem path="/">Home</BreadcrumbsItem>
      <BreadcrumbsItem path="/catalog">Catalog</BreadcrumbsItem>
      <BreadcrumbsItem path="/catalog/electronics">Electronics</BreadcrumbsItem>
      <BreadcrumbsItem path="/catalog/electronics/computers">Computers</BreadcrumbsItem>
      <BreadcrumbsItem path="/catalog/electronics/computers/laptops">Laptops</BreadcrumbsItem>
      <BreadcrumbsItem>Model X1</BreadcrumbsItem>
    </Breadcrumbs>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
