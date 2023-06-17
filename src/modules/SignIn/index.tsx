/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { startLoginWithOtp, verifyOtp } from '@/reducers/auth';
import SignInForm from '@/modules/ReduxForms/signin-form';
import OtpForm from '@/modules/ReduxForms/otp-form';
import TextInput from '@/components/form-elements/text-input';
import SocialLogin from './social-login';

const SignIn = (props: any) => {
  const { startLoginWithOtp, verifyOtp, token, router, email } = props;
  const [isSending, setIsSending] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const { t } = useTranslation('common');

  /* Check token is exist or not */
  useEffect(() => {
    if (token) {
      router.push('/');
    }
  });

  /**
   * Send otp on given email
   * @param values
   */
  const signInFormHandler = (values: any) => {
    setIsSending(true);
    const obj = {
      email: values.email.toLowerCase().trim()
    };

    /* Handle user login otp */
    startLoginWithOtp(obj).then((response: any) => {
      if (!response) {
        setIsOtpSent(false);
      } else {
        setIsOtpSent(true);
      }
      setIsSending(false);
    });
  };

  /**
   * Verify user given otp
   * @param values
   */
  const otpFormHandler = (values: any) => {
    setIsSending(true);

    /* Verify otp */
    verifyOtp(values.otp).then((response: any) => {
      if (!response) {
        setIsSending(false);
      }
    });
  };

  const onClickResendHandler = () => {
    setIsOtpSent(false);
  };

  return (
    <>
      <section className="min-h-screen pb-10">
        <div className="h-screen">
          <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
            <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
              <img
                src="/assets/png/login.png"
                className="w-full"
                alt="Sample image"
              />
            </div>
            <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
              <div className="text-center mb-4">
                <h1 className="mb-2 text-dark-900">{t('NAME')}</h1>
                <p className="mb-5">{t('SUB_TITLE')}</p>
                <h5 className="mb-0">
                  {t('SIGN_IN_PAGE.SOCIAL_LOGIN_HEADING')}
                </h5>
                <p className="text-[10px] leading-4">
                  By creating an account or logging in, you understand and agree
                  to Project&apos;s&nbsp;
                  <a href="#" target="_blank" className="text-primary-900">
                    Terms
                  </a>
                  . You also acknowledge our{' '}
                  <a href="#" target="_blank" className="text-primary-900">
                    Cookie
                  </a>
                  &nbsp;and&nbsp;
                  <a href="#" target="_blank" className="text-primary-900">
                    Privacy policies
                  </a>
                  .
                </p>
              </div>
              <div>
                <SocialLogin action="login" />
              </div>

              <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                <p className="mx-4 mb-0 text-center font-semibold dark:text-white">
                  Or
                </p>
              </div>
              {!isOtpSent && (
                <>
                  <SignInForm
                    isSending={isSending}
                    formSubmitHandler={signInFormHandler}
                  />
                </>
              )}
              {isOtpSent && (
                <>
                  <div>
                    <TextInput
                      placeholder={email}
                      disabled={true}
                      className="border rounded-md border-inherit p-2 mb-5"
                    />
                    <p className="mb-3 text-gray-600">
                      {t('SIGN_IN_PAGE.CONFIRMATION_TEXT')}
                    </p>
                  </div>
                  <div>
                    <OtpForm
                      isSending={isSending}
                      formSubmitHandler={otpFormHandler}
                      onClickResend={onClickResendHandler}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  email: state.auth.email,
  token: state.auth.token
});

const mapDispatchToProps = (dispatch: any) => ({
  startLoginWithOtp: (payload: any) => dispatch(startLoginWithOtp(payload)),
  verifyOtp: (payload: any) => dispatch(verifyOtp(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignIn));
