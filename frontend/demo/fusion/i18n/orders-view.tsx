import type { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import { key, translate } from '@vaadin/hilla-react-i18n';

// tag::config[]
export const config: ViewConfig = {
  title: key`orders.title`,
  menu: { title: key`orders.menu` },
};
// end::config[]

// tag::translate[]
function OrderCount({ count }: { count: number }) {
  return <p>{translate(key`orders.count`, { count })}</p>;
}
// end::translate[]

export default function OrdersView() {
  return (
    <>
      <h2>{translate(key`orders.heading`)}</h2>
      <OrderCount count={3} />
    </>
  );
}
