import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Checkbox } from '@vaadin/react-components/Checkbox.js';
import { RadioButton } from '@vaadin/react-components/RadioButton.js';
import { RadioGroup } from '@vaadin/react-components/RadioGroup.js';
import { VerticalLayout } from '@vaadin/react-components/VerticalLayout.js';

function Example() {
  return (
    <VerticalLayout>
      {/* tag::snippet[] */}
      <Checkbox checked>
        <label slot="label">Reply All by default (unchecked state not clear)</label>
      </Checkbox>
      <RadioGroup label="Default reply behavior" value="Reply">
        <RadioButton label="Reply" checked value="Reply" />
        <RadioButton label="Reply to all" value="Reply to all" />
      </RadioGroup>
      {/* end::snippet[] */}
    </VerticalLayout>
  );
}

export default reactExample(Example); // hidden-source-line
