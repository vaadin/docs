import '../../init'; // hidden-source-line
import './upload-demo-helpers'; // hidden-source-line
import { customElement, html, LitElement } from 'lit-element';
import '@vaadin/vaadin-upload/vaadin-upload';
import type { UploadI18n } from '@vaadin/vaadin-upload/vaadin-upload';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('upload-internationalization')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  // tag::snippet[]
  render() {
    const i18n: UploadI18n = {
      dropFiles: {
        one: 'Raahaa tiedosto tähän',
        many: 'Raahaa tiedostot tähän',
      },
      addFiles: {
        one: 'Valitse tiedosto...',
        many: 'Valitse tiedostot...',
      },
      cancel: 'Peruuta',
      error: {
        tooManyFiles: 'Liian monta tiedostoa.',
        fileIsTooBig: 'Tiedosto on liian suuri.',
        incorrectFileType: 'Väärä tiedostomuoto.',
      },
      uploading: {
        status: {
          connecting: 'Yhdistetään...',
          stalled: 'Pysäytetty',
          processing: 'Käsitellään tiedostoa...',
          held: 'Jonossa',
        },
        remainingTime: {
          prefix: 'aikaa jäljellä: ',
          unknown: 'jäljellä olevaa aikaa ei saatavilla',
        },
        error: {
          serverUnavailable: 'Palvelin ei vastaa',
          unexpectedServerError: 'Palvelinvirhe',
          forbidden: 'Kielletty',
        },
      },
      units: {
        size: ['t', 'kt', 'Mt', 'Gt', 'Tt', 'Pt', 'Et', 'ZB', 'YB'],
        sizeBase: 1000,
      },
    };
    return html`<vaadin-upload .i18n="${i18n}"></vaadin-upload>`;
  }
  // end::snippet[]
}
