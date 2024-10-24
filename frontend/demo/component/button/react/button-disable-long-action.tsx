import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect } from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import { Button } from '@vaadin/react-components/Button.js';
import { HorizontalLayout } from '@vaadin/react-components/HorizontalLayout.js';
import { ProgressBar } from '@vaadin/react-components/ProgressBar.js';

function Example() {
  useSignals(); // hidden-source-line
  // tag::snippet[]
  const progress = useSignal(-1);

  useEffect(() => {
    if (progress.value >= 1) {
      progress.value = -1;
    } else if (progress.value >= 0) {
      setTimeout(() => {
        progress.value += 0.005;
      }, 25);
    }
  }, [progress.value]);

  return (
    <HorizontalLayout theme="spacing" style={{ alignItems: 'center' }}>
      <Button
        disabled={progress.value >= 0}
        onClick={() => {
          progress.value = 0;
        }}
      >
        Perform Action
      </Button>

      <ProgressBar value={progress.value} />
    </HorizontalLayout>
  );
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
