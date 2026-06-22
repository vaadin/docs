import '@vaadin/icons';
import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect, useRef } from 'react';
import { Breadcrumbs, type BreadcrumbsElement } from '@vaadin/react-components/Breadcrumbs.js';
import { BreadcrumbsItem } from '@vaadin/react-components/BreadcrumbsItem.js';
import { Icon } from '@vaadin/react-components/Icon.js';
import { patchBreadcrumbsNavigation } from 'Frontend/demo/component/breadcrumbs/breadcrumbs-helper'; // hidden-source-line

function Example() {
  const breadcrumbsRef = useRef<BreadcrumbsElement>(null);

  useEffect(() => {
    if (breadcrumbsRef.current) {
      // Example-specific workaround
      patchBreadcrumbsNavigation(breadcrumbsRef.current);
    }
  }, [breadcrumbsRef.current]);

  return (
    // tag::snippet[]
    <Breadcrumbs ref={breadcrumbsRef}>
      <BreadcrumbsItem path="/">
        <Icon icon="vaadin:home" slot="prefix" />
        Home
      </BreadcrumbsItem>
      <BreadcrumbsItem path="/orders">
        <Icon icon="vaadin:package" slot="prefix" />
        Orders
      </BreadcrumbsItem>
      <BreadcrumbsItem>Order Details</BreadcrumbsItem>
    </Breadcrumbs>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
