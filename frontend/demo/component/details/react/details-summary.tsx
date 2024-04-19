import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect, useState } from 'react';
import { Details } from '@vaadin/react-components/Details.js';
import { DetailsSummary } from '@vaadin/react-components/DetailsSummary.js';
import { FormLayout, type FormLayoutResponsiveStep } from '@vaadin/react-components/FormLayout.js';
import { TextField } from '@vaadin/react-components/TextField.js';
import { ComboBox } from '@vaadin/react-components/ComboBox.js';
import { HorizontalLayout } from '@vaadin/react-components/HorizontalLayout.js';
import { Icon } from '@vaadin/react-components/Icon.js';
import type Country from 'Frontend/generated/com/vaadin/demo/domain/Country';
import { getCountries } from 'Frontend/demo/domain/DataService';
import '@vaadin/icons';

const responsiveSteps: FormLayoutResponsiveStep[] = [
  { minWidth: 0, columns: 1 },
  { minWidth: '20em', columns: 2 },
];

function Example() {
  const [items, setItems] = useState<Country[]>([]);

  useEffect(() => {
    getCountries().then((data) => setItems(data));
  }, []);

  return (
    // tag::snippet[]
    <Details opened>
      <DetailsSummary slot="summary">
        <HorizontalLayout style={{ justifyContent: 'space-between', width: '100%' }}>
          <span>Contact information</span>

          <HorizontalLayout
            style={{ color: 'var(--lumo-error-text-color)', marginLeft: 'var(--lumo-space-s)' }}
          >
            <Icon
              icon="vaadin:exclamation-circle"
              style={{
                width: 'var(--lumo-icon-size-s)',
                height: 'var(--lumo-icon-size-s)',
                marginRight: 'var(--lumo-space-xs)',
              }}
            />
            <span>2 errors</span>
          </HorizontalLayout>
        </HorizontalLayout>
      </DetailsSummary>

      <FormLayout responsiveSteps={responsiveSteps}>
        <TextField label="Address" value="4027 Amber Lake Canyon" data-colspan="2" />

        <TextField label="ZIP code" required />

        <TextField label="City" required />

        <ComboBox label="Country" itemLabelPath="name" itemValuePath="id" items={items} />
      </FormLayout>
    </Details>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
