import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { getDaysInMonth } from 'date-fns/getDaysInMonth';
import { useComputed, useSignal } from '@vaadin/hilla-react-signals';
import { ComboBox } from '@vaadin/react-components/ComboBox.js';
import { HorizontalLayout } from '@vaadin/react-components/HorizontalLayout.js';

function Example() {
  useSignals(); // hidden-source-line
  const months = useComputed<string[]>(() => [
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
  ]);

  const years = useComputed<number[]>(() =>
    Array.from({ length: 100 }, (_, k) => new Date().getFullYear() - 99 + k)
  );

  const selectedYear = useSignal<number | undefined>(undefined);
  const selectedMonth = useSignal<string | undefined>(undefined);
  const selectedDay = useSignal<number | undefined>(undefined);
  const selectableDays = useComputed<number[]>(() => {
    if (!selectedYear.value || !selectedMonth.value) {
      return [];
    }

    const startOfMonth = new Date(
      selectedYear.value ?? 0,
      months.value.indexOf(selectedMonth.value ?? 'January'),
      1
    );
    const lengthOfMonth = getDaysInMonth(startOfMonth);

    return Array.from({ length: lengthOfMonth }, (_, k) => k + 1);
  });

  return (
    // tag::snippet[]
    <HorizontalLayout theme="spacing">
      <ComboBox
        label="Year"
        style={{ width: '6em' }}
        items={years.value}
        value={String(selectedYear.value)}
        onValueChanged={(e) => {
          selectedYear.value = parseInt(e.detail.value);
          selectedMonth.value = undefined;
          selectedDay.value = undefined;
        }}
      />

      <ComboBox
        label="Month"
        style={{ width: '9em' }}
        items={months.value}
        value={selectedMonth.value}
        disabled={!selectedYear.value}
        onValueChanged={(e) => {
          selectedMonth.value = e.detail.value;
          selectedDay.value = undefined;
        }}
      />

      <ComboBox
        label="Day"
        style={{ width: '5em' }}
        items={selectableDays.value}
        value={String(selectedDay.value)}
        disabled={!selectedYear.value || !selectedMonth.value}
        onValueChanged={(e) => {
          const day = Number.parseInt(e.detail.value);
          selectedDay.value = !Number.isNaN(day) ? day : undefined;
        }}
      />
    </HorizontalLayout>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
