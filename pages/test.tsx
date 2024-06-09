import { Button } from "@/components/ui/button";
import PageWrapper from "@/components/widgets/page-wrapper/page-wrapper";
import { HideLoading, ShowLoading } from "@/utilities/eventBus";
import {
  testDelete,
  testGet,
  testPatch,
  testPost,
  testPut,
} from "@/utilities/request";
import { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const translationFiles = ["common", "about"];

const Test = () => {
  const { t, i18n, ready } = useTranslation(translationFiles, {
    nsMode: "fallback",
  });
  const searchParams = useSearchParams();
  const params = useParams();

  useEffect(() => {
    console.log("ready", ready);
  }, []);

  const load = () => {
    ShowLoading("test");
    setTimeout(() => {
      HideLoading();
    }, 2000);
  };

  return (
    <PageWrapper
      logo={t("logo")}
      navigation={t("navigation", { returnObjects: true })}>
      <div>
        <h1>{t("h1")}</h1>
        <Button onClick={load}>showLoading</Button>
        <Button onClick={testGet}>test GET</Button>
        <Button onClick={testPost}>test POST</Button>
        <Button onClick={testPut}>test PUT</Button>
        <Button onClick={testPatch}>test PATCH</Button>
        <Button onClick={testDelete}>test DELETE</Button>
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

export default Test;
