import '@vaadin/icons';
import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect, useState } from 'react';
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
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const calculatePageCount = (itemCount: number, size: number): number => {
    if (itemCount === 0) {
      return 1; // Display one page even if there are no items
    }
    return Math.ceil(itemCount / size);
  };

  const pageCount = calculatePageCount(totalItemCount, pageSize);

  useEffect(() => {
    // Adjust the current page if it exceeds the new page count as a side effect of the total item count changing.
    if (currentPage > pageCount) {
      setCurrentPage(pageCount);
      onPageChanged({ currentPage: pageCount, pageSize });
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
        setCurrentPage(newCurrentPage);
        onPageChanged({ currentPage: newCurrentPage, pageSize });
      }}
    >
      <Icon icon={icon}></Icon>
    </Button>
  );

  const handlePageSizeChange = (e: CustomEvent) => {
    const newPageSize = parseInt(e.detail.value);
    setPageSize(newPageSize);
    const newPageCount = calculatePageCount(totalItemCount, newPageSize);
    if (currentPage > newPageCount) {
      setCurrentPage(newPageCount);
      onPageChanged({ currentPage: newPageCount, pageSize: newPageSize });
    } else {
      onPageChanged({ currentPage, pageSize: newPageSize });
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
      {smallIconButton('Go to first page', 'vaadin:angle-double-left', () => 1, currentPage === 1)}
      {smallIconButton(
        'Go to previous page',
        'vaadin:angle-left',
        () => currentPage - 1,
        currentPage === 1
      )}
      <span className="text-s px-s" slot="end">
        Page {currentPage} of {pageCount}
      </span>
      {smallIconButton(
        'Go to next page',
        'vaadin:angle-right',
        () => currentPage + 1,
        currentPage === pageCount
      )}
      {smallIconButton(
        'Go to last page',
        'vaadin:angle-double-right',
        () => pageCount,
        currentPage === pageCount
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
  const [allItems, setAllItems] = useState<PersonEnhanced[]>([]);
  const [currentSearchTerm, setCurrentSearchTerm] = useState('');
  const [paginationState, setPaginationState] = useState({
    offset: 0,
    limit: 10,
  });

  useEffect(() => {
    getPeople().then(({ people }) => {
      setAllItems(
        people.map((person) => ({
          ...person,
          displayName: `${person.firstName} ${person.lastName}`,
        }))
      );
    });
  }, []);

  const matchesTerm = (value: string, term: string): boolean =>
    value.toLowerCase().includes(term.toLowerCase());

  const itemsFilteredByTerm = allItems.filter(
    ({ displayName, email, profession }) =>
      !currentSearchTerm ||
      matchesTerm(displayName, currentSearchTerm) ||
      matchesTerm(email, currentSearchTerm) ||
      matchesTerm(profession, currentSearchTerm)
  );

  const itemsFilteredByTermCount = itemsFilteredByTerm.length;
  const gridItems = itemsFilteredByTerm.slice(
    paginationState.offset,
    paginationState.offset + paginationState.limit
  );

  const handlePageChanged = (detail: PageChangedEventDetail) => {
    const newOffset = (detail.currentPage - 1) * detail.pageSize;
    setPaginationState({
      offset: newOffset,
      limit: detail.pageSize,
    });
  };

  return (
    <VerticalLayout theme="spacing">
      <TextField
        placeholder="Search"
        style={{ width: '50%' }}
        value={currentSearchTerm}
        onValueChanged={(e: TextFieldValueChangedEvent) => {
          setCurrentSearchTerm((e.detail.value || '').trim());
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
