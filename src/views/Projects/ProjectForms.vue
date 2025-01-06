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
import { defineComponent, onMounted, ref } from "vue";
import { NotificationType } from "@/interfaces/INotification";
import { customUseStore } from "@/store";
import useNotifier from "@/hooks/notifier";
import {
  SEND_PROJECT_ACTION,
  UPDATE_PROJECT_ACTION,
} from "@/store/actions_types";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "ProjectForms",
  props: {
    id: {
      type: String,
    },
  },
  setup(props) {
    const router = useRouter();

    const store = customUseStore();
    const { notify } = useNotifier();

    // esse ref() eh a criacao de uma variavel reativa
    const projectName = ref("");

    onMounted(() => {
      // Quando o componente for montado, se existir essa prop id, entao...
      if (props.id) {
        // aqui podemos acessar a this.store porque ela foi exportada la no setup()
        const project = store.state.project.projects.find(
          (p) => p.id === props.id
        );

        projectName.value = project?.name || "";
      }
    });

    const save = () => {
      if (props.id) {
        store
          .dispatch(UPDATE_PROJECT_ACTION, {
            id: props.id,
            name: projectName.value,
          })
          .then(() => onSavingSuccess());
      } else {
        // esse commit vai chamar a mutacao, e os params em seguida sao o que a mutacao recebe
        store
          .dispatch(SEND_PROJECT_ACTION, projectName.value)
          .then(() => onSavingSuccess());
      }
    };

    const onSavingSuccess = () => {
      projectName.value = "";

      notify(
        NotificationType.SUCCESS,
        "Novo projeto foi salvo",
        "Prontinho =D seu projeto está disponível"
      );

      router.push("/projects");
    };

    return {
      projectName,
      save,
      onSavingSuccess,
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
