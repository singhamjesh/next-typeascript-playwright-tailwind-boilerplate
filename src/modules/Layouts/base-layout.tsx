import { NextPage } from 'next';
import { FunctionComponent, Fragment, PropsWithChildren, useMemo } from 'react';
import { useTranslation } from 'next-i18next';
import { mergeCls } from '@/utils/helper';
import Metadata from '@/components/seo/metadata';
import { BaseLayoutProps, UnknownProps } from './types';

/**
 * This is higher order component. its contains basic layout of project
 * We can use global component here
 * @param props
 * @returns
 */
export const BaseLayout: FunctionComponent<
  PropsWithChildren<BaseLayoutProps>
> = (props) => {
  const { children, className, title, description } = props;
  const { t } = useTranslation('common');
  return (
    <Fragment>
      <Metadata title={t(title)} description={t(description)} />
      <div className={mergeCls(['flex flex-col min-h-screen', className])}>
        {children}
      </div>
    </Fragment>
  );
};
export default BaseLayout;

/**
 * Higher-order component that wraps the provided component in a `<MainLayout>` component.
 * Of course, you can create your new Layout with this template!
 * @param PageComponent - The page component to wrap with the layout
 * @param layoutProps - The props to pass to the layout
 * @returns - NextPage
 */
export const withBaseLayout = <T extends UnknownProps>(
  PageComponent: NextPage<T>,
  layoutProps: BaseLayoutProps | ((pageProps: T) => BaseLayoutProps)
) => {
  const LayoutPage: FunctionComponent<T> = (pageProps) => {
    const layoutPropsWithPageProps = useMemo(() => {
      return typeof layoutProps === 'function'
        ? layoutProps(pageProps)
        : layoutProps;
    }, [pageProps]);

    return (
      <BaseLayout {...layoutPropsWithPageProps}>
        <PageComponent {...pageProps} />
      </BaseLayout>
    );
  };
  return LayoutPage;
};
