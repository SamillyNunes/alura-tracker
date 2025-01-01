<template>
  <main 
    class="columns is-gapless is-multiline "
    :class="{'dark-mode': darkModeEnabled}"
  >
    <div class="column is-one-quarter">
      <SideBar @on-changed-theme="changeTheme" />
    </div>

    <div class="column is-three-quarter content">
      <AppForms @on-save-task="saveTask" />

      <div class="lista">
        <CustomTask 
          v-for="task in tasks"
          :key="task.description"
          :task="task"
        />

        <AppBox v-if="tasks.length===0" >
          Você não está muito produtivo hoje :(
        </AppBox>
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
import AppBox from "./components/AppBox.vue";

export default defineComponent({
  name: "App",
  components: { SideBar, AppForms, CustomTask, AppBox },
  data() {
    return {
      tasks: [] as ITask[],
      darkModeEnabled: false,
    }
  },
  methods: {
    saveTask(task: ITask): void{
      this.tasks.push(task);
    },
    changeTheme(isDarkModeEnabled: boolean): void{
      this.darkModeEnabled=isDarkModeEnabled;
    }
  }
});
</script>

<style>
.lista {
  padding: 1.25rem;
}

main {
  --bg-primay: #fff;
  --text-primary: #000;
}

main.dark-mode {
  --bg-primay: #2b2d42;
  --text-primary: #ddd;
}

.content{
  background-color: var(--bg-primay);
}

</style>
