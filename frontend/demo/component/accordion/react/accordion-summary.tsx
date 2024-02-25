import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect } from 'react';
import { useSignal } from '@vaadin/hilla-react-signals';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { Accordion, type AccordionOpenedChangedEvent } from '@vaadin/react-components/Accordion.js';
import { AccordionPanel } from '@vaadin/react-components/AccordionPanel.js';
import { FormLayout, type FormLayoutResponsiveStep } from '@vaadin/react-components/FormLayout.js';
import { TextField } from '@vaadin/react-components/TextField.js';
import { EmailField } from '@vaadin/react-components/EmailField.js';
import { Button } from '@vaadin/react-components/Button.js';
import { ComboBox } from '@vaadin/react-components/ComboBox.js';
import type Country from 'Frontend/generated/com/vaadin/demo/domain/Country';
import { getCountries } from 'Frontend/demo/domain/DataService';

const responsiveSteps: FormLayoutResponsiveStep[] = [
  { minWidth: 0, columns: 1 },
  { minWidth: '20em', columns: 2 },
];

function Example() {
  useSignals(); // hidden-source-line
  const countries = useSignal<Country[]>([]);
  const openedPanelIndex = useSignal<number | null>(0);

  const handleAccordionPanelOpen = (event: AccordionOpenedChangedEvent) => {
    openedPanelIndex.value = event.detail.value;
  };

  useEffect(() => {
    getCountries().then((items) => {
      countries.value = items;
    });
  }, []);

  // tag::snippet[]
  return (
    <Accordion opened={openedPanelIndex.value} onOpenedChanged={handleAccordionPanelOpen}>
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
            openedPanelIndex.value = 1;
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

          <ComboBox
            label="Country"
            itemLabelPath="name"
            itemValuePath="id"
            items={countries.value}
          />
        </FormLayout>

        <Button
          theme="primary"
          onClick={() => {
            openedPanelIndex.value = 2;
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
            openedPanelIndex.value = -1;
          }}
        >
          Finish
        </Button>
      </AccordionPanel>
    </Accordion>
  );
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
