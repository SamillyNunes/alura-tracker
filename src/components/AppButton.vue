<template>

    <button class="button" @click="onClick" :disabled="isDisabled">
      <span class="icon">
        <i :class="`fas ${faIcon}`"></i>
      </span>
      <span> {{ label }} </span>
    </button>

</template>

<script lang="ts">
import { defineComponent } from 'vue';


export default defineComponent({
    name: 'AppButton',
    emits: ['onClick'],
    props: {
        label: {
            type: String,
            required: true,
        },
        faIcon: {
            type: String,
            required: true,
        },
        isDisabled: {
            type: Boolean,
            default: false,
        }
    },
    methods: {
        onClick(): void{
            this.$emit('onClick');
        }
    }
});

</script>