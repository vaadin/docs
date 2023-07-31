import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { RadioGroup } from '@hilla/react-components/RadioGroup.js';
import { RadioButton } from '@hilla/react-components/RadioButton.js';
import { VerticalLayout } from '@hilla/react-components/VerticalLayout.js';

function Example() {
  return (
    <VerticalLayout>
      {/* tag::snippet[] */}
      <RadioGroup label="Job title" theme="vertical" value="analyst">
        <RadioButton value="analyst" label="Analyst" />
        <RadioButton value="administrator" label="Administrator" />
        <RadioButton value="engineer" label="Engineer" />
      </RadioGroup>

      <RadioGroup label="Department" theme="vertical" value="engineering">
        <RadioButton value="engineering" label="Engineering" />
        <RadioButton value="humanResources" label="Human Resources" />
        <RadioButton value="marketing" label="Marketing" />
      </RadioGroup>
      {/* end::snippet[] */}
    </VerticalLayout>
  );
}

export default reactExample(Example);
