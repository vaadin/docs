import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect, useState } from 'react';
import { ComboBox } from '@hilla/react-components/ComboBox.js';
import { HorizontalLayout } from '@hilla/react-components/HorizontalLayout.js';
import getDaysInMonth from 'date-fns/getDaysInMonth';

function Example() {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const years = Array.from({ length: 100 }, (_, k) => new Date().getFullYear() - 99 + k);

  const [selectedYear, setSelectedYear] = useState<number>();
  const [selectedMonth, setSelectedMonth] = useState<string>();
  const [selectedDay, setSelectedDay] = useState<number>();
  const [selectableDays, setSelectableDays] = useState<number[]>([]);

  useEffect(() => {
    if (!selectedYear || !selectedMonth) {
      setSelectableDays([]);
      return;
    }

    const startOfMonth = new Date(selectedYear, months.indexOf(selectedMonth), 1);
    const lengthOfMonth = getDaysInMonth(startOfMonth);

    setSelectableDays(Array.from({ length: lengthOfMonth }, (_, k) => k + 1));
  }, [selectedYear, selectedMonth]);

  return (
    // tag::snippet[]
    <HorizontalLayout theme="spacing">
      <ComboBox
        label="Year"
        style={{ width: '6em' }}
        items={years}
        value={String(selectedYear)}
        onValueChanged={(e) => {
          setSelectedYear(parseInt(e.detail.value));
          setSelectedMonth(undefined);
          setSelectedDay(undefined);
        }}
      />

      <ComboBox
        label="Month"
        style={{ width: '9em' }}
        items={months}
        value={selectedMonth}
        disabled={!selectedYear}
        onValueChanged={(e) => {
          setSelectedMonth(e.detail.value);
          setSelectedDay(undefined);
        }}
      />

      <ComboBox
        label="Day"
        style={{ width: '5em' }}
        items={selectableDays}
        value={String(selectedDay)}
        disabled={!selectedYear || !selectedMonth}
        onValueChanged={(e) => setSelectedDay(parseInt(e.detail.value))}
      />
    </HorizontalLayout>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
