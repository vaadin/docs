import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { TextArea } from '@hilla/react-components/TextArea.js';
import { loremIpsum } from '.../../../../../src/main/resources/data/templates.json';

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      <TextArea label="Description" value={loremIpsum} />
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example);
