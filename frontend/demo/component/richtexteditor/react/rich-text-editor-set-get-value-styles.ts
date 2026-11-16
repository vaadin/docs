import { css } from 'lit';

const richTextEditorSetGetValueStyles = css`
  :host([theme~='aura']) [has-label] {
    padding-top: var(--vaadin-padding-m);
  }
`;

export default richTextEditorSetGetValueStyles;
