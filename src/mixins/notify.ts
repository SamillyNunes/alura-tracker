import { NotificationType } from "@/interfaces/INotification";
import { store } from "@/store";
import { NOTIFY } from "@/store/mutations_type";

// a ideia do mixin eh reaproveitar código
export const notifyMixin = {
  methods: {
    notify(notificationType: NotificationType, title: string, message: string) {
      store.commit(NOTIFY, {
        title,
        text: message,
        type: notificationType,
      });
    },
  },
};
