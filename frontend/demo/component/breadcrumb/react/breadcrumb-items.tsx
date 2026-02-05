import { Breadcrumb } from '@vaadin/react-components/Breadcrumb.js';
import { BreadcrumbItem } from '@vaadin/react-components/BreadcrumbItem.js';

export default function Example() {
  return (
    // tag::snippet[]
    <Breadcrumb>
      <BreadcrumbItem>Dashboard</BreadcrumbItem>
      <BreadcrumbItem>Reports</BreadcrumbItem>
      <BreadcrumbItem>Monthly</BreadcrumbItem>
      <BreadcrumbItem>2024</BreadcrumbItem>
      <BreadcrumbItem>January</BreadcrumbItem>
    </Breadcrumb>
    // end::snippet[]
  );
}