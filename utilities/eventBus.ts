import { DialogPack } from "@/configs/DialogConstants";

type EventCallback = (data: any) => void;

interface EventDetail {
  showLoading: boolean;
  loadingMessage: string | string[];
}

export const EventBus = {
  on(event: string, callback: EventCallback) {
    document.addEventListener(event, (e: Event) => {
      const customEvent = e as CustomEvent;
      callback(customEvent.detail);
    });
  },
  dispatch(event: string, data: any) {
    document.dispatchEvent(new CustomEvent(event, { detail: data }));
  },
  remove(event: string, callback: EventCallback) {
    document.removeEventListener(event, callback as EventListener);
  },
};

export const ShowLoading = (message: string | string[] = []) => {
  if (message && !Array.isArray(message)) {
    message = [message];
  }
  EventBus.dispatch("loading", { showLoading: true, loadingMessage: message });
};

export const HideLoading = () => {
  EventBus.dispatch("loading", { showLoading: false, loadingMessage: "" });
};

export const ShowDialog = (dialogPack: any, priority = 10) => {
  dialogPack.showDialog = true;
  EventBus.dispatch("dialog", {
    dialogPack: dialogPack,
    priority: priority,
  });
};

export const HideDialog = (gameKey = "") => {
  EventBus.dispatch("dialog", {
    showDialog: false,
    dialogPack: DialogPack,
    priority: 0,
  });
};
