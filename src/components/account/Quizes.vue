<template>
    <div class="container">
        <table class="table">
            <tr>
                <th>Quiz name</th>
                <th></th>
            </tr>
            <tr >
                <td colspan="2" ><FormQuiz></FormQuiz> <button @click="editQuiz()" class="btn-add">Add</button> </td>
            </tr>
            <tr v-for="item of quizes" :key="item.id">
                <td>{{item.name}}  <span v-if="item.answer"> (  {{item.answer.name}})</span></td>
                <td>
                    <button @click="editQuiz(item.id)" class="btn-add">ver</button>
                    <button @click="viewQuestions(item.id!)" class="btn-add">Opciones</button>
                </td>
            </tr>
        </table>
    </div>
</template>
<script setup lang="ts">
import { useQuiz } from "@/stores/store-quiz3";
import { computed } from "vue";
import FormQuiz from "./FormQuiz.vue";

const store= useQuiz();
const quizes = computed(()=>store.getQuizes);



const editQuiz=(id:number|null=null)=>{
    
    store.selectQuiz(id);
    store.showQuiz(true);
}

const viewQuestions=(id:number)=>{
    
    store.selectQuiz(id);
    store.toggleQuestions();
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

.container{
    background-color: white;
}
</style>