<template>
  <section class="projects">
    <h1>Projetos</h1>

    <router-link to="/projects/new" class="button">
      <span class="icon is-small">
        <i class="fas fa-plus"></i>
      </span>
      <span>Novo projeto</span>
    </router-link>

    <table v-if="projects.length" class="table is-fullwidth">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="project in projects" :key="project.id">
          <td>{{ project.id }}</td>
          <td>{{ project.name }}</td>
          <td>
            <router-link :to="`/projects/${project.id}`" class="button">
              <span class="icon is-small">
                <i class="fas fa-pencil-alt"></i>
              </span>
            </router-link>

            <button
              class="button ml-2 is-danger"
              @click="deleteProject(project.id)"
            >
              <span class="icon is-small">
                <i class="fas fa-trash"></i>
              </span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script lang="ts">
import { customUseStore } from "@/store";
import { GET_PROJECTS_ACTION } from "@/store/actions_types";
import { DELETE_PROJECT } from "@/store/mutations_type";
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "ProjectsList",
  setup() {
    const store = customUseStore();
    store.dispatch(GET_PROJECTS_ACTION);

    return {
      projects: computed(() => store.state.projects),
      store,
    };
  },
  methods: {
    deleteProject(id: string): void {
      this.store.commit(DELETE_PROJECT, id);
    },
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
