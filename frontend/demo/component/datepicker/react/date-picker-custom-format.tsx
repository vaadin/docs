import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { DatePicker } from '@hilla/react-components/DatePicker.js';
import { VerticalLayout } from '@hilla/react-components/VerticalLayout.js';

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      <VerticalLayout theme="spacing">
        <DatePicker
          label="Select a date"
          placeholder="YYYY/MM/DD"
          helperText="Format: YYYY/MM/DD"
          value="2022/12/31"
          showWeekNumbers
          dateFormat="yyyy/MM/dd"
        />
      </VerticalLayout>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example);
