import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useState } from 'react';
import { Button } from '@hilla/react-components/Button.js';
import { HorizontalLayout } from '@hilla/react-components/HorizontalLayout.js';
import { ProgressBar } from '@hilla/react-components/ProgressBar.js';

function Example() {
  // tag::snippet[]
  const [progress, setProgress] = useState(-1);

  if (progress >= 1) {
    setProgress(-1);
  } else if (progress >= 0) {
    setTimeout(() => setProgress(progress + 0.005), 25);
  }

  return (
    <HorizontalLayout theme="spacing" style={{ alignItems: 'center' }}>
      <Button disabled={progress >= 0} onClick={() => setProgress(0)}>
        Perform Action
      </Button>

      <ProgressBar value={progress}></ProgressBar>
    </HorizontalLayout>
  );
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
