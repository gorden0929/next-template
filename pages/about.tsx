import { GetServerSideProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useParams, useSearchParams } from 'next/navigation';

const translationFiles = ['about'];

const About = () => {
  const { t, i18n, ready } = useTranslation(translationFiles);
  const searchParams = useSearchParams();
  const params = useParams();
  return (
    <>
      <div>
        <h1>{t('h1')}</h1>
        <div>params: {JSON.stringify(params)}</div>
        <div>searchParams: {searchParams?.toString()}</div>
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

export default About;
