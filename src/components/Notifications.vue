<template>
  <div class="notifications">
    <article class="message is-success">
      <div class="message-header">Atenção!</div>
      <div class="message-body">
        Aqui vai um texto de notificação bem bacana.
      </div>
    </article>

    
    <article class="message is-warning">
      <div class="message-header">Atenção!</div>
      <div class="message-body">
        Aqui vai um texto de notificação bem bacana.
      </div>
    </article>

    
    <article class="message is-danger">
      <div class="message-header">Atenção!</div>
      <div class="message-body">
        Aqui vai um texto de notificação bem bacana.
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AppNotifications",
});
</script>

<style lang="css" scoped>

.notifications{
    position: absolute;
    right: 0;
    width: 300px;
    padding: 8px;

    z-index: 999;
}

</style>