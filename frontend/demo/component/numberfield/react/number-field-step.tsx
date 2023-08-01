import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import { NumberField } from '@hilla/react-components/NumberField.js';

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      <NumberField label="Duration (hours)" step={0.5} value="12.5" stepButtonsVisible />
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example); // hidden-source-line
