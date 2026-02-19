import '@vaadin/icons';
import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect } from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import {
  Accordion,
  AccordionHeading,
  type AccordionOpenedChangedEvent,
  AccordionPanel,
  Button,
  ComboBox,
  EmailField,
  FormLayout,
  type FormLayoutResponsiveStep,
  HorizontalLayout,
  Icon,
  TextField,
  VerticalLayout,
} from '@vaadin/react-components';
import { getCountries } from 'Frontend/demo/domain/DataService';
import type Country from 'Frontend/generated/com/vaadin/demo/domain/Country';

const responsiveSteps: FormLayoutResponsiveStep[] = [
  { minWidth: 0, columns: 1 },
  { minWidth: '20em', columns: 2 },
];

function Example() {
  useSignals(); // hidden-source-line
  const countries = useSignal<Country[]>([]);
  const openedPanelIndex = useSignal<number | null>(0);
  const customerComplete = useSignal<boolean>(false);
  const billingComplete = useSignal<boolean>(false);
  const paymentComplete = useSignal<boolean>(false);

  const handleAccordionPanelOpen = (event: AccordionOpenedChangedEvent) => {
    openedPanelIndex.value = event.detail.value;
  };

  useEffect(() => {
    getCountries().then((items) => {
      countries.value = items;
    });
  }, []);

  return (
    <Accordion opened={openedPanelIndex.value} onOpenedChanged={handleAccordionPanelOpen}>
      {/* tag::snippet[] */}
      <AccordionPanel>
        <AccordionHeading slot="summary">
          <HorizontalLayout theme="spacing">
            Customer details
            {customerComplete.value && (
              <Icon
                icon="vaadin:check"
                style={{ color: 'var(--lumo-success-text-color)', '--vaadin-icon-size': '1rem' }}
              />
            )}
          </HorizontalLayout>
        </AccordionHeading>
        <VerticalLayout theme="spacing">
          <FormLayout responsiveSteps={responsiveSteps}>
            <TextField label="First name" />
            <TextField label="Last name" />
            <EmailField label="Email address" data-colspan="2" />
            <TextField label="Phone number" data-colspan="2" />
          </FormLayout>

          <Button
            theme="primary"
            onClick={() => {
              openedPanelIndex.value = 1;
              customerComplete.value = true;
            }}
          >
            Continue
          </Button>
        </VerticalLayout>
      </AccordionPanel>
      {/* end::snippet[] */}
      <AccordionPanel>
        <AccordionHeading slot="summary">
          <HorizontalLayout theme="spacing">
            Billing address
            {billingComplete.value && (
              <Icon
                icon="vaadin:check"
                style={{ color: 'var(--lumo-success-text-color)', '--vaadin-icon-size': '1rem' }}
              />
            )}
          </HorizontalLayout>
        </AccordionHeading>

        <VerticalLayout theme="spacing">
          <FormLayout responsiveSteps={responsiveSteps}>
            <TextField label="Address" data-colspan="2" />
            <TextField label="ZIP code" />
            <TextField label="City" />
            <ComboBox
              label="Country"
              itemLabelPath="name"
              itemValuePath="name"
              items={countries.value}
            />
          </FormLayout>

          <Button
            theme="primary"
            onClick={() => {
              openedPanelIndex.value = 2;
              billingComplete.value = true;
            }}
          >
            Continue
          </Button>
        </VerticalLayout>
      </AccordionPanel>
      <AccordionPanel>
        <AccordionHeading slot="summary">
          <HorizontalLayout theme="spacing">
            Payment
            {paymentComplete.value && (
              <Icon
                icon="vaadin:check"
                style={{ color: 'var(--lumo-success-text-color)', '--vaadin-icon-size': '1rem' }}
              />
            )}
          </HorizontalLayout>
        </AccordionHeading>

        <VerticalLayout theme="spacing">
          <FormLayout responsiveSteps={responsiveSteps}>
            <TextField label="Card number" data-colspan="2" />
            <TextField label="Expiry date" />
            <TextField label="CVV" />
          </FormLayout>

          <Button
            theme="primary"
            onClick={() => {
              openedPanelIndex.value = -1;
              paymentComplete.value = true;
            }}
          >
            Finish
          </Button>
        </VerticalLayout>
      </AccordionPanel>
    </Accordion>
  );
}

export default reactExample(Example); // hidden-source-line
