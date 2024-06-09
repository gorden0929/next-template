import { FC, useEffect, useState } from "react";
import Topbar from "../topbar/topbar";
import styles from "./page-wrapper.module.scss";
import { EventBus, HideLoading } from "@/utilities/eventBus";
import Loading from "../loading/loading";

type Props = {
  logo: string;
  navigation: Record<string, string>;
  children: React.ReactNode;
};

const PageWrapper: FC<Props> = ({ children, logo, navigation }) => {
  let currentDialogPriority = 0;
  let dialogPacks: any[] = [];
  let eventBusInitialized = false;
  // const resizeObserver = null;

  const [showLoading, setShowLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [dialogPack, setDialogPack] = useState<any>(null);

  useEffect(() => {
    initiateEventBus();
    setTimeout(() => {
      HideLoading();
    }, 1000);
    return () => {
      EventBus.remove("loading", initLoading);
      EventBus.remove("dialog", initDialog);
    };
  });

  const initiateEventBus = () => {
    if (!eventBusInitialized) {
      EventBus.on("loading", initLoading);
      EventBus.on("dialog", initDialog);
      eventBusInitialized = true;
    }
  };

  const initLoading = (data: any) => {
    setShowLoading(data.showLoading);
    setLoadingMessage(data.loadingMessage);
    if ((data.autoClose || 0) > 0) {
      setTimeout(() => {
        setShowLoading(false);
      }, data.autoClose * 1000);
    }
  };

  const initDialog = (data: any) => {
    if (data.priority === 0) {
      currentDialogPriority = 0;
      if (dialogPacks.length > 0) {
        setDialogPack(dialogPacks[0]);
        dialogPacks.splice(0, 1);
      }
      setDialogPack(data.dialogPack);
      return;
    }

    if (data.priority < currentDialogPriority) {
      dialogPacks.push(data.dialogPack);
      return;
    }
    setDialogPack(data.dialogPack);
  };

  return (
    <>
      <Topbar logo={logo} navigation={navigation} />
      <main className="md:container">{children}</main>
      <Loading show={showLoading} message={loadingMessage} />
    </>
  );
};
export default PageWrapper;
