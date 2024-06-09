import { HideDialog, ShowDialog } from "../utilities/eventBus";
export const DialogType = {
  SUCCESS: 1,
  ERROR: 2,
  MISSING: 3,
  DELETE: 4,
  PUBLISH: 5,
};

export const DialogPack = {
  showDialog: false,
  dialogTitle: "Dialog Title",
  dialogMessage: "This is a dialog message.",
  dialogListInfo: [],
  dialogShowPrimaryButton: false,
  dialogPrimaryButtonLabel: "Button 1",
  dialogPrimaryButtonCallback: () => {},
  dialogShowSecondaryButton: false,
  dialogSecondaryButtonLabel: "",
  dialogSecondaryButtonCallback: () => {},
  dialogShowCheckBox: false,
  dialogSecondaryAsRealMain: false,
  dialogCheckBoxMessage: "",
};

export function GetDialogPack(override: any) {
  const newDialogPack: any = { ...DialogPack };
  newDialogPack.dialogPrimaryButtonCallback = HideDialog;
  newDialogPack.dialogSecondaryButtonCallback = HideDialog;
  Object.keys(override).forEach((eachAttribute) => {
    newDialogPack[eachAttribute] = override[eachAttribute];
  });
  return newDialogPack;
}

export function ShowMessage(type: any, message: any, callback = () => {}) {
  ShowDialog(
    GetDialogPack({
      showDialog: true,
      dialogType: type,
      dialogMessage: message,
      dialogShowPrimaryButton: true,
      dialogPrimaryButtonLabel: "OK",
      dialogPrimaryButtonCallback: () => {
        HideDialog();
        callback();
      },
    }),
  );
}
