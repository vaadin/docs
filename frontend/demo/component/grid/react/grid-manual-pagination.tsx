import '@vaadin/icons';
import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect } from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { type Signal, useSignal } from '@vaadin/hilla-react-signals';
import { Avatar } from '@vaadin/react-components/Avatar.js';
import { Button } from '@vaadin/react-components/Button.js';
import { Grid } from '@vaadin/react-components/Grid.js';
import { GridColumn } from '@vaadin/react-components/GridColumn.js';
import { HorizontalLayout } from '@vaadin/react-components/HorizontalLayout.js';
import { Icon } from '@vaadin/react-components/Icon.js';
import { Select } from '@vaadin/react-components/Select.js';
import { TextField } from '@vaadin/react-components/TextField.js';
import { VerticalLayout } from '@vaadin/react-components/VerticalLayout.js';
import type { TextFieldValueChangedEvent } from '@vaadin/text-field';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

// Extend Person type with displayName
type PersonEnhanced = Person & { displayName: string };

interface GridPaginationControlsProps {
  totalItemCount: number;
  currentPage: Signal<number>;
  pageSize: Signal<number>;

  onCurrentPageChanged(newCurrentPage: number): void;

  onPageSizeChanged(newPageSize: number): void;
}

// Page size and page selector visual component
const GridPaginationControls = ({
  totalItemCount,
  currentPage,
  pageSize,
  onCurrentPageChanged,
  onPageSizeChanged,
}: GridPaginationControlsProps) => {
  const calculatePageCount = (itemCount: number, size: number): number => {
    if (itemCount === 0) {
      return 1; // Display one page even if there are no items
    }
    return Math.ceil(itemCount / size);
  };

  const pageCount = calculatePageCount(totalItemCount, pageSize.value);

  useEffect(() => {
    // Adjust the current page if it exceeds the new page count as a side effect of the total item count changing.
    if (currentPage.value > pageCount) {
      onCurrentPageChanged(pageCount);
    }
  }, [totalItemCount]);

  const smallIconButton = (
    ariaLabel: string,
    icon: string,
    onClick: () => void, // should return page number we want to go to
    disabledWhen: boolean
  ) => (
    <Button
      theme="small icon"
      slot="end"
      aria-label={ariaLabel}
      disabled={disabledWhen}
      onClick={onClick}
    >
      <Icon icon={icon}></Icon>
    </Button>
  );

  const handlePageSizeChange = (e: CustomEvent) => {
    const newPageSize = parseInt(e.detail.value);
    const newPageCount = calculatePageCount(totalItemCount, newPageSize);
    if (currentPage.value > newPageCount) {
      onCurrentPageChanged(newPageCount);
    }
    onPageSizeChanged(newPageSize);
  };

  return (
    <HorizontalLayout style={{ alignItems: 'center', gap: '0.3rem', width: '100%' }}>
      <HorizontalLayout style={{ alignItems: 'center' }} theme="spacing-s">
        <span id="page-size-label" className="text-s">
          Page size
        </span>
        <Select
          theme="small"
          aria-labelledby="page-size-label"
          style={{
            width: '4.8rem',
            '--vaadin-input-field-value-font-size': 'var(--lumo-font-size-s)',
          }}
          items={['10', '15', '25', '50', '100'].map((it) => ({ label: it, value: it }))}
          value={pageSize.value.toString()}
          onValueChanged={handlePageSizeChange}
        ></Select>
      </HorizontalLayout>
      {smallIconButton(
        'Go to first page',
        'vaadin:angle-double-left',
        () => onCurrentPageChanged(1),
        currentPage.value === 1
      )}
      {smallIconButton(
        'Go to previous page',
        'vaadin:angle-left',
        () => onCurrentPageChanged(currentPage.value - 1),
        currentPage.value === 1
      )}
      <span className="text-s px-s" slot="end">
        Page {currentPage.value} of {pageCount}
      </span>
      {smallIconButton(
        'Go to next page',
        'vaadin:angle-right',
        () => onCurrentPageChanged(currentPage.value + 1),
        currentPage.value === pageCount
      )}
      {smallIconButton(
        'Go to last page',
        'vaadin:angle-double-right',
        () => onCurrentPageChanged(pageCount),
        currentPage.value === pageCount
      )}
    </HorizontalLayout>
  );
};

function nameRenderer({ item: person }: { item: PersonEnhanced }) {
  return (
    <HorizontalLayout style={{ alignItems: 'center' }} theme="spacing">
      <Avatar img={person.pictureUrl} name={person.displayName} />
      <span> {person.displayName} </span>
    </HorizontalLayout>
  );
}

// tag::snippet[]
function Example() {
  useSignals(); // hidden-source-line
  const allItems = useSignal<PersonEnhanced[]>([]);
  const currentSearchTerm = useSignal('');
  const currentPage = useSignal(1);
  const pageSize = useSignal(10);

  useEffect(() => {
    getPeople().then(({ people }) => {
      allItems.value = people.map((person) => ({
        ...person,
        displayName: `${person.firstName} ${person.lastName}`,
      }));
    });
  }, []);

  const matchesTerm = (value: string, term: string): boolean =>
    value.toLowerCase().includes(term.toLowerCase());

  const itemsFilteredByTerm = allItems.value.filter(
    ({ displayName, email, profession }) =>
      !currentSearchTerm.value ||
      matchesTerm(displayName, currentSearchTerm.value) ||
      matchesTerm(email, currentSearchTerm.value) ||
      matchesTerm(profession, currentSearchTerm.value)
  );

  const itemsFilteredByTermCount = itemsFilteredByTerm.length;
  const offset = (currentPage.value - 1) * pageSize.value;
  const gridItems = itemsFilteredByTerm.slice(offset, offset + pageSize.value);

  const handleCurrentPageChanged = (newCurrentPage: number) => {
    currentPage.value = newCurrentPage;
  };
  const handlePageSizeChanged = (newPageSize: number) => {
    pageSize.value = newPageSize;
  };

  return (
    <VerticalLayout theme="spacing">
      <TextField
        placeholder="Search"
        style={{ width: '50%' }}
        onValueChanged={(e: TextFieldValueChangedEvent) => {
          currentSearchTerm.value = (e.detail.value || '').trim();
        }}
      >
        <Icon slot="prefix" icon="vaadin:search" />
      </TextField>
      <VerticalLayout theme="spacing-xs" style={{ width: '100%' }}>
        <Grid items={gridItems} all-rows-visible>
          <GridColumn header="Name" flexGrow={0} width="230px" renderer={nameRenderer} />
          <GridColumn path="email" />
          <GridColumn path="profession" />
        </Grid>
        <GridPaginationControls
          totalItemCount={itemsFilteredByTermCount}
          currentPage={currentPage}
          onCurrentPageChanged={handleCurrentPageChanged}
          pageSize={pageSize}
          onPageSizeChanged={handlePageSizeChanged}
        />
      </VerticalLayout>
    </VerticalLayout>
  );
}

// end::snippet[]

export default reactExample(Example); // hidden-source-line
