import { Button } from '@/components/ui/button';
import { testGet } from '@/utilities/request';
import { GetServerSideProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useParams, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const translationFiles = ['about'];

const Test = () => {
  const { t, i18n, ready } = useTranslation(translationFiles);
  const searchParams = useSearchParams();
  const params = useParams();

  useEffect(() => {
    console.log('ready', ready);
  }, []);

  const get = () => {
    testGet();
  };

  return (
    <>
      <div>
        <h1>{t('h1')}</h1>
        <Button onClick={get}>test GET</Button>
      </div>
    </>
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

export default Test;
