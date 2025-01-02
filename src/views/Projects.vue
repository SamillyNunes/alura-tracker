<template>
  <section class="projects">
    <h1>Projetos</h1>

    <router-link to="/projects/new" class="button">
        <span class="icon is-small">
            <i class="fas fa-plus"></i>
        </span>
        <span>Novo projeto</span>
    </router-link>

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
  setup() {
    const store = customUseStore();

    return {
      projects: computed(() => store.state.projects),
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

.table {
  margin-top: 1rem;
}
</style>
