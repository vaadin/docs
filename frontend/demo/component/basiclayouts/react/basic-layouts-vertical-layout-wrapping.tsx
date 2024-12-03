import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import { Button, HorizontalLayout, VerticalLayout } from '@vaadin/react-components';
import layoutExampleStyle from './layoutExampleStyle'; // hidden-source-line

function Example() {
  return (
    <HorizontalLayout theme="spacing margin" style={{ border: 0 }}>
      <div style={{ width: '100%' }}>
        <p>Vertical layout without wrapping:</p>
        <VerticalLayout theme="spacing padding" style={{ alignItems: 'stretch', height: '200px' }}>
          <Button>Button 1</Button>
          <Button>Button 2</Button>
          <Button>Button 3</Button>
          <Button>Button 4</Button>
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
          <Button>Button 1</Button>
          <Button>Button 2</Button>
          <Button>Button 3</Button>
          <Button>Button 4</Button>
          {/* tag::snippet[] */}
        </VerticalLayout>
        {/* end::snippet[] */}
      </div>
    </HorizontalLayout>
  );
}

export default reactExample(Example, layoutExampleStyle); // hidden-source-line
