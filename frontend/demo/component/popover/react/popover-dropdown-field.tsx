import '@vaadin/vaadin-lumo-styles/vaadin-iconset.js';
import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { formatISO, subMonths, subWeeks, subYears } from 'date-fns';
import { useSignal } from '@vaadin/hilla-react-signals';
import {
  DatePicker,
  HorizontalLayout,
  Icon,
  Popover,
  Select,
  type SelectChangeEvent,
  TextField,
} from '@vaadin/react-components';

function Example() {
  useSignals(); // hidden-source-line
  const opened = useSignal<boolean>(false);
  const range = useSignal<string>('');
  const from = useSignal<string>('');
  const to = useSignal<string>('');

  const formatDate = (date: Date) => formatISO(date, { representation: 'date' });

  const presets = [
    { label: 'Today', value: 'today' },
    { label: 'Last week', value: 'last-week' },
    { label: 'Last month', value: 'last-month' },
    { label: 'Year to date', value: 'year-to-date' },
    { label: 'Last year', value: 'last-year' },
    { label: 'Past 5 years', value: 'past-5-years' },
  ];

  const onPresetChange = (event: SelectChangeEvent) => {
    range.value = event.target.value;
    to.value = formatDate(new Date());

    switch (event.target.value) {
      case 'today':
        from.value = formatDate(new Date());
        break;
      case 'last-week':
        from.value = formatDate(subWeeks(new Date(), 1));
        break;
      case 'last-month':
        from.value = formatDate(subMonths(new Date(), 1));
        break;
      case 'year-to-date':
        from.value = formatDate(new Date(new Date().getFullYear(), 0, 1));
        break;
      case 'last-year':
        from.value = formatDate(subYears(new Date(), 1));
        break;
      case 'past-5-years':
        from.value = formatDate(subYears(new Date(), 5));
        break;
      default:
      // Do nothing
    }

    opened.value = false;
  };

  return (
    <>
      <TextField
        id="range-field"
        label="Search date range"
        value={from.value && to.value ? `${from.value} − ${to.value}` : ''}
        style={{ width: '340px' }}
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown') {
            opened.value = true;
          }
        }}
      >
        <Icon slot="suffix" icon="lumo:dropdown" />
      </TextField>
      {/* tag::snippet[] */}
      <Popover
        for="range-field"
        modal
        width="340px"
        position="bottom-start"
        aria-label="Select a date range"
        opened={opened.value}
        onOpenedChanged={(e) => {
          if (e.detail.value) {
            opened.value = true;
          }
        }}
        onClosed={() => {
          opened.value = false;
        }}
      >
        <Select
          label="Common ranges"
          placeholder="Select preset"
          items={presets}
          value={range.value}
          style={{ width: '100%' }}
          onChange={onPresetChange}
        />
        <HorizontalLayout theme="spacing-s" style={{ alignItems: 'baseline' }}>
          <DatePicker
            label="From"
            value={from.value}
            style={{ width: '150px' }}
            onChange={(event) => {
              range.value = '';
              from.value = event.target.value;
            }}
          />
          <div>−</div>
          <DatePicker
            label="To"
            value={to.value}
            style={{ width: '150px' }}
            onChange={(event) => {
              range.value = '';
              to.value = event.target.value;
            }}
          />
        </HorizontalLayout>
      </Popover>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example); // hidden-source-line
