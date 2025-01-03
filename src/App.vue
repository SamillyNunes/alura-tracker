<template>
  <main
    class="columns is-gapless is-multiline"
    :class="{ 'dark-mode': darkModeEnabled }"
  >
    <div class="column is-one-quarter">
      <SideBar @on-changed-theme="changeTheme" />
    </div>

    <div class="column is-three-quarter content">
      <Notifications/>

      <!-- Aqui vai as views de acordo com a rota -->
      <router-view> </router-view>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SideBar from "./components/SideBar.vue";
import Notifications from "./components/Notifications.vue";

export default defineComponent({
  name: "App",
  components: { SideBar, Notifications },
  data() {
    return {
      darkModeEnabled: false,
    };
  },
  methods: {
    changeTheme(isDarkModeEnabled: boolean): void {
      this.darkModeEnabled = isDarkModeEnabled;
    },
  },
});
</script>

<style>
main {
  --bg-primay: #fff;
  --text-primary: #000;
}

main.dark-mode {
  --bg-primay: #2b2d42;
  --text-primary: #ddd;
}

.content {
  background-color: var(--bg-primay);
}
</style>
