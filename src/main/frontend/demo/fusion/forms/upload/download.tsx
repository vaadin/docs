import { useSignal } from '@vaadin/hilla-react-signals';
import { TextField } from '@vaadin/react-components';

export default function DownloadView() {
  // tag::snippet[]
  const id = useSignal('');

  return (
    <div className="flex p-m gap-m items-end">
      <TextField
        label="ID"
        value={id.value}
        onValueChanged={(e) => {
          id.value = e.detail.value;
        }}
      />
      {id.value && (
        <a href={`/download/${id.value}`} download>
          Download
        </a>
      )}
    </div>
  );
  // end::snippet[]
}
