import { reactExample } from 'Frontend/demo/react-example';
import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@hilla/react-components/Button.js';
import { HorizontalLayout } from '@hilla/react-components/HorizontalLayout.js';
import { ProgressBar } from '@hilla/react-components/ProgressBar.js';

function Example() {
  const [isDisabled, setIsDisabled] = useState(false);
  const fakeProgressBarRef = useRef<any>();

  useEffect(() => {
    if (fakeProgressBarRef && fakeProgressBarRef.current) {
      fakeProgressBarRef.current.addEventListener('progress-end', () => {
        setIsDisabled(false);
      });
    }
  }, []);

  return (
    <>
      {/* tag::snippet[] */}
      <HorizontalLayout theme="spacing" style={{ alignItems: 'center' }}>
        <Button
          disabled={isDisabled}
          onClick={() => {
            setIsDisabled(true);
            fakeProgressBarRef.current.simulateProgress();
          }}
          style={{ flex: 'none' }}
        >
          Perform Action
        </Button>

        <ProgressBar ref={fakeProgressBarRef} />
      </HorizontalLayout>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example);
