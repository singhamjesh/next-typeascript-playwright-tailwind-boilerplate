import { FunctionComponent, useState } from 'react';
import { Field, reduxForm } from 'redux-form';
import { useTranslation } from 'react-i18next';
import { get } from 'lodash';
import TextInput from '@/components/form-elements/text-input';
import Button from '@/components/button';
import { SignInProps, ISignInValues, ISignInProps } from './types';
import { isValidEmail } from '@/utils/helper';

const SignInForm: FunctionComponent<ISignInProps> = (props) => {
  const { handleSubmit, formSubmitHandler, isSending } = props;
  const { t } = useTranslation('common');
  const [error, setError] = useState('');

  const onFormSubmit = (values: any) => {
    setError('');
    const email = get(values, 'email', '');

    if (isValidEmail(email)) {
      formSubmitHandler(values);
    } else {
      setError('Invalid email address or domain not allowed!');
    }
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <div className="mb-5">
        <Field
          component={TextInput}
          name="email"
          type="text"
          placeholder={t('SIGN_IN_FORM.EMAIL_PLACEHOLDER')}
          className="rounded-lg p-2"
        />
        {error && <p className="text-red-600">{error}</p>}
      </div>

      <Button
        disabled={isSending}
        type="submit"
        className="default-shadow rounded-full bg-[#0083cf] text-dark-900 h-9 uppercase leading-normal w-full text-sm font-bold"
      >
        {isSending ? t('SIGN_IN_FORM.LOADING') : t('SIGN_IN_FORM.LOGIN_BUTTON')}
      </Button>
    </form>
  );
};

export default reduxForm<ISignInValues, SignInProps>({
  form: 'signIn',
  destroyOnUnmount: true, // preserve form data
  forceUnregisterOnUnmount: true // unregister fields on unmount
})(SignInForm);
