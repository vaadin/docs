import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import { Tooltip } from '@vaadin/react-components/Tooltip.js';

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      <h2 id="heading">Heading with tooltip</h2>
      <Tooltip for="heading" text="This is a tooltip" position="top-start" />
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example); // hidden-source-line
