import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Breadcrumbs } from '@vaadin/react-components/Breadcrumbs.js';
import { BreadcrumbsItem } from '@vaadin/react-components/BreadcrumbsItem.js';
import { patchBreadcrumbsNavigation } from 'Frontend/demo/component/breadcrumbs/breadcrumbs-helper'; // hidden-source-line

function Example() {
  return (
    // tag::snippet[]
    <Breadcrumbs
      style={{ width: '300px' }}
      ref={patchBreadcrumbsNavigation} // hidden-source-line
    >
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
