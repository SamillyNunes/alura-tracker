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

    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="project in projects" :key="project.id">
          <td>{{ project.id }}</td>
          <td>{{ project.name }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script lang="ts">
import { customUseStore } from "@/store";
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "ProjectsView",
  data() {
    return {
      projectName: "",
    };
  },
  methods: {
    save(): void {
      // esse commit vai chamar a mutacao, e os params em seguida sao o que a mutacao recebe
      this.store.commit('ADD_PROJECT', this.projectName);

      this.projectName = "";
    },
  },
  setup() {
    const store = customUseStore();

    return {
      store,
      projects: computed(()=> store.state.projects)
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

.table {
  margin-top: 1rem;
}
</style>
