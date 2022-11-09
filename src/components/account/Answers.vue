<template>
    <div class="container">
        <table class="table">
            <tr>
                <th>Answers</th>
                <th></th>
            </tr>
            <tr>
                
                <td colspan="3" ><FormAnswer></FormAnswer> <button @click="show" class="btn-add">Add</button> </td>
                
            </tr>
            <tr>
                <td>Berglunds snabbköp</td>
                <td><button @click="show" class="btn-add">ver</button></td>
            </tr>
            <tr>
                <td>Francisco Chang</td>
                <td> <button @click="show" class="btn-add">Ver</button> </td>
            </tr>
        </table>
    </div>
</template>
<script setup lang="ts">
import FormAnswer from "./FormAnswer.vue";

const show=()=>{

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
</style>