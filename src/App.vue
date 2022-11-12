<template>

  <Register v-if="!isConnected"></Register>
  <Game v-if="user?.username"></Game>
<!--   <header>
    
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />
 
  
  </header>

  <main>
    <Game></Game>
  </main> -->
</template>

<script setup lang="ts">
  import { computed } from "vue";
  import Game from "./components/Game.vue"
  import Register from "./components/Register.vue"
  import { useWallet } from "./stores/store-wallet";
  

  const stateWallet = useWallet();
  stateWallet.initStorage();

  const user= computed(()=>stateWallet.getUser);

  const isConnected = computed(()=>{
    
    const username= stateWallet.isConnected;
    console.log(username);


    return username;
  });


</script>

<style>

</style>
