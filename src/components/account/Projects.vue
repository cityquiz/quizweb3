<template>
    <div class="container">
        <table class="table">
            <tr>
                <th>Logo</th>
                <th>Project</th>
                <th>Description</th>
                <th></th>
            </tr>
            <tr>
                
                <td colspan="4" ><FormProject ></FormProject> <button @click="editProject()" class="btn-add">Add</button>
                    
                </td>
                
            </tr>
            <tr v-for="item of projects" :key="item.id">
                
                <td><img :src="item.logo" width="20" height="20"></td>
                <td>{{item.name}}</td>
                <td>{{item.description}}</td>
                <td>
                    <button @click="editProject(item.id)" class="btn-add">Ver</button>
                    <button @click="viewQuizes(item.id!)" class="btn-add">Preguntas</button>
                </td>
            </tr>
        </table>
    </div>
</template>
<script setup lang="ts">
import { useQuiz } from "@/stores/store-quiz3";
import { computed, ref } from "vue";
import FormProject from "./FormProject.vue";

const showForm = ref(false);
const store= useQuiz();
store.requestProjects();
const projects=computed(()=>store.getProjects);


const editProject=(id:number|null=null)=>{
    debugger
    store.selectProject(id);
    store.showProject(true);
}

const viewQuizes=(id:number)=>{
    store.selectProject(id);
    store.toggleQuiz();
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