import '@vaadin/flow-frontend/dndConnector-es6.js';
import '@vaadin/flow-frontend/flow-component-renderer.js';
// @ts-ignore
import Appointment from '../generated/com/vaadin/demo/domain/Appointment';
import AppointmentModel from '../generated/com/vaadin/demo/domain/AppointmentModel';
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
