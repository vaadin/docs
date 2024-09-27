import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import { SplitLayout } from '@vaadin/react-components/SplitLayout.js';
import DetailContent from './detail-content';
import MasterContent from './master-content';
import exampleStyles from './split-layout-example-styles'; // hidden-source-line

function Example() {
  return (
    // tag::snippet[]
    <SplitLayout style={{ maxHeight: '280px' }} theme="minimal">
      <MasterContent />
      <DetailContent />
    </SplitLayout>
    // end::snippet[]
  );
}

export default reactExample(Example, exampleStyles); // hidden-source-line
