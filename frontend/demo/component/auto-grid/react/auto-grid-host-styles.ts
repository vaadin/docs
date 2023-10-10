// TODO: replace with real @hilla/react-crud styles
import { css } from 'lit';

export const autoGridHostStyles = css`
  .autoGridFilterWithLessGreaterEquals {
    --vaadin-field-default-width: 2em;
    margin-right: 3px;
  }

  .autoGridFilterWithLessGreaterEquals > vaadin-select-value-button {
    --_lumo-text-field-overflow-mask-image: none !important;
  }

  .autoGridFilterWithLessGreaterEquals::part(toggle-button) {
    display: none;
  }
`;
