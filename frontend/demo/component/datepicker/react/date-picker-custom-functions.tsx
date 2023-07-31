import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { DatePicker } from '@hilla/react-components/DatePicker.js';
import { useState } from 'react';
import { formatISO, parseISO } from 'date-fns';

function Example() {
  const [selectedDateValue, setSelectedDateValue] = useState(
    formatISO(new Date(), { representation: 'date' })
  );

  const formatDateIso8601 = (dateString) => {
    const date = parseISO(dateString);
    return formatISO(date, { representation: 'date' });
  };

  return (
    <DatePicker
      label="Select a date:"
      value={selectedDateValue}
      helperText="Date picker configured to use ISO 8601 format"
      onValueChanged={(event) => setSelectedDateValue(event.detail.value)}
      i18n={{ formatDate: formatDateIso8601 }}
    />
  );
}

//# sourceMappingURL=DatePickerCustomFunctions.tsx.map

export default reactExample(Example);
