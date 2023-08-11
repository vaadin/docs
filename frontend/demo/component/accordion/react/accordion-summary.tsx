import { reactExample } from 'Frontend/demo/react-example';
import React, { useEffect, useState } from 'react';
import { Accordion, type AccordionOpenedChangedEvent } from '@hilla/react-components/Accordion.js';
import { AccordionPanel } from '@hilla/react-components/AccordionPanel.js';
import { FormLayout, type FormLayoutResponsiveStep } from '@hilla/react-components/FormLayout.js';
import { TextField } from '@hilla/react-components/TextField.js';
import { EmailField } from '@hilla/react-components/EmailField.js';
import { Button } from '@hilla/react-components/Button.js';
import { ComboBox } from '@hilla/react-components/ComboBox.js';
import type Country from 'Frontend/generated/com/vaadin/demo/domain/Country';
import { getCountries } from 'Frontend/demo/domain/DataService';

const responsiveSteps: FormLayoutResponsiveStep[] = [
  { minWidth: 0, columns: 1 },
  { minWidth: '20em', columns: 2 },
];

function Example() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [openedPanelIndex, setOpenedPanelIndex] = useState<number | null>(0);

  const handleAccordionPanelOpen = (event: AccordionOpenedChangedEvent) => {
    setOpenedPanelIndex(event.detail.value);
  };

  useEffect(() => {
    getCountries().then((items) => setCountries(items));
  }, []);

  // tag::snippet[]
  return (
    <Accordion opened={openedPanelIndex} onOpenedChanged={handleAccordionPanelOpen}>
      <AccordionPanel summary="Customer details">
        <FormLayout responsiveSteps={responsiveSteps}>
          <TextField label="First name" />

          <TextField label="Last name" />

          <EmailField label="Email address" {...{ colspan: 2 }} />

          <TextField label="Phone number" {...{ colspan: 2 }} />
        </FormLayout>

        <Button
          theme="primary"
          onClick={() => {
            setOpenedPanelIndex(1);
          }}
        >
          Continue
        </Button>
      </AccordionPanel>

      <AccordionPanel summary="Billing address">
        <FormLayout responsiveSteps={responsiveSteps}>
          <TextField label="Address" {...{ colspan: 2 }} />

          <TextField label="ZIP code" />

          <TextField label="City" />

          <ComboBox label="Country" itemLabelPath="name" itemValuePath="id" items={countries} />
        </FormLayout>

        <Button
          theme="primary"
          onClick={() => {
            setOpenedPanelIndex(2);
          }}
        >
          Continue
        </Button>
      </AccordionPanel>

      <AccordionPanel summary="Payment">
        <FormLayout responsiveSteps={responsiveSteps}>
          <TextField label="Card number" {...{ colspan: 2 }} />

          <TextField label="Expiry date" />

          <TextField label="CVV" />
        </FormLayout>

        <Button
          theme="primary"
          onClick={() => {
            setOpenedPanelIndex(-1);
          }}
        >
          Finish
        </Button>
      </AccordionPanel>
    </Accordion>
  );
  // end::snippet[]
}

export default reactExample(Example);
