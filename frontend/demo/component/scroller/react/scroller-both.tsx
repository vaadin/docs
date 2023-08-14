import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Scroller } from '@hilla/react-components/Scroller.js';
import img from '../../../../../src/main/resources/images/reindeer.jpg';

function Example() {
  return (
    // tag::snippet[]
    <Scroller style={{ height: '300px', width: '100%' }}>
      <img src={img} alt="A reindeer walking on a snowy lake shore at dusk" />
    </Scroller>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
