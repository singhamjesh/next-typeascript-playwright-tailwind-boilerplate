import { FunctionComponent } from 'react';
import { Field, reduxForm } from 'redux-form';
import TextInput from '@/components/form-elements/text-input';
import Button from '@/components/button';
import { OtpProps, IOtpValues, IOtpProps } from './types';
import { useTranslation } from 'react-i18next';

const OtpForm: FunctionComponent<IOtpProps> = (props) => {
  const { handleSubmit, formSubmitHandler, isSending, onClickResend } = props;
  const { t } = useTranslation('common');

  return (
    <>
      <form onSubmit={handleSubmit(formSubmitHandler)}>
        <div className="mb-5">
          <Field
            component={TextInput}
            name="otp"
            type="number"
            placeholder={t('OTP_FORM.OTP_PLACEHOLDER')}
            className="rounded-lg p-2"
          />
        </div>
        <div className="md:flex md:justify-between">
          <Button
            disabled={isSending}
            type="submit"
            className="default-shadow rounded-full bg-[#0083cf] text-dark-900 h-9 uppercase leading-normal md:w-1/2 w-full text-sm font-bold my-2 md:mr-2"
          >
            {isSending
              ? t('OTP_FORM.OTP_VERIFYING')
              : t('OTP_FORM.SUBMIT_BUTTON')}
          </Button>
          <Button
            onClick={onClickResend}
            disabled={isSending}
            type="button"
            className="bg-light-900 default-shadow rounded-full text-dark-900 h-9 uppercase leading-normal text-sm font-bold md:w-1/2 w-full my-2 md:ml-2"
          >
            {t('OTP_FORM.RESEND_BUTTON')}
          </Button>
        </div>
      </form>
    </>
  );
};

export default reduxForm<IOtpValues, OtpProps>({
  form: 'otpForm',
  destroyOnUnmount: true, // preserve form data
  forceUnregisterOnUnmount: true // unregister fields on unmount
})(OtpForm);
