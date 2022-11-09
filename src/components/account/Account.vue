<template>
    <div class="container-account">
       <button @click="handlerBag">{{user.username}} </button>
       <button @click="handlerProjects"  >Projects </button>
       <button @click="handlerQuiz">Quiz </button>
       <button @click="handlerQuestion">Questions </button>
       <button @click="handlerAnswer">Answers </button>
       <img v-if="uriNft" :src="uriNft" alt="">
    </div>
    <Bag v-if="openBag"></Bag>
    <Projects v-if="openProjects"></Projects>
    <Quizes v-if="openQuiz"></Quizes>
    <Questions v-if="openQuestions"></Questions>
    <Answers v-if="openAnswers"></Answers>
    
        
    
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
    stateuser.getUri().then((res)=>{
        debugger
        //btoa(res.split(','))
        console.log(res);
        uriNft.value=res;
    }); 
}
</script>

<style scoped >

</style>