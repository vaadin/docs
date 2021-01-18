import '@vaadin/flow-frontend/dndConnector-es6.js';
import '@vaadin/flow-frontend/flow-component-renderer.js';
// @ts-ignore
import Appointment from '../generated/com/vaadin/demo/domain/Appointment';
import AppointmentModel from '../generated/com/vaadin/demo/domain/AppointmentModel';
import PersonModel from '../generated/com/vaadin/demo/domain/PersonModel';
// @ts-ignore
import Person from '../generated/com/vaadin/demo/domain/Person';
import AddressModel from '../generated/com/vaadin/demo/domain/AddressModel';
// @ts-ignore
import Address from '../generated/com/vaadin/demo/domain/Address';
import CardModel from '../generated/com/vaadin/demo/domain/CardModel';
// @ts-ignore
import Card from '../generated/com/vaadin/demo/domain/Card';
import client from '../generated/connect-client.default';
// @ts-ignore
client.prefix = __VAADIN_CONNECT_PREFIX__;

// The connectors require window.Vaadin.Flow namespace to exists
// @ts-ignore
window.Vaadin = window.Vaadin || {};
// @ts-ignore
window.Vaadin.Flow = window.Vaadin.Flow || {};

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
