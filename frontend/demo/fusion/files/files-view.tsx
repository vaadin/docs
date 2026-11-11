import { useSignal } from '@vaadin/hilla-react-signals';
import { Upload } from '@vaadin/react-components';

// tag::csrf[]
// Adds the CSRF token that Spring Security expects
function addCsrfHeader(xhr: XMLHttpRequest) {
  const header = document.querySelector<HTMLMetaElement>('meta[name="_csrf_header"]')?.content;
  const token = document.querySelector<HTMLMetaElement>('meta[name="_csrf"]')?.content;
  if (header && token) {
    xhr.setRequestHeader(header, token);
  }
}
// end::csrf[]

type StoredFile = { id: string; name: string };

export default function FilesView() {
  const files = useSignal<StoredFile[]>([]);

  return (
    <>
      {/* tag::upload[] */}
      <Upload
        target="api/files"
        uploadFormat="multipart"
        onUploadRequest={(event) => addCsrfHeader(event.detail.xhr)}
        onUploadSuccess={(event) => {
          const { file, xhr } = event.detail;
          files.value = [...files.value, { id: xhr.responseText, name: file.name }];
        }}
      />
      {/* end::upload[] */}
      {/* tag::download[] */}
      <ul>
        {files.value.map((file) => (
          <li key={file.id}>
            <a href={`api/files/${file.id}`} download>
              {file.name}
            </a>
          </li>
        ))}
      </ul>
      {/* end::download[] */}
    </>
  );
}
