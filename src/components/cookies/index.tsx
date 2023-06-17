import { FunctionComponent } from 'react';
import CookieConsent from 'react-cookie-consent';
import { useTranslation } from 'next-i18next';

const Cookies: FunctionComponent<any> = () => {
  const { t } = useTranslation('common');
  return (
    <CookieConsent
      location="bottom"
      buttonText={t('COOKIES_BTN_TEXT')}
      cookieName="cookieConsent"
      style={{ background: '#2B373B' }}
      buttonStyle={{
        color: '#000000',
        background: '#FF9314',
        borderRadius: '5px',
        width: '150px'
      }}
      expires={150}
    >
      {t('COOKIES_MSG')}
      <p
        className="text-[10px]"
        dangerouslySetInnerHTML={{
          __html: t('COOKIES_READE_MORE').replace(
            '{cookie_policy}',
            `<a href='https://careermocha.com/cookie-policy' target="_blank" style="color:#FF9314">cookie policy</a>`
          )
        }}
      />
    </CookieConsent>
  );
};

export default Cookies;
