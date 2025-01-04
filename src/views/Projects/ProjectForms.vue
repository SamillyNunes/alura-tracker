<template>
  <section class="projects">
    <h1>{{ id ? "Editar " : "Criar novo " }}projeto</h1>

    <form @submit.prevent="save">
      <div class="field">
        <label for="projectName" class="label"> Nome do projeto </label>
        <input
          type="text"
          class="input"
          v-model="projectName"
          id="projectName"
        />
      </div>
      <div class="field">
        <button class="button" type="submit">
          {{ id ? "Salvar edição" : "Salvar" }}
        </button>
      </div>
    </form>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { NotificationType } from "@/interfaces/INotification";
import { customUseStore } from "@/store";
import useNotifier from "@/hooks/notifier";
import {
  SEND_PROJECT_ACTION,
  UPDATE_PROJECT_ACTION,
} from "@/store/actions_types";

export default defineComponent({
  name: "ProjectForms",
  props: {
    id: {
      type: String,
    },
  },
  // quando esse componente for montado...
  mounted() {
    // se existir essa prop id, entao...
    if (this.id) {
      // aqui podemos acessar a this.store porque ela foi exportada la no setup()
      const project = this.store.state.project.projects.find((p) => p.id === this.id);

      this.projectName = project?.name || "";
    }
  },
  data() {
    return {
      projectName: "",
    };
  },
  methods: {
    save(): void {
      if (this.id) {
        this.store
          .dispatch(UPDATE_PROJECT_ACTION, {
            id: this.id,
            name: this.projectName,
          })
          .then(() => this.onSavingSuccess());
      } else {
        // esse commit vai chamar a mutacao, e os params em seguida sao o que a mutacao recebe
        this.store
          .dispatch(SEND_PROJECT_ACTION, this.projectName)
          .then(() => this.onSavingSuccess());
      }
    },
    onSavingSuccess() {
      this.projectName = "";

      this.notify(
        NotificationType.SUCCESS,
        "Novo projeto foi salvo",
        "Prontinho =D seu projeto está disponível"
      );

      this.$router.push("/projects");
    },
  },
  setup() {
    const store = customUseStore();
    const { notify } = useNotifier();

    return {
      store,
      notify,
    };
  },
});
</script>

<style lang="css" scoped>
section h1 {
  color: #000;
}

.projects {
  padding: 1.25rem;
}

.label {
  color: #000;
}
</style>
