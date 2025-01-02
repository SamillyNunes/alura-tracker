<template>
  <AppBox>
    <div class="columns">
      <div class="column is-7">
        {{ task.description || "Tarefa sem descrição" }}
      </div>

      <div class="column">
        <TimerDisplay :timeInSeconds="task.durationInSeconds" />
      </div>
    </div>
  </AppBox>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import TimerDisplay from "./TimerDisplay.vue";
import ITask from "@/interfaces/ITask";
import AppBox from "./AppBox.vue";

export default defineComponent({
  name: "CustomTask",
  components: { TimerDisplay, AppBox },
  props: {
    task: {
      type: Object as PropType<ITask>,
      required: true,
    },
  },
});
</script>
