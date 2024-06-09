import PageWrapper from "@/components/widgets/page-wrapper/page-wrapper";
import { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useParams, useSearchParams } from "next/navigation";

const translationFiles = ["common", "about"];

const About = () => {
  const { t, i18n, ready } = useTranslation(translationFiles, {
    nsMode: "fallback",
  });
  const searchParams = useSearchParams();
  const params = useParams();
  return (
    <PageWrapper
      logo={t("logo")}
      navigation={t("navigation", { returnObjects: true })}>
      <div>
        <h1>{t("h1")}</h1>
        <div>params: {JSON.stringify(params)}</div>
        <div>searchParams: {searchParams?.toString()}</div>
      </div>
    </PageWrapper>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  console.log(`Loading translations for locale: ${locale}`);
  const translations = await serverSideTranslations(
    locale ?? "en",
    translationFiles,
  );
  return {
    props: {
      ...translations,
    },
  };
};

export default About;
