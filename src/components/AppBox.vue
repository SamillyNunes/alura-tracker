<template>
  <div class="box has-text-weight-bold">
    <!-- Esse slot significa que vai renderizar os filhos que vierem
     encapsulados dentro desse componente -->
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AppBox",
});
</script>

<style lang="css" scoped>
.box {
  background-color: #b1b1b1;
  color: var(--text-primary);
}
</style>
