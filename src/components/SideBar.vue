<template>
  <header>
    <h1>
      <img src="../assets/logo.png" alt="Logo da aplicação" />
    </h1>

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
