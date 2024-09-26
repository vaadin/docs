import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import { DatePicker } from '@vaadin/react-components/DatePicker.js';
import { HorizontalLayout } from '@vaadin/react-components/HorizontalLayout.js';

function Example() {
  return (
    <HorizontalLayout theme="spacing">
      {/* tag::snippet[] */}
      <DatePicker readonly label="Read-only" value="2020-06-12" />

      <DatePicker disabled label="Disabled" />
      {/* end::snippet[] */}
    </HorizontalLayout>
  );
}

export default reactExample(Example); // hidden-source-line
