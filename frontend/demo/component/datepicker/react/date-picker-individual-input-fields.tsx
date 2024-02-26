import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect } from 'react';
import { useSignal } from '@vaadin/hilla-react-signals';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { ComboBox } from '@vaadin/react-components/ComboBox.js';
import { HorizontalLayout } from '@vaadin/react-components/HorizontalLayout.js';
import getDaysInMonth from 'date-fns/getDaysInMonth';

function Example() {
  useSignals(); // hidden-source-line
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

  const selectedYear = useSignal<number | undefined>(undefined);
  const selectedMonth = useSignal<string | undefined>(undefined);
  const selectedDay = useSignal<number | undefined>(undefined);
  const selectableDays = useSignal<number[]>([]);

  useEffect(() => {
    if (!selectedYear || !selectedMonth) {
      selectableDays.value = [];
      return;
    }

    const startOfMonth = new Date(
      selectedYear.value ?? 0,
      months.indexOf(selectedMonth.value ?? 'January'),
      1
    );
    const lengthOfMonth = getDaysInMonth(startOfMonth);

    selectableDays.value = Array.from({ length: lengthOfMonth }, (_, k) => k + 1);
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
          selectedYear.value = parseInt(e.detail.value);
          selectedMonth.value = undefined;
          selectedDay.value = undefined;
        }}
      />

      <ComboBox
        label="Month"
        style={{ width: '9em' }}
        items={months}
        value={selectedMonth.value}
        disabled={!selectedYear}
        onValueChanged={(e) => {
          selectedMonth.value = e.detail.value;
          selectedDay.value = undefined;
        }}
      />

      <ComboBox
        label="Day"
        style={{ width: '5em' }}
        items={selectableDays.value}
        value={String(selectedDay)}
        disabled={!selectedYear.value || !selectedMonth.value}
        onValueChanged={(e) => {
          selectedDay.value = parseInt(e.detail.value);
        }}
      />
    </HorizontalLayout>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
