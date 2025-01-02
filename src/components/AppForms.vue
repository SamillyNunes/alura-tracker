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

      <CustomTimer @on-stop-timer="endTask" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import CustomTimer from "./CustomTimer.vue";
import { useStore } from "vuex";
import { storeKey } from "@/store";

export default defineComponent({
  name: "AppForms",
  components: { CustomTimer },
  emits: ["onSaveTask"],
  data() {
    return {
      description: "",
      projectId: '',
    };
  },
  methods: {
    endTask(elapsedTime: number): void {
      this.$emit("onSaveTask", {
        durationInSeconds: elapsedTime,
        description: this.description,
        project: this.projects.find(p=> p.id===this.projectId),
      });

      this.description = "";
    },
  },
  setup(){
    const store = useStore(storeKey);
    // tudo que retornamos no setup fica disponivel para o componente
    return {
      // retornamos dentro do computed porque a lista eh dinamica,
      // e pode receber alteracoes, logo ele ficara ouvindo
      projects: computed(() => store.state.projects),
    }
  }
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
