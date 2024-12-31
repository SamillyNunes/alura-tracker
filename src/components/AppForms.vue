<template>
  <div class="box">
    <div class="columns">
      <div
        class="column is-8"
        role="form"
        aria-label="Formulário para criação de uma nova tarefa"
      >
        <input type="text" class="input" />
      </div>

      <div
        class="column is-flex is-align-items-center is-justify-content-space-between"
      >
        <section>
          <strong>{{ timeFormated }}</strong>
        </section>

        <button class="button" @click="startTimer">
          <span class="icon">
            <i class="fas fa-play"></i>
          </span>
          <span>play</span>
        </button>

        <button class="button" @click="stopTimer">
          <span class="icon">
            <i class="fas fa-stop"></i>
          </span>
          <span>stop</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AppForms",
  data (){
    return {
      timeInSeconds: 0,
    }
  },
  computed: {
    timeFormated(): string {
      // Primeiro vai passar os segundos convertido para milissegundos, para que o Date absorva a informacao de tempo
      // Depois vai passar para o formato: 2024-12-08T15:45:00 , e por isso pegamos em seguida a partir da posicao 11, ate o caractere 19
      return new Date(
        this.timeInSeconds*1000,
      ).toISOString().substring(11,19);
    }
  },
  methods: {
    startTimer(){
      setInterval(() => {
        this.timeInSeconds+=1;
      }, 1000);
    },
    stopTimer(){
      console.log('Finalizando...');
    }
  },
});
</script>
