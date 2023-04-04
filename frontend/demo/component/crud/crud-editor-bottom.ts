import 'Frontend/demo/init'; // hidden-source-line
import { css, html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/crud';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('crud-editor-bottom')
export class Example extends LitElement {
  static override styles = css`
    vaadin-crud {
      --vaadin-crud-editor-max-height: 60%;
    }
  `;

  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  @state()
  private items: Person[] = [];

  protected override async firstUpdated() {
    const { people } = await getPeople();
    this.items = people;
  }

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-crud
        editor-position="bottom"
        include="firstName, lastName, email, profession"
        .items="${this.items}"
      ></vaadin-crud>
      <!-- end::snippet[] -->
    `;
  }
}
