// TODO: replace with real @hilla/react-crud styles
import { css } from 'lit';

export const autoGridHostStyles = css`
  .auto-grid-comparation-selection {
    --vaadin-field-default-width: 2em;
    margin-right: 3px;
  }

  .auto-grid-comparation-selection > vaadin-select-value-button {
    --_lumo-text-field-overflow-mask-image: none !important;
  }

  .auto-grid-comparation-selection::part(toggle-button) {
    display: none;
  }

  .auto-form {
    display: flex;
    flex-direction: column;
    gap: var(--lumo-space-m);
  }

  .auto-form-toolbar {
    display: flex;
    justify-content: flex-start;
    flex-direction: row-reverse;
    gap: var(--lumo-space-xs) var(--lumo-space-s);
    align-items: center;
  }

  .auto-form-delete-button {
    margin-right: auto;
  }

  .auto-crud {
    display: flex;
    overflow: hidden;
    border: solid 1px var(--lumo-contrast-20pct);
  }

  .auto-crud vaadin-split-layout {
    flex: 1 1 100%;
  }

  .auto-crud vaadin-split-layout::part(splitter) {
    border-top: solid 1px var(--lumo-contrast-20pct);
    border-left: solid 1px var(--lumo-contrast-20pct);
  }

  .auto-crud-main {
    flex: 1 1 100%;
    min-width: 200px;
    display: flex;
    flex-direction: column;
  }

  .auto-crud-main vaadin-grid {
    border: none;
  }

  .auto-crud-toolbar {
    display: flex;
    flex-shrink: 0;
    align-items: baseline;
    justify-content: flex-end;

    padding: var(--lumo-space-s) var(--lumo-space-m);
    background-color: var(--lumo-contrast-5pct);
    border-top: solid 1px var(--lumo-contrast-10pct);
  }

  .auto-crud .auto-form,
  .auto-crud-dialog .auto-form {
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }

  .auto-crud .auto-form {
    width: 40%;
    min-width: 300px;
  }

  /* Move box shadow and required z-index modification into pseudo-element
     as it otherwise messes with the drag handle of the split layout */
  .auto-crud .auto-form::before {
    content: '';
    pointer-events: none;
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
    box-shadow: var(--lumo-box-shadow-s);
  }

  .auto-crud .auto-form-fields,
  .auto-crud-dialog .auto-form-fields {
    flex: 1 1 0;
    min-height: 0;
    overflow-y: auto;
    padding: 0 var(--lumo-space-m);
  }

  .auto-crud .auto-form-toolbar,
  .auto-crud-dialog .auto-form-toolbar {
    flex: 0 0 auto;
    padding: var(--lumo-space-s) var(--lumo-space-m);
    background-color: var(--lumo-contrast-5pct);
    border-top: 1px solid var(--lumo-contrast-10pct);
  }

  .auto-crud-dialog {
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

  .auto-crud-dialog::part(overlay) {
    width: 100%;
    height: 100%;
    border-radius: 0;
  }

  .auto-crud-dialog::part(content) {
    padding: 0;
  }

  .auto-crud-dialog .auto-form {
    width: 100%;
    height: 100%;
  }
`;
