<template>
  <div class="modal" :class="{ 'is-active': show }" v-if="show">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <slot name="head"></slot>
      </header>
      <section class="modal-card-body">
        <slot name="body"></slot>
      </section>
      <footer class="modal-card-foot">
        <slot name="foot"></slot>
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: 'CustomModal',
    props:{
        show:{
            type: Boolean,
            required: true,
        }
    }
});
</script>
