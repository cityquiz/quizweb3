<template>

    <!-- <button @click="onClickModal(true)">Open Modal</button> -->

    <Teleport to="body">
    <div v-if="open" class="modal">
        
        <slot></slot>

        
    </div>
    </Teleport>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

const props = defineProps<{show: boolean}>();
const open = computed(()=>props.show);

const emit = defineEmits({
    onmodal: (show: boolean)=>{
      console.log(`${show}'show'`);
      return show;
  }
}) 


const  onClickModal=(show: boolean)=> {
  emit('onmodal',show)
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