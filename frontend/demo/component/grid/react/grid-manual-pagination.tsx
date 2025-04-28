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
  const [pageSize, setPageSize] = useState(10);
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const dispatchPageChanged = (page: number, size: number) => {
    onPageChanged({
      currentPage: page,
      pageSize: size,
    });
  };

  const updatePageCount = () => {
    let newPageCount;
    if (totalItemCount === 0) {
      newPageCount = 1; // Display one page even if there are no items
    } else {
      newPageCount = Math.ceil(totalItemCount / pageSize);
    }
    setPageCount(newPageCount);

    // Adjust the current page if it exceeds the new page count
    if (currentPage > newPageCount) {
      setCurrentPage(newPageCount); // this will also trigger the page-changed event
    } else {
      dispatchPageChanged(currentPage, pageSize); // this is needed so the grid will update the data
    }
  };

  // Update page count when any of the following properties change
  useEffect(() => {
    updatePageCount();
  }, [totalItemCount, pageSize]);

  // Dispatch page changed event when the current page changes
  useEffect(() => {
    dispatchPageChanged(currentPage, pageSize);
  }, [currentPage]);

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
          onValueChanged={(e: CustomEvent) => {
            setPageSize(parseInt(e.detail.value));
          }}
        ></Select>
      </HorizontalLayout>
      <Button
        theme="small icon"
        slot="end"
        aria-label="Go to first page"
        disabled={currentPage === 1}
        onClick={() => {
          setCurrentPage(1);
        }}
      >
        <Icon icon="vaadin:angle-double-left"></Icon>
      </Button>
      <Button
        theme="small icon"
        slot="end"
        aria-label="Go to previous page"
        disabled={currentPage === 1}
        onClick={() => {
          setCurrentPage(currentPage - 1);
        }}
      >
        <Icon icon="vaadin:angle-left"></Icon>
      </Button>
      <span className="text-s px-s" slot="end">
        Page {currentPage} of {pageCount}
      </span>
      <Button
        theme="small icon"
        slot="end"
        aria-label="Go to next page"
        disabled={currentPage === pageCount}
        onClick={() => {
          setCurrentPage(currentPage + 1);
        }}
      >
        <Icon icon="vaadin:angle-right"></Icon>
      </Button>
      <Button
        theme="small icon"
        slot="end"
        aria-label="Go to last page"
        disabled={currentPage === pageCount}
        onClick={() => {
          setCurrentPage(pageCount);
        }}
      >
        <Icon icon="vaadin:angle-double-right"></Icon>
      </Button>
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
  const [gridItems, setGridItems] = useState<PersonEnhanced[]>([]);
  const [allItems, setAllItems] = useState<PersonEnhanced[]>([]);
  const [currentSearchTerm, setCurrentSearchTerm] = useState('');
  const [itemsFilteredByTermCount, setItemsFilteredByTermCount] = useState(0);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);

  const matchesTerm = (value: string, term: string): boolean =>
    value.toLowerCase().includes(term.toLowerCase());

  const updateGridItems = () => {
    const itemsFilteredByTerm = allItems.filter(
      ({ displayName, email, profession }) =>
        !currentSearchTerm ||
        matchesTerm(displayName, currentSearchTerm) ||
        matchesTerm(email, currentSearchTerm) ||
        matchesTerm(profession, currentSearchTerm)
    );

    setItemsFilteredByTermCount(itemsFilteredByTerm.length);
    setGridItems(itemsFilteredByTerm.slice(offset, offset + limit));
  };

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

  useEffect(() => {
    updateGridItems();
  }, [allItems, currentSearchTerm, offset, limit]);

  const handleSearchChange = (e: TextFieldValueChangedEvent) => {
    setCurrentSearchTerm((e.detail.value || '').trim());
  };

  const handlePageChanged = (detail: PageChangedEventDetail) => {
    setOffset((detail.currentPage - 1) * detail.pageSize);
    setLimit(detail.pageSize);
  };

  return (
    <VerticalLayout theme="spacing">
      <TextField placeholder="Search" style={{ width: '50%' }} onValueChanged={handleSearchChange}>
        <Icon slot="prefix" icon="vaadin:search" />
      </TextField>

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
  );
}

// end::snippet[]

export default reactExample(Example); // hidden-source-line
