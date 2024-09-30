import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import { LoginForm } from '@vaadin/react-components/LoginForm.js';

function Example() {
  return (
    // tag::snippet[]
    <div className="login-rich-content">
      <LoginForm theme="dark" no-autofocus />
    </div>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
