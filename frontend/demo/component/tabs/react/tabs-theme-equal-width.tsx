import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import { Tab } from '@vaadin/react-components/Tab.js';
import { Tabs } from '@vaadin/react-components/Tabs.js';

function Example() {
  return (
    // tag::snippet[]
    <Tabs theme="equal-width-tabs">
      <Tab>Details</Tab>
      <Tab>Payment</Tab>
      <Tab>Shipping</Tab>
    </Tabs>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
