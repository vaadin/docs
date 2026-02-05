import { Breadcrumb } from '@vaadin/react-components/Breadcrumb.js';
import { BreadcrumbItem } from '@vaadin/react-components/BreadcrumbItem.js';

export default function Example() {
  return (
    // tag::snippet[]
    <Breadcrumb>
      <BreadcrumbItem href="/">Home</BreadcrumbItem>
      <BreadcrumbItem href="/products">Products</BreadcrumbItem>
      <BreadcrumbItem href="/products/electronics">Electronics</BreadcrumbItem>
      <BreadcrumbItem>Laptop Pro X1</BreadcrumbItem>
    </Breadcrumb>
    // end::snippet[]
  );
}