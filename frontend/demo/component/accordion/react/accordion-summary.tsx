import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import { useEffect } from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useForm } from '@vaadin/hilla-react-form';
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
  TextField,
  VerticalLayout,
} from '@vaadin/react-components';
import { getCountries } from 'Frontend/demo/domain/DataService';
import CardModel from 'Frontend/generated/com/vaadin/demo/domain/CardModel';
import type Country from 'Frontend/generated/com/vaadin/demo/domain/Country';
import PersonModel from 'Frontend/generated/com/vaadin/demo/domain/PersonModel';

const responsiveSteps: FormLayoutResponsiveStep[] = [
  { minWidth: 0, columns: 1 },
  { minWidth: '20em', columns: 2 },
];

function Example() {
  useSignals(); // hidden-source-line
  const countries = useSignal<Country[]>([]);
  const openedPanelIndex = useSignal<number | null>(0);

  const person = useForm(PersonModel);
  const card = useForm(CardModel);

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
      <AccordionPanel>
        <AccordionHeading slot="summary">
          <HorizontalLayout style={{ width: '100%', alignItems: 'center' }}>
            Customer details
            <VerticalLayout
              hidden={openedPanelIndex.value === 0}
              style={{ fontSize: 'var(--lumo-font-size-s)', marginLeft: 'auto' }}
            >
              <span>
                {person.value.firstName} {person.value.lastName}
              </span>
              <span>{person.value.email}</span>
              <span>{person.value.address?.phone}</span>
            </VerticalLayout>
          </HorizontalLayout>
        </AccordionHeading>
        <FormLayout responsiveSteps={responsiveSteps}>
          <TextField label="First name" {...person.field(person.model.firstName)} />

          <TextField label="Last name" {...person.field(person.model.lastName)} />

          <EmailField
            label="Email address"
            data-colspan="2"
            {...person.field(person.model.email)}
          />

          <TextField
            label="Phone number"
            data-colspan="2"
            {...person.field(person.model.address.phone)}
          />
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

      <AccordionPanel>
        <AccordionHeading slot="summary">
          <HorizontalLayout style={{ width: '100%', alignItems: 'center' }}>
            Billing address
            <VerticalLayout
              hidden={openedPanelIndex.value === 1}
              style={{ fontSize: 'var(--lumo-font-size-s)', marginLeft: 'auto' }}
            >
              <span>{person.value.address?.street}</span>
              <span>
                {person.value.address?.zip} {person.value.address?.city}
              </span>
              <span>{person.value.address?.country}</span>
            </VerticalLayout>
          </HorizontalLayout>
        </AccordionHeading>

        <FormLayout responsiveSteps={responsiveSteps}>
          <TextField
            label="Address"
            data-colspan="2"
            {...person.field(person.model.address.street)}
          />

          <TextField label="ZIP code" {...person.field(person.model.address.zip)} />

          <TextField label="City" {...person.field(person.model.address.city)} />

          <ComboBox
            label="Country"
            itemLabelPath="name"
            itemValuePath="name"
            items={countries.value}
            {...person.field(person.model.address.country)}
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

      <AccordionPanel>
        <AccordionHeading slot="summary">
          <HorizontalLayout style={{ width: '100%', alignItems: 'center' }}>
            Payment
            <VerticalLayout
              hidden={openedPanelIndex.value === 2}
              style={{ fontSize: 'var(--lumo-font-size-s)', marginLeft: 'auto' }}
            >
              <span>{card.value.accountNumber}</span>
              <span>{card.value.expiryDate}</span>
            </VerticalLayout>
          </HorizontalLayout>
        </AccordionHeading>

        <FormLayout responsiveSteps={responsiveSteps}>
          <TextField
            label="Card number"
            data-colspan="2"
            {...card.field(card.model.accountNumber)}
          />

          <TextField label="Expiry date" {...card.field(card.model.expiryDate)} />

          <TextField label="CVV" {...card.field(card.model.cvv)} />
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
