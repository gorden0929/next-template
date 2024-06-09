import type { FC } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./topbar.module.scss";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SunIcon, MoonIcon, LogOut } from "lucide-react";
import { useTheme } from "next-themes";
import { Alert } from "../alert/alert";
import { languages } from "@/utilities/utilities";

const navPath: any = {
  home: "/",
  about: "/about",
  login: "/login",
};

type Props = {
  logo: string;
  navigation: Record<string, string>;
};

const Topbar: FC<Props> = (props) => {
  const router = useRouter();
  const { setTheme } = useTheme();
  const { pathname, asPath, query, locale } = router;
  // const { t, i18n, ready } = useTranslation(translationFiles);

  return (
    <header className="md:container flex flex-row items-center gap-3 justify-between p-2 border-b border-muted mb-3">
      <div className="flex flex-row items-center gap-3">
        <Link href="/">{props.logo}</Link>
        {Object.keys(props.navigation).map((key) => (
          <Link key={key} href={navPath[key]}>
            {props.navigation[key]}
          </Link>
        ))}
      </div>
      <div className="flex flex-row items-center gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              {
                languages.find((language) => language.isoCode === locale)
                  ?.shortLabel
              }
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {languages.map((language) => (
              <DropdownMenuItem key={language.isoCode} asChild>
                <Link
                  href={{ pathname, query }}
                  locale={language.isoCode}
                  as={asPath}>
                  {language.label}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Alert
          description="Are you sure you want to logout?"
          confirm={() => console.log("logout")}>
          <Button variant="outline" size="icon">
            <LogOut className="h-[1.2rem] w-[1.2rem]" />
          </Button>
        </Alert>
      </div>
    </header>
  );
};

// getServerSidePropsFn(translationFiles);

export default Topbar;
