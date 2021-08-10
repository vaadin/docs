import './init-flow-namespace';
import './init-flow-components';
// @ts-ignore
import Appointment from 'Frontend/generated/com/vaadin/demo/domain/Appointment';
import AppointmentModel from 'Frontend/generated/com/vaadin/demo/domain/AppointmentModel';
import PersonModel from 'Frontend/generated/com/vaadin/demo/domain/PersonModel';
// @ts-ignore
import Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import AddressModel from 'Frontend/generated/com/vaadin/demo/domain/AddressModel';
// @ts-ignore
import Address from 'Frontend/generated/com/vaadin/demo/domain/Address';
import CardModel from 'Frontend/generated/com/vaadin/demo/domain/CardModel';
// @ts-ignore
import Card from 'Frontend/generated/com/vaadin/demo/domain/Card';
import client from 'Frontend/generated/connect-client.default';
import { applyTheme } from 'Frontend/generated/theme';

// Apply the theme, so that overlay elements styles and custom property overrides work as expected
applyTheme(document);

// @ts-ignore
client.prefix = __VAADIN_CONNECT_PREFIX__;

// @ts-ignore Workaround a Vaadin issue
AppointmentModel.createEmptyValue = () => Appointment;
// @ts-ignore Workaround a Vaadin issue
PersonModel.createEmptyValue = () => Person;
// @ts-ignore Workaround a Vaadin issue
AddressModel.createEmptyValue = () => Address;
// @ts-ignore Workaround a Vaadin issue
CardModel.createEmptyValue = () => Card;

document.body.style.setProperty('--docs-example-render-font-family', 'var(--lumo-font-family)');
document.body.style.setProperty('--docs-example-render-color', 'var(--lumo-body-text-color)');
document.body.style.setProperty('--docs-example-render-background-color', 'var(--lumo-base-color)');
