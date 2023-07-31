import { reactExample } from 'Frontend/demo/react-example';
import React, { useEffect, useState } from 'react';
import { ComboBox } from '@hilla/react-components/ComboBox.js';
import { getCountries } from 'Frontend/demo/domain/DataService';
import type Country from 'Frontend/generated/com/vaadin/demo/domain/Country';

function Example() {
  const [allItems, setAllItems] = useState<Country[]>([]);
  const [filteredItems, setFilteredItems] = useState<Country[]>([]);

  useEffect(() => {
    getCountries().then((countries) => {
      setAllItems(countries);
      setFilteredItems(countries);
    });
  }, []);

  function filterChanged(event: React.SyntheticEvent, { value }: { value: string }) {
    const filter = value;
    setFilteredItems(
      allItems.filter(({ name }) => name.toLowerCase().startsWith(filter.toLowerCase()))
    );
  }

  return (
    <>
      {/* tag::snippet[] */}
      <ComboBox
        label="Country"
        itemLabelPath="name"
        itemValuePath="id"
        filteredItems={filteredItems}
        onFilterChanged={filterChanged}
      />
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example);
