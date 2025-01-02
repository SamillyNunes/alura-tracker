<template>
  <header>
    <h1>
      <img src="../assets/logo.png" alt="Logo da aplicação" />
    </h1>

    <nav>
      <ul>
        <li>
          <router-link to="/" class="link">
            <i class="fas fa-tasks"></i>
            Tarefas
          </router-link>
        </li>
        <li>
          <router-link to="/projects"  class="link">
            <i class="fas fa-project-diagram"></i>
            Projetos
          </router-link>
        </li>
      </ul>

    </nav>

    <button class="button" @click="changeTheme">
      {{ darkModeEnabled ? "Desativar" : "Ativar" }} modo escuro
    </button>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SideBar",
  emits: ["onChangedTheme"],
  data() {
    return {
      darkModeEnabled: false,
    };
  },
  methods: {
    changeTheme() {
      this.darkModeEnabled = !this.darkModeEnabled;
      this.$emit("onChangedTheme", this.darkModeEnabled);
    },
  },
});
</script>

<style lang="css" scoped>
header {
  background: #0d3b66;
  width: 100%;
  height: 100vh;
  padding-top: 1rem;

  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;
}

.button {
  position: absolute;
  bottom: 1rem;
}

nav{
  margin-top: 1.5rem;
}

nav li{
  margin: 1.5rem 0;
  padding: 0.5rem;
}

nav li i{
  margin-right: 1rem;
}

.link{
  color: #fff;
}

.link:hover{
  color: #fde143;
}

.link.router-link-active{
  color: #FAF0CA;
}

@media only screen and (max-width: 768px) {
  header {
    padding: 2.5rem;
    height: auto;
  }
  .button {
    position: relative;
  }
}
</style>
