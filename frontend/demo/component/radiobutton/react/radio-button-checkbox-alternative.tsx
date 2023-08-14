import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line

import React from 'react';
import { Checkbox } from '@hilla/react-components/Checkbox.js';
import { RadioGroup } from '@hilla/react-components/RadioGroup.js';
import { VerticalLayout } from '@hilla/react-components/VerticalLayout.js';
import { RadioButton } from '@hilla/react-components/RadioButton.js';

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
