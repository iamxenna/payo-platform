import { toast } from "react-toastify";
import { NotyTypes } from "./Notification.interfaces";
import { Warning, Error, Success } from "Components/Assets/Notification";

export const NOTIFICATIONS = {
  [NotyTypes.SUCCESS]: {
    action: toast.success,
    icon: Success,
    className: "notification_success",
    titleColor: "var(--white_payo)",
    contentColor: "var(--white_payo)",
  },
  [NotyTypes.WARNING]: {
    action: toast.warn,
    icon: Warning,
    className: "notification_warning",
    titleColor: "var(--white_payo)",
    contentColor: "var(--white_payo)",
  },
  [NotyTypes.ERROR]: {
    action: toast.error,
    icon: Error,
    className: "notification_error",
    titleColor: "var(--white_payo)",
    contentColor: "var(--white_payo)",
  },
};
