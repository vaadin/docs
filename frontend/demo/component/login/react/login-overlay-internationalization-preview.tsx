import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';

interface LoginI18n {
  header: {
    title: string;
    description: string;
  };
  form: {
    title: string;
    username: string;
    password: string;
    submit: string;
    forgotPassword: string;
  };
  errorMessage: {
    title: string;
    message: string;
    username: string;
    password: string;
  };
  additionalInformation: string;
}

interface ExampleProps {
  i18n: LoginI18n;
}

function Example({ i18n }: ExampleProps) {
  return (
    <login-overlay-mockup
      i18n={i18n}
      headerTitle={i18n.header?.title}
      description={i18n.header?.description}
    ></login-overlay-mockup>
  );
}

export default reactExample(Example);
