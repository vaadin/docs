import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import { HorizontalLayout } from '@vaadin/react-components';
import layoutExampleStyle from './layoutExampleStyle'; // hidden-source-line

function Example() {
  return (
    <>
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
    </>
  );
}

export default reactExample(Example, layoutExampleStyle); // hidden-source-line
