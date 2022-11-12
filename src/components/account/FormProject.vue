<template>

    
    <Modal :show="showModal" @onmodal="handlerShowModal($event)">
        <p>Project</p>
        <div class="form-controls" >
            <div class="form-input">
                <label for="name-project">Name</label>
                <input type="text" v-model="dataProject!.name" class="input-form">
            </div>
            <div class="form-input">
                <label for="name-logo">Logo</label>
                <input type="text" v-model="dataProject!.logo" class="input-form">
            </div>

            <div class="form-input">
                <label for="name-description">Description</label>
                <input type="text" v-model="dataProject!.description" class="input-form">
            </div>
        </div>

        <div class="footer">
            <button @click="handlerShowModal(false)">Close</button>
            <button v-if="!dataProject?.id" @click="handlerSave">Guardar</button>
        </div>
    </Modal>
        
        
</template>

<script setup lang="ts">

import { useQuiz } from "@/stores/store-quiz3";
import { computed, ref, watch } from "vue";
import Modal from "./Modal.vue";

const storeQuiz = useQuiz();
const showModal= computed(()=>storeQuiz.showFormProject);
const dataProject = computed(()=>{
    const d= storeQuiz.getProject;
    return d;
});
 
//const showModal = ref(false);

const handlerShowModal=(show: boolean)=>{
    console.log('handler:',show);
    if(!show){
        storeQuiz.clearProject();
    }
    storeQuiz.showProject(show);
}


const handlerSave=()=>{
    storeQuiz.registerProject();
}

</script>

<style>

.modal {
    background-color: white;
    /* position: fixed;
    z-index: 999;
    top: 20%;
    left: auto;
    width: 30%;
    margin-left: -150px; */
    position: fixed;
    z-index: 999;
    margin: auto;
    top: 30%;
    right: 50%;
    border: 3px solid green;
    padding: 10px;
}

    .form-input{
        border-radius: 20px;        
    }

    input[type=text], select {
        width: 100%;
        padding: 12px 20px;
        margin: 8px 0;
        display: inline-block;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
    }

    input[type=submit] {
        width: 100%;
        background-color: #4CAF50;
        color: white;
        padding: 14px 20px;
        margin: 8px 0;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    input[type=submit]:hover {
        background-color: #45a049;
    }


    .footer{
        margin-top: 20px;
        display: flex;
        justify-content: space-around;
    }
</style>