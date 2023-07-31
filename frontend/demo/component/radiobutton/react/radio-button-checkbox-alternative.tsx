import { reactExample } from 'Frontend/demo/react-example';

import React from 'react';
import { Checkbox } from '@hilla/react-components/Checkbox.js';
import { RadioButtonGroup } from '@hilla/react-components/RadioButtonGroup.js';
import { VerticalLayout } from '@hilla/react-components/VerticalLayout.js';

function Example() {
  return (
    <VerticalLayout>
      {/* tag::snippet[] */}
      <Checkbox checked>
        <label slot="label">Reply All by default (unchecked state not clear)</label>
      </Checkbox>
      <RadioButtonGroup label="Default reply behavior" value="Reply">
        <RadioButton label="Reply" checked value="Reply" />
        <RadioButton label="Reply to all" value="Reply to all" />
      </RadioButtonGroup>
      {/* end::snippet[] */}
    </VerticalLayout>
  );
}

export default reactExample(Example);
