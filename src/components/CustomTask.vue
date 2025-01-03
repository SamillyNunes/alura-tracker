<template>
  <AppBox>
    <div class="columns task" @click="onTaskClicked">
      <div class="column is-4">
        {{ task.description || "Tarefa sem descrição" }}
      </div>

      <div class="column is-3">
        {{ task.project.name }}
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
  emits: ['onTaskClicked'],
  props: {
    task: {
      type: Object as PropType<ITask>,
      required: true,
    },
  },
  methods: {
    onTaskClicked(): void{
      this.$emit('onTaskClicked', this.task);
    }
  }
});
</script>

<style lang="css" scoped>

.task{
  cursor: pointer;
}

</style>