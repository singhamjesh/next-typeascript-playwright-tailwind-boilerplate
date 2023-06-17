import { InjectedFormProps } from 'redux-form';

/* Start: Sign-in props interface */
export interface SignInProps {
  formSubmitHandler: (arg: any) => any;
  isSending: boolean;
}

export interface ISignInValues {
  email: string;
}

export type ISignInProps = SignInProps &
  InjectedFormProps<ISignInValues, SignInProps>;

/* End: Sign-in props interface */

/* Start: Opt props interface */
export interface OtpProps {
  formSubmitHandler: (arg: any) => any;
  isSending: boolean;
  onClickResend?: () => void;
}

export interface IOtpValues {
  email: string;
}

export type IOtpProps = OtpProps & InjectedFormProps<IOtpValues, OtpProps>;
/* End: Opt props interface */
