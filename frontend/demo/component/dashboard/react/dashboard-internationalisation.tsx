import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react'; // hidden-source-line
import { Dashboard, type DashboardI18n } from '@vaadin/react-components-pro';

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

function Example() {
  return <Dashboard i18n={germanI18n}></Dashboard>;
}

// end::snippet[]

export default reactExample(Example); // hidden-source-line
