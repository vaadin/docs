const fs = require('fs').promises;
const { spawn } = require('child_process');

async function generatePDF() {
  try {
    console.log('Generating PDF');
    const pdfGenerator = spawn('asciidoctor-pdf', [
      '-a',
      'pdf-theme=./pdf-assets/themes/vaadin-theme.yml',
      '-a',
      'pdf-fontsdir=./pdf-assets/fonts',
      '-a',
      'skip-front-matter',
      '_ebook.adoc',
    ]);

    pdfGenerator.stdout.pipe(process.stdout);
    pdfGenerator.stderr.pipe(process.stderr);

    pdfGenerator.on('exit', async () => {
      console.log('Done.');
    });
  } catch (e) {
    console.log('Failed.', e);
  }
}

generatePDF();
