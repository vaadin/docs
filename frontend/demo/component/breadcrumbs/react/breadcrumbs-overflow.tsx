import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect, useRef } from 'react';
import { Breadcrumbs, type BreadcrumbsElement } from '@vaadin/react-components/Breadcrumbs.js';
import { BreadcrumbsItem } from '@vaadin/react-components/BreadcrumbsItem.js';
import { patchBreadcrumbsNavigation } from 'Frontend/demo/component/breadcrumbs/breadcrumbs-helper'; // hidden-source-line

function Example() {
  const breadcrumbsRef = useRef<BreadcrumbsElement>(null); // hidden-source-line
  useEffect(() => {
    // hidden-source-line
    if (breadcrumbsRef.current) {
      // hidden-source-line
      patchBreadcrumbsNavigation(breadcrumbsRef.current); // hidden-source-line
    } // hidden-source-line
  }, [breadcrumbsRef.current]); // hidden-source-line

  return (
    // tag::snippet[]
    <Breadcrumbs ref={breadcrumbsRef} style={{ width: '300px' }}>
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
