import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useState } from 'react';
import { GridPro } from '@vaadin/react-components/GridPro.js';
import { GridProEditColumn } from '@vaadin/react-components/GridProEditColumn.js';
import type { GridItemModel } from '@vaadin/react-components/Grid.js';

type Transaction = {
  name: string;
  amount: number;
  approved: boolean;
};

function Example() {
  const [items] = useState<Transaction[]>([
    { name: 'Transaction 1', amount: 100, approved: true },
    { name: 'Transaction 2', amount: 200, approved: false },
  ]);

  const isNotApproved = (model: GridItemModel<Transaction>) => !model.item.approved;

  return (
    // tag::snippet[]
    <GridPro items={items}>
      <GridProEditColumn path="name" isCellEditable={isNotApproved} />
      <GridProEditColumn path="amount" isCellEditable={isNotApproved} />
      <GridProEditColumn path="approved" editorType="checkbox" />
    </GridPro>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
