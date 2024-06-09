import { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useParams, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import PageWrapper from "@/components/widgets/page-wrapper/page-wrapper";

const translationFiles = ["common", "login"];

const Login = () => {
  const { t, i18n, ready } = useTranslation(translationFiles, {
    nsMode: "fallback",
  });
  const searchParams = useSearchParams();
  const params = useParams();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const formOnSubmit = () => {
    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
  };

  return (
    <PageWrapper
      logo={t("logo")}
      navigation={t("navigation", { returnObjects: true })}>
      <h1>{t("h1")}</h1>
      <div>
        <Label>{t("label.username")}</Label>
        <Input
          placeholder={t("label.username")}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Label>{t("label.password")}</Label>
        <Input
          type="password"
          placeholder={t("label.password")}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex items-center space-x-2">
          <Checkbox id="terms" />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Accept terms and conditions
          </label>
        </div>
        <Button onClick={formOnSubmit}>Login</Button>
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

export default Login;
