import '@vaadin/icons';
import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect } from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
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

// Interface for pagination event
interface PageChangedEventDetail {
  currentPage: number;
  pageSize: number;
}

interface GridPaginationControlsProps {
  totalItemCount: number;

  onPageChanged(detail: PageChangedEventDetail): void;
}

// GridPaginationControls component
const GridPaginationControls = ({ totalItemCount, onPageChanged }: GridPaginationControlsProps) => {
  useSignals(); // hidden-source-line
  const currentPage = useSignal<number>(1);
  const pageSize = useSignal<number>(10);

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
      currentPage.value = pageCount;
      onPageChanged({ currentPage: pageCount, pageSize: pageSize.value });
    }
  }, [totalItemCount]);

  const smallIconButton = (
    ariaLabel: string,
    icon: string,
    newPageCalculator: () => number, // should return page number we want to go to
    disabledWhen: boolean
  ) => (
    <Button
      theme="small icon"
      slot="end"
      aria-label={ariaLabel}
      disabled={disabledWhen}
      onClick={() => {
        const newCurrentPage = newPageCalculator();
        currentPage.value = newCurrentPage;
        onPageChanged({ currentPage: newCurrentPage, pageSize: pageSize.value });
      }}
    >
      <Icon icon={icon}></Icon>
    </Button>
  );

  const handlePageSizeChange = (e: CustomEvent) => {
    const newPageSize = parseInt(e.detail.value);
    pageSize.value = newPageSize;
    const newPageCount = calculatePageCount(totalItemCount, newPageSize);
    if (currentPage.value > newPageCount) {
      currentPage.value = newPageCount;
      onPageChanged({ currentPage: newPageCount, pageSize: newPageSize });
    } else {
      onPageChanged({ currentPage: currentPage.value, pageSize: newPageSize });
    }
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
          value={pageSize.toString()}
          onValueChanged={handlePageSizeChange}
        ></Select>
      </HorizontalLayout>
      {smallIconButton(
        'Go to first page',
        'vaadin:angle-double-left',
        () => 1,
        currentPage.value === 1
      )}
      {smallIconButton(
        'Go to previous page',
        'vaadin:angle-left',
        () => currentPage.value - 1,
        currentPage.value === 1
      )}
      <span className="text-s px-s" slot="end">
        Page {currentPage} of {pageCount}
      </span>
      {smallIconButton(
        'Go to next page',
        'vaadin:angle-right',
        () => currentPage.value + 1,
        currentPage.value === pageCount
      )}
      {smallIconButton(
        'Go to last page',
        'vaadin:angle-double-right',
        () => pageCount,
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
  const paginationState = useSignal({
    offset: 0,
    limit: 10,
  });

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
      !currentSearchTerm ||
      matchesTerm(displayName, currentSearchTerm.value) ||
      matchesTerm(email, currentSearchTerm.value) ||
      matchesTerm(profession, currentSearchTerm.value)
  );

  const itemsFilteredByTermCount = itemsFilteredByTerm.length;
  const gridItems = itemsFilteredByTerm.slice(
    paginationState.value.offset,
    paginationState.value.offset + paginationState.value.limit
  );

  const handlePageChanged = (detail: PageChangedEventDetail) => {
    const newOffset = (detail.currentPage - 1) * detail.pageSize;
    paginationState.value = {
      offset: newOffset,
      limit: detail.pageSize,
    };
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
          onPageChanged={handlePageChanged}
        />
      </VerticalLayout>
    </VerticalLayout>
  );
}

// end::snippet[]

export default reactExample(Example); // hidden-source-line
