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
        <CustomTimer :time-in-seconds="timeInSeconds" />

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
import CustomTimer from "./CustomTimer.vue";

export default defineComponent({
  name: "AppForms",
  components: { CustomTimer },
  data (){
    return {
      timeInSeconds: 0,
      timer: 0,
    }
  },
  methods: {
    startTimer(){
      this.timer = setInterval(() => {
        this.timeInSeconds+=1;
      }, 1000);
    },
    stopTimer(){
      clearInterval(this.timer);
    }
  },
});
</script>
