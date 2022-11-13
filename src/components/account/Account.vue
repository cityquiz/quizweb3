<template>
    <div class="container-account">
       <button @click="handlerBag">{{user.username}} </button>
       <button @click="handlerProjects"  >NPC </button>
       <button @click="handlerQuiz">Preguntas </button>
       <button @click="handlerQuestion">Opciones </button>
       <!-- <button @click="handlerAnswer">Answers </button> -->
       
       <div class="container-logo"><img class="logo-canvas" src="/assets/logo.png" ></div>   
    </div>
    
    
    <Bag v-if="openBag"></Bag>
    <Projects v-if="openProjects" :key="'npc'"></Projects>
    <Quizes v-if="openQuiz" :key="'qu'"></Quizes>
    <Questions v-if="openQuestions" :key="'questions'"></Questions>
    <Answers v-if="openAnswers" :key="'respuesta'"></Answers>
    
        
    
</template>

<script setup lang="ts">


import { computed, ref } from 'vue';

import { useWallet } from './../../stores/store-wallet';

import Projects from "./Projects.vue";
import Bag from "./Bag.vue";
import Quizes from "./Quizes.vue";
import Questions from "./Questions.vue";
import Answers from "./Answers.vue";
import { useQuiz } from '@/stores/store-quiz3';

const uriNft= ref()
const stateuser = useWallet();
const storeQuiz = useQuiz();

const user= computed(()=>stateuser.getUser);


const openBag = computed(()=>storeQuiz.isOpenBag);
const openProjects = computed(()=>storeQuiz.isOpenProjects);
const openQuiz = computed(()=>storeQuiz.isOpenQuiz);
const openQuestions = computed(()=>storeQuiz.isOpenQuestions);
const openAnswers = computed(()=>storeQuiz.isOpenAnswers);

const handlerProjects = ()=>{
  storeQuiz.toggleProjects();
}

const handlerBag = ()=>{
  storeQuiz.toggleBag();
  //handlerClaim();
  
}


const handlerQuiz = ()=>{
  storeQuiz.toggleQuiz();
}

const handlerQuestion = ()=>{
  storeQuiz.toggleQuestions();
}

const handlerAnswer = ()=>{
  storeQuiz.toggleAnswers();
  
}



const handlerClaim=()=>{
    /* stateuser.getUri().then((res)=>{
        debugger
        //btoa(res.split(','))
        console.log(res);
        uriNft.value=res;
    });  */
}
</script>

<style  scoped>
  .container-logo{
    height: 23px;
    margin-left: auto;
    margin-right: auto;
    padding-left: 5px;
    padding-right: 5px;
    padding-top: 2px;
 
    float: right;
    background-color: white;
  }

  .logo-canvas{
    height: 20px;
    display: block;
    
  }
  .float-right{
    float: right;
  }
  .container-account button{
    /* border-style: dotted; */
    margin-right: 3px;
  }
</style>