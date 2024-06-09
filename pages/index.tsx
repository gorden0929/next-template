import PageWrapper from '@/components/widgets/page-wrapper/page-wrapper';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useSearchParams, useParams } from 'next/navigation';
import { useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Head from 'next/head';

const translationFiles = ['common', 'index'];

const Home = () => {
  const { t, i18n, ready } = useTranslation(translationFiles, { nsMode: 'fallback' });
  const searchParams = useSearchParams();
  const params = useParams();

  useEffect(() => {
    console.log('component did mount');
    return () => {
      console.log('component will unmount');
    };
  }, []);

  return (
    <PageWrapper logo={t('logo')} navigation={t('navigation', { returnObjects: true })}>
      <Head>
        <title>{t('pageTitle')}</title>
        <meta name="description" content={t('pageDescription')} />
        <meta property="og:title" content={t('pageTitle')} />
        <meta property="og:description" content={t('pageDescription')} />
      </Head>
      <div>{t('h1')}</div>
      <div className="flex flex-col gap-3">
        <div>
          <Link href="/about">
            <Button>Go to About Page</Button>
          </Link>
        </div>

        <div>
          <Link href="/login">
            <Button>Go to Login Page</Button>
          </Link>
        </div>
        <div>{JSON.stringify(t('navigation', { returnObjects: true }))}</div>
      </div>
    </PageWrapper>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  console.log(`Loading translations for locale: ${locale}`);
  const translations = await serverSideTranslations(locale ?? 'en', translationFiles);
  return {
    props: {
      ...translations,
    },
  };
};

export default Home;
