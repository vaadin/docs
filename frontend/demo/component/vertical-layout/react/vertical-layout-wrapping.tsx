import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import { HorizontalLayout, VerticalLayout } from '@vaadin/react-components';

function Example() {
  return (
    <div className="basic-layouts-example">
      <HorizontalLayout theme="spacing margin" style={{ border: 0 }}>
        <div style={{ width: '100%' }}>
          <p>Vertical layout without wrapping:</p>
          <VerticalLayout
            theme="spacing padding"
            style={{ alignItems: 'stretch', height: '200px' }}
          >
            <div className="example-item">Item 1</div>
            <div className="example-item">Item 2</div>
            <div className="example-item">Item 3</div>
            <div className="example-item">Item 4</div>
          </VerticalLayout>
        </div>
        <div style={{ width: '100%' }}>
          <p>Vertical layout with wrapping:</p>
          {/* tag::snippet[] */}
          <VerticalLayout
            theme="wrap spacing padding"
            style={{ alignItems: 'stretch', height: '200px' }}
          >
            {/* end::snippet[] */}
            <div className="example-item">Item 1</div>
            <div className="example-item">Item 2</div>
            <div className="example-item">Item 3</div>
            <div className="example-item">Item 4</div>
            {/* tag::snippet[] */}
          </VerticalLayout>
          {/* end::snippet[] */}
        </div>
      </HorizontalLayout>
    </div>
  );
}

export default reactExample(Example); // hidden-source-line
