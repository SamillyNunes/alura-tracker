<template>
  <section class="projects">
    <h1>Projetos</h1>

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
        <button class="button" type="submit">Salvar</button>
      </div>
    </form>
  </section>
</template>

<script lang="ts">
import { customUseStore } from "@/store";
import { defineComponent } from "vue";

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
      const project = this.store.state.projects.find((p) => p.id === this.id);

      this.projectName = project?.name || '';
    }
  },
  data() {
    return {
      projectName: "",
    };
  },
  methods: {
    save(): void {
      // esse commit vai chamar a mutacao, e os params em seguida sao o que a mutacao recebe
      this.store.commit("ADD_PROJECT", this.projectName);

      this.projectName = "";

      this.$router.push("/projects");
    },
  },
  setup() {
    const store = customUseStore();

    return {
      store,
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
