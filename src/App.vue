<template>
  <main class="columns is-gapless is-multiline">
    <div class="column is-one-quarter">
      <SideBar />
    </div>

    <div class="column is-three-quarter">
      <AppForms @on-save-task="saveTask" />

      <div class="lista">
        <CustomTask 
          v-for="task in tasks"
          :key="task.description"
          :task="task"
        />
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SideBar from "./components/SideBar.vue";
import AppForms from "./components/AppForms.vue";
import CustomTask from "./components/CustomTask.vue";
import ITask from "./interfaces/ITask";

export default defineComponent({
  name: "App",
  components: { SideBar, AppForms, CustomTask },
  data() {
    return {
      tasks: [] as ITask[],
    }
  },
  methods: {
    saveTask(task: ITask): void{
      this.tasks.push(task);
    }
  }
});
</script>

<style scoped>
.lista {
  padding: 1.25rem;
}
</style>
