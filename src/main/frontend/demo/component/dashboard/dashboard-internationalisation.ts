import '@vaadin/dashboard/vaadin-dashboard.js'; // hidden-source-line
import '@vaadin/dashboard/vaadin-dashboard-layout.js';
import { html, LitElement } from 'lit';
import type { DashboardI18n } from '@vaadin/dashboard';

// tag::snippet[]
const germanI18n: DashboardI18n = {
  selectSection: 'Abschnitt auswählen',
  selectWidget: 'Widget auswählen',
  remove: 'Entfernen',
  resize: 'Größe ändern',
  resizeApply: 'Größenänderung anwenden',
  resizeShrinkWidth: 'Breite verkleinern',
  resizeGrowWidth: 'Breite vergrößern',
  resizeShrinkHeight: 'Höhe verkleinern',
  resizeGrowHeight: 'Höhe vergrößern',
  move: 'Verschieben',
  moveApply: 'Verschieben anwenden',
  moveBackward: 'Nach hinten verschieben',
  moveForward: 'Nach vorne verschieben',
};

export class Example extends LitElement {
  render() {
    return html` <vaadin-dashboard-layout .i18n="${germanI18n}"></vaadin-dashboard-layout> `;
  }
}
// end::snippet[]
