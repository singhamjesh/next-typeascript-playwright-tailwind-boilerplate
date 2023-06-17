import auth0 from 'auth0-js';
import { FunctionComponent } from 'react';
import Button from '@/components/button';
import InlineSvg from '@/components/inline-svg';

/**
 * Social login
 * @param {*} props
 * @returns
 */
const SocialLogin: FunctionComponent<any> = (props) => {
  const { action } = props;

  const socialLoginHandler = (name: string) => {
    const webAuth = new auth0.WebAuth({
      domain: `${process.env.Auth0Domain}`,
      clientID: `${process.env.Auth0ClientID}`
    });
    webAuth.authorize({
      redirectUri: `${process.env.WebappBaseUrl}/verify`,
      connection: name,
      responseType: 'token id_token',
      state: `social|${name}|${action}`
    });
  };

  return (
    <div className="flex flex-row items-center justify-center">
      <Button
        type="button"
        className="default-shadow flex justify-center items-center m-2 h-9 w-9 rounded-full bg-[#0083cf] uppercase leading-normal text-dark-900"
        onClick={() => socialLoginHandler('google-oauth2')}
      >
        <InlineSvg
          fill="#000000"
          className="text-center"
          src="/assets/svg/google.svg"
          width={16}
          height={16}
        />
      </Button>

      <Button
        type="button"
        className="default-shadow flex justify-center items-center h-9 w-9 rounded-full bg-[#0083cf] uppercase leading-normal text-dark-900 "
        onClick={() => socialLoginHandler('linkedin')}
      >
        <InlineSvg
          color="#000000"
          className="text-center"
          src="/assets/svg/linkedin.svg"
          width={14}
          height={14}
        />
      </Button>
    </div>
  );
};

SocialLogin.defaultProps = {
  className: 'px-1 py-1'
};

export default SocialLogin;
