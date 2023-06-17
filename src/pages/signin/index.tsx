import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { withBaseLayout } from '@/modules/Layouts/base-layout';
import SignIn from '@/modules/SignIn';

function Index() {
  return (
    <main className="container mx-auto">
      <div className="px-4">
        <SignIn />
      </div>
    </main>
  );
}

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale))
    }
  };
}

export default withBaseLayout(Index, {
  title: 'TITLE',
  description: 'DESCRIPTION'
});
