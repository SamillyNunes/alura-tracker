<template>
  <div
    class="column is-flex is-align-items-center is-justify-content-space-between"
  >
    <TimerDisplay :time-in-seconds="timeInSeconds" />

    <AppButton
      label="play"
      fa-icon="fa-play"
      :is-disabled="timerRunning"
      @on-click="startTimer"
    />

    <AppButton
      label="stop"
      fa-icon="fa-stop"
      :is-disabled="!timerRunning"
      @on-click="stopTimer"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TimerDisplay from "./TimerDisplay.vue";
import AppButton from "./AppButton.vue";

export default defineComponent({
  name: "CustomTimer",
  emits: ["onStopTimer", "onTimerCantStart"],
  components: { TimerDisplay, AppButton },
  props: {
    canStartTimer: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  data() {
    return {
      timeInSeconds: 0,
      timer: 0,
      timerRunning: false,
    };
  },
  methods: {
    startTimer() {
      if (this.canStartTimer) {
        this.timerRunning = true;

        this.timer = setInterval(() => {
          this.timeInSeconds += 1;
        }, 1000);
      } else {
        this.$emit("onTimerCantStart");
      }
    },
    stopTimer() {
      this.timerRunning = false;
      clearInterval(this.timer);
      this.$emit("onStopTimer", this.timeInSeconds);
      this.timeInSeconds = 0;
    },
  },
});
</script>
