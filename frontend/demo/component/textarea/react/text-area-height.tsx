import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { TextArea } from '@hilla/react-components/TextArea.js';

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      <style>{`
          vaadin-text-area {
            width: 100%;
            min-height: 100px;
            max-height: 150px;
          }
        `}</style>
      <TextArea label="Description" value={loremIpsum} />
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example);
