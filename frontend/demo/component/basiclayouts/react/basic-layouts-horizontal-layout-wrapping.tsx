import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import { Button, HorizontalLayout } from '@vaadin/react-components';
import layoutExampleStyle from './layoutExampleStyle'; // hidden-source-line

function Example() {
  return (
    <>
      <HorizontalLayout
        theme="spacing margin padding"
        style={{ alignItems: 'stretch', width: '350px' }}
      >
        <Button>Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
        <Button>Button 4</Button>
        <Button>Button 5</Button>
      </HorizontalLayout>
      {/* tag::snippet[] */}
      <HorizontalLayout
        theme="wrap spacing margin padding"
        style={{ alignItems: 'stretch', width: '350px' }}
      >
        {/* end::snippet[] */}
        <Button>Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
        <Button>Button 4</Button>
        <Button>Button 5</Button>
        {/* tag::snippet[] */}
      </HorizontalLayout>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example, layoutExampleStyle); // hidden-source-line
