<template>
    <div ref="game" class="game-container">
        
        <canvas class="game-canvas" width="704" height="396"></canvas>
        
    </div>
</template>

<script setup lang="ts">

    import { onMounted, ref,  } from "vue";
    import {Overworld} from "../city/world";
    
    const game= ref<HTMLDivElement>();
    
    let overworld:Overworld ;
    onMounted(()=>{
        overworld =  new Overworld({
            element: game.value! //document.querySelector(".game-container")!
        });
        overworld.init();
    });


 


</script>

<style>
@import "./../assets/css/Hub.css";
/* @import "./../assets/css/Mochila.css"; */
@import "./../assets/css/TextMessage.css";
@import "./../assets/css/KeyboardMenu.css";
@import "./../assets/css/QuizMenu.css";
@import "./../assets/css/Battle.css";
@import "./../assets/css/SceneTransition.css";
@import "./../assets/css/Combatant.css";





</style>