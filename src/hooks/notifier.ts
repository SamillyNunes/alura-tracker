import { INotification, NotificationType } from "@/interfaces/INotification";
import { store } from "@/store";
import { NOTIFY } from "@/store/mutations_type";

type Notifier = {
  notify: (
    notificationType: NotificationType,
    title: string,
    message: string
  ) => void;
};

export default (): Notifier => {
  const notify = (
    notificationType: NotificationType,
    title: string,
    message: string
  ) =>
    store.commit(NOTIFY, {
      title,
      text: message,
      type: notificationType,
    } as INotification);

  return {
    notify,
  };
};
