import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { isAuthorizedViewRoute, routes } from './routes.js';
import { Router } from '@vaadin/router';

export const router = new Router(document.querySelector('#outlet'));

@customElement('main-view')
export class MainView extends LitElement {
  protected render() {
    return html`
      <nav>
        ${repeat(
          this.menuRoutes,
          (route) => html`<a href="${router.urlForPath(route.path)}">${route.title}</a>`
        )}
        ;
      </nav>
    `;
  }

  // tag::menuRoutes[]
  private get menuRoutes() {
    return routes.filter((route) => route.title).filter(isAuthorizedViewRoute);
  }

  // end::menuRoutes[]
}
