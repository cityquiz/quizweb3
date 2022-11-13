<template>

    <div   class="container-mochila">
            <div class="Mochila" v-for="item of tokens" :key="item.id">
              <a target="_blank" href="https://moonbase.moonscan.io/address/0x3aBc3747D77111E41d27Ce44369994ee88b4CE4d">
                  <img :src="item.image"  >
              </a>
              <!-- <div class="desc">Add a description of the image here</div> -->
            </div>
    </div>

</template>
<script setup lang="ts">
import { useWallet } from '@/stores/store-wallet';
import { computed } from 'vue';


const store = useWallet();

const tokens = computed(()=>store.getUser.nfts);

</script>

<style scoped>
    .Mochila {
    margin: 5px;
    border: 1px solid #ccc;
    float: left;
    width: 140px;
  }
  
 .Mochila:hover {
    border: 1px solid #777;
  }
  
  .Mochila img {
    width: 100%;
    height: auto;
  }
  
  .desc {
    padding: 4px;
    text-align: center;
    font-size: 11px;
  }
  .container-mochila{
    background-color: white;
  }
</style>