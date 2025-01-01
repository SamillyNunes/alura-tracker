<template>
  
  <main class="columns is-gapless is-multiline">
    <div class="column is-one-quarter">
      <SideBar />
    </div>

    <div class="column is-three-quarter">
      <AppForms />

      <div class="lista">
        <CustomTask />
        <CustomTask />
        <CustomTask />
      </div>

    </div>

    

  </main>

</template>

<script lang="ts">
import { defineComponent } from "vue";
import SideBar from "./components/SideBar.vue";
import AppForms from "./components/AppForms.vue";
import CustomTask from "./components/CustomTask.vue";

export default defineComponent({
  name: "App",
  components: { SideBar, AppForms, CustomTask }
});
</script>

<style scoped>

.lista{
  padding: 1.25rem;
}

</style>
