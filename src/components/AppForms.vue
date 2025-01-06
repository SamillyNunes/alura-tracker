<template>
  <div class="box forms">
    <div class="columns">
      <div
        class="column is-5"
        role="form"
        aria-label="Formulário para criação de uma nova tarefa"
      >
        <input
          type="text"
          class="input description"
          placeholder="Qual tarefa você deseja iniciar?"
          v-model="description"
        />
      </div>

      <div class="column is-3">
        <div class="select">
          <select v-model="projectId">
            <option value="">Selecione o projeto</option>
            <option
              v-for="project in projects"
              :value="project.id"
              :key="project.id"
            >
              {{ project.name }}
            </option>
          </select>
        </div>
      </div>

      <CustomTimer
        :can-start-timer="projectId !== ''"
        @on-timer-cant-start="notifyProjectIdIsEmpty"
        @on-stop-timer="endTask"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import CustomTimer from "./CustomTimer.vue";
import { useStore } from "vuex";
import { storeKey } from "@/store";
import { NotificationType } from "@/interfaces/INotification";
import { notifyMixin } from "@/mixins/notify";
import useNotifier from "@/hooks/notifier";

export default defineComponent({
  name: "AppForms",
  components: { CustomTimer },
  emits: ["onSaveTask"],
  mixins: [notifyMixin],
  setup(props, {emit}) {
    const store = useStore(storeKey);
    const { notify } = useNotifier();

    const description = ref("");
    const projectId = ref("");

    const projects = computed(() => store.state.project.projects);

    const notifyProjectIdIsEmpty = () => {
      notify(
        NotificationType.FAIL,
        "Erro",
        "Você não atribuiu um projeto a sua tarefa. Por favor atribua um projeto antes de iniciar a tarefa"
      );
    };

    const endTask = (elapsedTime: number) => {
      emit("onSaveTask", {
        durationInSeconds: elapsedTime,
        description: description.value,
        project: projects.value.find((p) => p.id === projectId.value),
      });

      description.value = "";
      projectId.value = "";
    };


    // tudo que retornamos no setup fica disponivel para o componente
    return {
      // retornamos dentro do computed porque a lista eh dinamica,
      // e pode receber alteracoes, logo ele ficara ouvindo
      projects,
      description,
      projectId,
      notifyProjectIdIsEmpty,
      endTask,
    };
  },
});
</script>

<style lang="css">
.forms {
  color: var(--text-primary);
  background-color: var(--bg-primary);
}

.input {
  color: var(--text-primary);
  background-color: var(--bg-primary);
}

.input::placeholder {
  color: var(--text-primary);
}
</style>
