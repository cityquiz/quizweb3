<template>
    <div class="container">

        <table class="table">
            <tr>
                <th>
                    <span>{{pregunta?.name}}</span>
                    
                </th>
                <th>
                    <span class="title-answer" v-if="pregunta!.id"> <button @click="editAnswer()" class="btn-add">Risposta</button></span>
                </th>
            </tr>
            <tr>
                <td colspan="3" >
                    <FormQuestion></FormQuestion> 
                    <FormAnswer></FormAnswer>
                    <button @click="editQuestion()" class="btn-add">Add</button> 
                </td>

            </tr>
            <tr v-for="item of questions" :key="'question' + item.id">
                <td>{{item.name}}</td>
                <td>
                    
                    <button @click="editQuestion(item.id)" class="btn-add">ver</button>
                    
                </td>
            </tr>
        </table>
    </div>
</template>
<script setup lang="ts">
import { useQuiz } from "@/stores/store-quiz3";
import { computed } from "vue";
import FormQuestion from "./FormQuestion.vue";
import FormAnswer from "./FormAnswer.vue";





const store= useQuiz();
const questions = computed(()=>store.getQuestions);
const pregunta= computed(()=>store.getQuiz);


const editQuestion=(id?:number)=>{
    
    store.selectQuestion(id);
    store.showQuestion(true);
    //store.toggleQuestions();
}

const editAnswer=()=>{
    //store.selectQuiz(id);
    store.showAnswer(true);
}

</script>



<style lang="css" scoped>
.table {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

.table td, #customers th {
  border: 1px solid #ddd;
  padding: 5px;
}

.table tr:nth-child(even){background-color: #f2f2f2;}

.table tr:hover {background-color: #ddd;}

.table th {
  padding-top: 5px;
  padding-bottom: 5px;
  text-align: left;
  background-color: #04AA6D;
  color: white;
}

.btn-add{
    height: 15px;
    font-size: xx-small;
    /* padding: 1px; */
    background-color: #04AA6D;
    border-style: solid;
    border-radius: 2px;
    border-color: rgba(112, 112, 112, 0.365);
    margin-bottom: 3px;
    color: white;
    float:right;
}
.title-quiz{
    display: flex;
    justify-content: space-between;
}
.title-answer{
    display: flex;
    justify-content: flex-end;
}
.container{
    background-color: white;
}
</style>