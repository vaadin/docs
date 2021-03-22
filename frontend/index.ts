import { Flow } from '@vaadin/flow-frontend';
import { Router } from '@vaadin/router';

import './main-layout';

const { serverSideRoutes } = new Flow({
  imports: () => import('../target/frontend/generated-flow-imports'),
});

const routes = [
  {
    path: '',
    component: 'main-layout',
    children: [
      // fallback to server-side Flow routes if no client-side route matches
      ...serverSideRoutes,
    ],
  },
];

const router = new Router(document.querySelector('#outlet'));
router.setRoutes(routes);
