import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import { RadioButton } from '@vaadin/react-components/RadioButton.js';
import { RadioGroup } from '@vaadin/react-components/RadioGroup.js';
import { VerticalLayout } from '@vaadin/react-components/VerticalLayout.js';

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

export default reactExample(Example); // hidden-source-line
