import { reactExample } from 'Frontend/demo/react-example';
import React, { useEffect, useState } from 'react';
import { GridPro } from '@hilla/react-components/GridPro.js';
import { GridProEditColumn } from '@hilla/react-components/GridProEditColumn.js';
import { DatePicker } from '@hilla/react-components/DatePicker.js';
import { Checkbox } from '@hilla/react-components/Checkbox.js';
import { Select } from '@hilla/react-components/Select.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { format, parseISO } from 'date-fns';

function Example() {
  const [items, setItems] = useState<Person[]>([]);
  useEffect(() => {
    getPeople().then(({ people }) => setItems(people));
  }, []);

  return (
    <>
      {/* tag::snippet[] */}
      <GridPro items={items} enterNextRow>
        <GridProEditColumn path="firstName" />

        <GridProEditColumn
          path="membership"
          editorType="select"
          editorOptions={['Regular', 'Premium', 'VIP']}
        />

        <GridProEditColumn path="subscriber" editorType="checkbox">
          {Checkbox}
        </GridProEditColumn>

        <GridProEditColumn
          path="birthday"
          bodyRenderer={({ item: { birthday } }) => format(parseISO(birthday), 'MM/dd/yyyy')}
          editModeRenderer={({ item: { birthday } }) => (
            <DatePicker style={{ width: '100%' }} value={birthday} />
          )}
        />
      </GridPro>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example);
