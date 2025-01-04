<template>
  <AppForms @on-save-task="saveTask" />

  <div class="lista">
    <CustomTask
      v-for="task in tasks"
      :key="task.description"
      :task="task"
      @on-task-clicked="selectTask"
    />

    <AppBox v-if="tasksListIsEmpty">
      Você não está muito produtivo hoje :(
    </AppBox>

    <div
      class="modal"
      :class="{ 'is-active': selectedTask }"
      v-if="selectedTask"
    >
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Editando tarefa</p>
          <button
            class="delete"
            aria-label="close"
            @click="closeModal"
          ></button>
        </header>
        <section class="modal-card-body">
          <!-- Content ... -->
          <div class="field">
            <label for="taskDescription" class="label">
              Descrição da tarefa
            </label>
            <input
              type="text"
              class="input"
              id="taskDescription"
              v-model="selectedTask.description"
            />
          </div>
        </section>
        <footer class="modal-card-foot">
          <div class="buttons">
            <button class="button is-success" @click="updateTask">
              Salvar alterações
            </button>
            <button class="button" @click="closeModal">Cancelar</button>
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

import AppForms from "@/components/AppForms.vue";
import CustomTask from "@/components/CustomTask.vue";
import ITask from "@/interfaces/ITask";
import AppBox from "@/components/AppBox.vue";
import { customUseStore } from "@/store";
import {
  GET_PROJECTS_ACTION,
  GET_TASKS_ACTION,
  SEND_TASK_ACTION,
  UPDATE_TASK_ACTION,
} from "@/store/actions_types";

export default defineComponent({
  name: "TasksView",
  components: { AppForms, CustomTask, AppBox },
  setup() {
    const store = customUseStore();
    store.dispatch(GET_TASKS_ACTION);
    store.dispatch(GET_PROJECTS_ACTION);

    return {
      store,
      tasks: computed(() => store.state.task.tasks),
    };
  },
  data() {
    return {
      selectedTask: null as ITask | null,
    };
  },
  computed: {
    tasksListIsEmpty(): boolean {
      if (this.tasks != undefined) {
        return this.tasks.length === 0;
      }

      return true;
    },
  },
  methods: {
    saveTask(task: ITask): void {
      this.store.dispatch(SEND_TASK_ACTION, task);
    },
    selectTask(task: ITask): void {
      this.selectedTask = task;
    },
    closeModal(): void {
      this.selectedTask = null;
    },
    updateTask(): void {
      this.store
        .dispatch(UPDATE_TASK_ACTION, this.selectedTask)
        .then(() => this.closeModal());
    },
  },
});
</script>

<style scoped>
.lista {
  padding: 1.25rem;
}
</style>
