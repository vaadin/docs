import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { FormLayout, type FormLayoutResponsiveStep } from '@hilla/react-components/FormLayout.js';
import { FormItem } from '@hilla/react-components/FormItem.js';
import { IntegerField } from '@hilla/react-components/IntegerField';

const layoutSteps: FormLayoutResponsiveStep[] = [
  {
    minWidth: 0,
    columns: 1,
    labelsPosition: 'aside',
  },
];

export default reactExample(() => (
  <FormLayout responsiveSteps={layoutSteps}>
    <FormItem>
      <label slot="label">Adults</label>

      {/* tag::snippet[] */}
      <IntegerField value="2" stepButtonsVisible min={0} max={9} />
      {/* end::snippet[] */}
    </FormItem>

    <FormItem>
      <label slot="label">
        <div>Children</div>
        <div style={{ fontSize: 'var(--lumo-font-size-xxs)', position: 'absolute' }}>Age 2-12</div>
      </label>

      <IntegerField value="2" stepButtonsVisible min={0} max={9} />
    </FormItem>

    <FormItem>
      <label slot="label">Infants</label>
      <IntegerField value="1" stepButtonsVisible min={0} max={9} />
    </FormItem>
  </FormLayout>
));
