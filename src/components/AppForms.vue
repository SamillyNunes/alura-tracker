<template>
  <div class="box">
    <div class="columns">
      <div
        class="column is-8"
        role="form"
        aria-label="Formulário para criação de uma nova tarefa"
      >
        <input 
          type="text" 
          class="input" 
          placeholder="Qual tarefa você deseja iniciar?"  
          v-model="description"
        />
      </div>

      <CustomTimer @on-stop-timer="endTask" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CustomTimer from "./CustomTimer.vue";

export default defineComponent({
  name: "AppForms",
  components: { CustomTimer },
  data() {
    return {
      description: '',
    }
  },
  methods: {
    endTask(elapsedTime: number) : void{
      alert('Finalizado!');
      this.description='';

    }
  }
});
</script>
