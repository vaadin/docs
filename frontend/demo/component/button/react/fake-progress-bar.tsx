import { reactExample } from 'Frontend/demo/react-example';
import React, { useEffect, useState } from 'react';
import { ProgressBar } from '@hilla/react-components/ProgressBar.js';

function FakeProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const breakInterval = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + 0.005;
        if (newProgress >= 1) {
          clearInterval(breakInterval);
          return 0;
        }
        return newProgress;
      });
    }, 25);

    return () => {
      clearInterval(breakInterval);
      setProgress(0);
    };
  }, []);

  return <ProgressBar value={progress} />;
}

export default reactExample(FakeProgressBar);
