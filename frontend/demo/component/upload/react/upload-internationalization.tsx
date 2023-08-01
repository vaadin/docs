import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Upload } from '@hilla/react-components/Upload.js';

function Example() {
  const i18n = {
    dropFiles: {
      one: 'Raahaa tiedosto tähän',
      many: 'Raahaa tiedostot tähän',
    },
    addFiles: {
      one: 'Valitse tiedosto...',
      many: 'Valitse tiedostot...',
    },
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

  return <Upload i18n={i18n} />;
}

export default reactExample(Example); // hidden-source-line
