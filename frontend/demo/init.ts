// Legacy Polymer-based dom-module styling
import '@vaadin/polymer-legacy-adapter/style-modules.js';

import './init-flow-namespace';
import './init-flow-components';
import '../generated/vaadin-featureflags';
// @ts-expect-error See workaround below
import Appointment from 'Frontend/generated/com/vaadin/demo/domain/Appointment';
import AppointmentModel from 'Frontend/generated/com/vaadin/demo/domain/AppointmentModel';
import PersonModel from 'Frontend/generated/com/vaadin/demo/domain/PersonModel';
// @ts-expect-error See workaround below
import Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import AddressModel from 'Frontend/generated/com/vaadin/demo/domain/AddressModel';
// @ts-expect-error See workaround below
import Address from 'Frontend/generated/com/vaadin/demo/domain/Address';
import CardModel from 'Frontend/generated/com/vaadin/demo/domain/CardModel';
// @ts-expect-error See workaround below
import Card from 'Frontend/generated/com/vaadin/demo/domain/Card';
import client from 'Frontend/generated/connect-client.default';
import { applyTheme } from 'Frontend/generated/theme';

// Apply the theme, so that overlay elements styles and custom property overrides work as expected
applyTheme(document);

// @ts-expect-error Inserted by DS Publisher
client.prefix = __VAADIN_CONNECT_PREFIX__; // eslint-disable-line no-undef

// @ts-expect-error Workaround a Vaadin issue
AppointmentModel.createEmptyValue = () => Appointment;
// @ts-expect-error Workaround a Vaadin issue
PersonModel.createEmptyValue = () => Person;
// @ts-expect-error Workaround a Vaadin issue
AddressModel.createEmptyValue = () => Address;
// @ts-expect-error Workaround a Vaadin issue
CardModel.createEmptyValue = () => Card;

document.body.style.setProperty('--docs-example-render-font-family', 'var(--lumo-font-family)');
document.body.style.setProperty('--docs-example-render-color', 'var(--lumo-body-text-color)');
document.body.style.setProperty('--docs-example-render-background-color', 'var(--lumo-base-color)');
