import { Breadcrumb } from '@vaadin/react-components/Breadcrumb.js';
import { BreadcrumbItem } from '@vaadin/react-components/BreadcrumbItem.js';

export default function Example() {
  return (
    // tag::snippet[]
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--lumo-space-m)' }}>
      <Breadcrumb theme="small">
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href="/docs">Documentation</BreadcrumbItem>
        <BreadcrumbItem>Components</BreadcrumbItem>
      </Breadcrumb>

      <Breadcrumb>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href="/docs">Documentation</BreadcrumbItem>
        <BreadcrumbItem>Components</BreadcrumbItem>
      </Breadcrumb>

      <Breadcrumb theme="large">
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href="/docs">Documentation</BreadcrumbItem>
        <BreadcrumbItem>Components</BreadcrumbItem>
      </Breadcrumb>
    </div>
    // end::snippet[]
  );
}