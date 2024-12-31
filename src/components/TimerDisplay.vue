<template>
    <section>
        <strong>{{ timeFormated }}</strong>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';


export default defineComponent({
    name: 'TimerDisplay',
    props: {
        timeInSeconds: {
            type: Number,
            default: 0,
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
});

</script>