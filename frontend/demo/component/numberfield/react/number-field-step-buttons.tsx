import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { FormLayout } from '@hilla/react-components/FormLayout.js';
import { FormItem } from '@hilla/react-components/FormItem.js';
import { IntegerField } from '@hilla/react-components/IntegerField';

export default reactExample(() => (
  <FormLayout responsiveSteps={layoutSteps}>
    <FormItem label="Adults">
      {/* tag::snippet[] */}
      <IntegerField value={2} stepButtonsVisible min={0} max={9} />
      {/* end::snippet[] */}
    </FormItem>

    <FormItem label={<><div>Children</div><div style={{ fontSize: 'var(--lumo-font-size-xxs)' }}>Age 2-12</div></label>}>
      <IntegerField value={2} stepButtonsVisible min={0} max={9} />
    </FormItem>

    <FormItem label="Infants">
      <IntegerField value={1} stepButtonsVisible min={0} max={9} />
    </FormItem>
  </FormLayout>
));