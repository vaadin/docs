import { Breadcrumb } from '@vaadin/react-components/Breadcrumb.js';
import { BreadcrumbItem } from '@vaadin/react-components/BreadcrumbItem.js';
import { Icon } from '@vaadin/react-components/Icon.js';
import '@vaadin/icons';

export default function Example() {
  return (
    // tag::snippet[]
    <Breadcrumb>
      <BreadcrumbItem href="/">
        <Icon icon="vaadin:home" slot="prefix" />
        Home
      </BreadcrumbItem>
      <BreadcrumbItem href="/docs">
        <Icon icon="vaadin:book" slot="prefix" />
        Documentation
      </BreadcrumbItem>
      <BreadcrumbItem>
        <Icon icon="vaadin:cube" slot="prefix" />
        Components
      </BreadcrumbItem>
    </Breadcrumb>
    // end::snippet[]
  );
}