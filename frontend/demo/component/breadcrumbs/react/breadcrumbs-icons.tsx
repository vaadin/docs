import '@vaadin/icons';
import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Breadcrumbs } from '@vaadin/react-components/Breadcrumbs.js';
import { BreadcrumbsItem } from '@vaadin/react-components/BreadcrumbsItem.js';
import { Icon } from '@vaadin/react-components/Icon.js';

function Example() {
  return (
    // tag::snippet[]
    <Breadcrumbs>
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
