<template>
  <div class="notifications">
    <article
      v-for="notification in notifications"
      :key="notification.id"
      :class="`message ${context[notification.type]}`"
    >
      <div class="message-header">{{ notification.title }}</div>
      <div class="message-body">
        {{ notification.text }}
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import { NotificationType } from "@/interfaces/INotification";
import { customUseStore } from "@/store";
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "AppNotifications",
  data(){
    return {
        context: {
            [NotificationType.SUCCESS]: 'is-success',
            [NotificationType.WARNING]: 'is-warning',
            [NotificationType.FAIL]: 'is-danger',
        }
    }
  },
  setup() {
    const store = customUseStore();

    return {
      notifications: computed(() => store.state.notifications),
    };
  },
});
</script>

<style lang="css" scoped>
.notifications {
  position: absolute;
  right: 0;
  width: 300px;
  padding: 8px;

  z-index: 999;
}
</style>
