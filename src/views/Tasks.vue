<template>
  <AppForms @on-save-task="saveTask" />

  <div class="lista">
    <CustomTask v-for="task in tasks" :key="task.description" :task="task" />

    <AppBox v-if="tasks.length === 0">
      Você não está muito produtivo hoje :(
    </AppBox>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

import AppForms from "@/components/AppForms.vue";
import CustomTask from "@/components/CustomTask.vue";
import ITask from "@/interfaces/ITask";
import AppBox from "@/components/AppBox.vue";
import { customUseStore } from "@/store";
import { GET_TASKS_ACTION } from "@/store/actions_types";

export default defineComponent({
  name: "TasksView",
  components: { AppForms, CustomTask, AppBox },
  setup() {
    const store = customUseStore();
    store.dispatch(GET_TASKS_ACTION);
    store.dispatch(GET_PROJECTS_ACTION);

    return {
      store,
      tasks: computed(() => store.state.tasks),
    };
  },
  methods: {
    saveTask(task: ITask): void {
      this.tasks.push(task);
    },
  },
});
</script>

<style scoped>
.lista {
  padding: 1.25rem;
}
</style>
