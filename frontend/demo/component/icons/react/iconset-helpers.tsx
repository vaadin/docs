import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';

enum IconEnum {
  ERROR,
  WARNING,
  INFO,
}

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      <IconEnum.ERROR />
      <IconEnum.WARNING />
      <IconEnum.INFO />
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example);
