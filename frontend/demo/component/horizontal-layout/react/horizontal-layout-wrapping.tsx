import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import { HorizontalLayout } from '@vaadin/react-components';

function Example() {
  return (
    <div className="basic-layouts-example">
      <p>Horizontal layout without wrapping:</p>
      <HorizontalLayout
        theme="spacing margin padding"
        style={{ alignItems: 'stretch', width: '350px' }}
      >
        <div className="example-item">Item 1</div>
        <div className="example-item">Item 2</div>
        <div className="example-item">Item 3</div>
        <div className="example-item">Item 4</div>
        <div className="example-item">Item 5</div>
      </HorizontalLayout>
      <p>Horizontal layout with wrapping:</p>
      {/* tag::snippet[] */}
      <HorizontalLayout
        theme="wrap spacing margin padding"
        style={{ alignItems: 'stretch', width: '350px' }}
      >
        {/* end::snippet[] */}
        <div className="example-item">Item 1</div>
        <div className="example-item">Item 2</div>
        <div className="example-item">Item 3</div>
        <div className="example-item">Item 4</div>
        <div className="example-item">Item 5</div>
        {/* tag::snippet[] */}
      </HorizontalLayout>
      {/* end::snippet[] */}
    </div>
  );
}

export default reactExample(Example); // hidden-source-line
