import '@vaadin/vaadin-button/vaadin-button.js';
import '@vaadin/vaadin-combo-box/vaadin-combo-box.js';

// tag::global-dark[]
document.documentElement.setAttribute("theme", "dark");
// end::global-dark[]

// tag::themed-button[]
const button = document.createElement('vaadin-button');
button.textContent = 'Themed button';
button.setAttribute('theme', 'primary small');
// end::themed-button[]

// tag::combobox-variant[]
const comboBox = document.createElement('vaadin-combo-box');
comboBox.setAttribute('theme', 'small');
// end::combobox-variant[]
