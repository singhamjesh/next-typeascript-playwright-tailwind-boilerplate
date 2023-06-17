import { FunctionComponent, useEffect } from 'react';
import { get, includes } from 'lodash';
import { useStore } from 'react-redux';
import { useRouter } from 'next/router';
const AuthMiddleware: FunctionComponent<any> = (props) => {
  const store: any = useStore();
  const router = useRouter();
  useEffect(() => {
    const { token } = store.getState().auth;
    const publicUrls = get(process, 'env.PublicUrls', '/,/signin,/verify');
    if (!token && !includes(publicUrls, router.pathname)) {
      router.push('/signin');
    }
  });

  return <></>;
};

export default AuthMiddleware;
