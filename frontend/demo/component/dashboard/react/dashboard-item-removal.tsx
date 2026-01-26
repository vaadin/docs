import React from 'react'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import { ConfirmDialog } from '@vaadin/react-components/ConfirmDialog.js';
import type { DashboardItem, DashboardItemBeforeRemoveEvent } from '@vaadin/react-components-pro';
import { Dashboard } from '@vaadin/react-components-pro';

export function Example() {
  const items = useSignal<DashboardItem[]>([
    /* Item definitions */
  ]);

  const itemToRemove = useSignal<DashboardItem | null>(null);

  // tag::snippet[]
  function handleItemBeforeRemove(event: DashboardItemBeforeRemoveEvent<DashboardItem>) {
    event.preventDefault();
    itemToRemove.value = event.detail.item;
  }

  function handleRemoveConfirm() {
    items.value = items.value.filter((item) => item !== itemToRemove.value);
    itemToRemove.value = null;
  }

  function handleRemoveCancel() {
    itemToRemove.value = null;
  }

  return (
    <>
      <Dashboard
        items={items.value}
        onDashboardItemBeforeRemove={handleItemBeforeRemove}
      ></Dashboard>
      <ConfirmDialog
        header="Confirm removal"
        cancelButtonVisible
        onConfirm={handleRemoveConfirm}
        onCancel={handleRemoveCancel}
        opened={itemToRemove.value !== null}
      >
        Are you sure you want to remove this item?
      </ConfirmDialog>
    </>
  );
  // end::snippet[]
}
