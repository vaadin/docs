import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import '@vaadin/button';
import '@vaadin/dialog';
import { dialogFooterRenderer, dialogRenderer } from '@vaadin/dialog/lit.js';
import type { DialogOpenedChangedEvent } from '@vaadin/dialog';
import { applyTheme } from 'Frontend/generated/theme';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

@customElement('dialog-footer')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  @state()
  private dialogOpened = false;

  @state()
  private user: Person | undefined;

  protected override async firstUpdated() {
    const { people } = await getPeople({ count: 1 });
    this.user = people[0];
  }

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-dialog
        header-title="${`Delete user "${this.user?.firstName} ${this.user?.lastName}"?`}"
        .opened="${this.dialogOpened}"
        @opened-changed="${(event: DialogOpenedChangedEvent) => {
          this.dialogOpened = event.detail.value;
        }}"
        ${dialogRenderer(() => html`Are you sure you want to delete this user permanently?`, [])}
        ${dialogFooterRenderer(
          () => html`
            <vaadin-button theme="primary error" @click="${this.close}" style="margin-right: auto;">
              Delete
            </vaadin-button>
            <vaadin-button theme="tertiary" @click="${this.close}">Cancel</vaadin-button>
          `,
          []
        )}
      ></vaadin-dialog>
      <!-- end::snippet[] -->
      <vaadin-button @click="${this.open}">Show dialog</vaadin-button>
    `;
  }

  private open() {
    this.dialogOpened = true;
  }

  private close() {
    this.dialogOpened = false;
  }
}
