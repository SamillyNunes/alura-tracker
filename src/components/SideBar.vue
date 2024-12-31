<template>

    <header>
        <h1>
            <img src="../assets/logo.png" alt="Logo da aplicação" />
        </h1>
    </header>

</template>

<script lang="ts">

import { defineComponent } from 'vue';

export default defineComponent({
    name: 'SideBar',
});

</script>

<style lang="css" scoped>

header{
    background: #0d3b66;
    width: 100%;
    height: 100vh;
    padding-top: 1rem;

    display: flex;
    justify-content: center;
}

@media only screen and (max-width: 768px){
    header{
        padding: 2.5rem;
        height: auto;
    }    
}

</style>