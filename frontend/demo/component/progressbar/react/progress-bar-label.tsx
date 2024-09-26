import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import { HorizontalLayout } from '@vaadin/react-components/HorizontalLayout.js';
import { ProgressBar } from '@vaadin/react-components/ProgressBar.js';

function Example() {
  return (
    <div>
      {/* tag::snippet[] */}
      <HorizontalLayout style={{ justifyContent: 'space-between' }}>
        <label className="text-secondary" id="pblabel">
          Processing Financials.xlsx
        </label>

        <span className="text-secondary">50%</span>
      </HorizontalLayout>

      <ProgressBar aria-labelledby="pblabel" value={0.5} />
      {/* end::snippet[] */}
    </div>
  );
}

export default reactExample(Example); // hidden-source-line
