import { reactExample } from 'Frontend/demo/react-example';
import { NumberField } from '@hilla/react-components/NumberField.js';

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      <NumberField label="Duration (hours)" step={0.5} value={12.5} stepButtonsVisible />
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example);
