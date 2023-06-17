import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import queryString from 'query-string';
import { socialSignOn } from '@/reducers/auth';

function Verify(props: any) {
  const { router, socialSignOn } = props;
  const parsed = queryString.parse(router.asPath);
  if (parsed) {
    socialSignOn(parsed);
  } else {
    router.push('/');
  }

  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <div
        className="inline-block h-12 w-12 animate-spin rounded-full border-8 border-solid border-current border-r-transparent align-[-0.125em] text-primary-900 motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch: any) => ({
  socialSignOn: (payload: any) => dispatch(socialSignOn(payload))
});

export default connect(null, mapDispatchToProps)(withRouter(Verify));
