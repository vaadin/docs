import { Breadcrumb } from '@vaadin/react-components/Breadcrumb.js';
import { BreadcrumbItem } from '@vaadin/react-components/BreadcrumbItem.js';

export default function Example() {
  return (
    // tag::snippet[]
    <Breadcrumb>
      <BreadcrumbItem>Home</BreadcrumbItem>
      <BreadcrumbItem>Products</BreadcrumbItem>
      <BreadcrumbItem>Electronics</BreadcrumbItem>
      <BreadcrumbItem>Laptops</BreadcrumbItem>
    </Breadcrumb>
    // end::snippet[]
  );
}