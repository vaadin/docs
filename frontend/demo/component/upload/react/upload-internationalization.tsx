import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import { Upload } from '@vaadin/react-components/Upload.js';

function Example() {
  useSignals(); // hidden-source-line
  // tag::snippet[]
  const uploadI18n = useSignal({
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
  });

  return <Upload i18n={uploadI18n.value} />;
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
