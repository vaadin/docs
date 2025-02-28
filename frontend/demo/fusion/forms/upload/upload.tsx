import {
  Notification,
  Upload,
  type UploadElement,
  type UploadRequestEvent,
} from '@vaadin/react-components';
import { UploadService } from 'Frontend/generated/endpoints';

export default function UploadView() {
  // tag::snippet[]
  const handleUploadRequest = async (e: UploadRequestEvent) => {
    e.preventDefault();

    const uploadRef = e.target as UploadElement;

    const fileId = await UploadService.uploadFile(e.detail.file);
    uploadRef.files = uploadRef.files.map((file) => {
      file.status = '';
      file.complete = true;
      return file;
    });

    Notification.show(`Received file: ${fileId}`);
  };

  return <Upload maxFiles={1} onUploadRequest={handleUploadRequest} />;
  // end::snippet[]
}
