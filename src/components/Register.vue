<template>
    <div class="wrapper">
        <div class="r-container">
            <div class="logo-container">
                <img class="logo" src="https://framerusercontent.com/images/9t7alFHFk0nitqrsHsOyjfUH7w4.png" alt="">
            </div>

            <div class="reg-content">
                <div class="label-username">
                    <p class="label-text">Username</p>
                </div>
                <div class="container-input-address">
                    <textarea cols="" rows="2" v-model="username" ></textarea>
                </div>
            </div>

            <div class="reg-container-button">
                <button class="btn" v-if="username" @click="registerUser(username)">
                    <img class="logo-btn" src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/800px-MetaMask_Fox.svg.png" >

                    <span>Registrarse</span>

                </button>
                <!-- <div class="component-button">
                    <div class="framer-1ufnpuk-container" data-projection-id="12" style="opacity: 1;"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/800px-MetaMask_Fox.svg.png" style="position: absolute; inset: 0px; width: 100%; height: 100%; border-radius: 100px;"></div>
                    <div class="framer-bf93mr" style="outline: none; display: flex; flex-direction: column; justify-content: flex-start; flex-shrink: 0; --extracted-r6o4lv:rgb(255, 255, 255); --framer-link-text-color:rgb(0, 153, 255); --framer-link-text-decoration:underline; --framer-paragraph-spacing:0px; transform: none; opacity: 1;" data-framer-component-type="RichTextContainer"><p class="framer-text framer-styles-preset-21ogod" data-styles-preset="xZndidUCt" style="--framer-text-color:var(--extracted-r6o4lv)">Conectarse</p></div>
                </div> -->
            </div>

            <div class="banners">
                <div class="framer-n5abo2" style="background-color: rgb(133, 133, 133); opacity: 1;"></div>

                <div class="banner-metamask">
                    <img class="logo" src="https://framerusercontent.com/images/WV6pxreL6ZQg3MjpRwAEvi5eYsY.png" alt="">
                </div>
                

            </div>
        
        </div>
        
    </div>
</template>
<script setup lang="ts">
import { useWallet } from '@/stores/store-wallet';
import { computed, ref } from 'vue';

const username = ref<string>('');
const stateWallet = useWallet();

const user= computed(()=>stateWallet.getUser);
const registerUser=(usernameValue: string)=>{
    stateWallet.register(usernameValue);
}
</script>
<style>

.wrapper{
    z-index: 1;
    flex: 0 0 auto;
    height: 476px;
    left: calc(50% - 167px);
    position: absolute;
    top: calc(50% - 238px);
    width: 334px;
    background-color: white;
    border-radius: 20px;
}
.r-container{
place-content: center flex-start;
    align-items: center;
    display: flex;
    flex-flow: column nowrap;
    gap: 35px;
    height: 476px;
    overflow: hidden;
    padding: 32px;
    position: relative;
    width: 334px;
    will-change: transform;
}

.form-container{
    place-content: center flex-start;
    align-items: center;
    display: flex;
    flex-flow: column nowrap;
    gap: 58px;
    height: 476px;
    overflow: hidden;
    padding: 32px;
    position: relative;
    width: 334px;
    will-change: transform;
}
.logo{
    /* position: absolute; */
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    border-radius: 100px;
}
.logo-container{
    aspect-ratio: 1 / 1;
    flex: 0 0 auto;
    height: var(--framer-aspect-ratio-supported, 48px);
    position: relative;
    width: 48px;
}

    .reg-content{
        place-content: center;
    align-items: center;
    display: flex;
    flex: 0 0 auto;
    flex-flow: column nowrap;
    gap: 8px;
    height: 158px;
    overflow: visible;
    padding: 0px;
    position: relative;
    width: 276px;
    }

    .label-username{
        flex: 0 0 auto;
        height: auto;
        position: relative;
        white-space: pre;
        width: 100%;
        font-family: sans-serif;
        font-weight: 400;
        
    }
    .label-text{
        margin: 0px;
        padding: 0px;
    }
    .container-input-address{
    flex: 0 0 auto;
    height: auto;
    position: relative;
    width: 100%;

        
    }
    textarea {
    
        pointer-events: auto;
        border: none;
        width: 100%;
        box-sizing: border-box;
        outline: none;
        resize: none;
        margin: 0px;
        font-family: system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        appearance: none;
        color: rgb(51, 51, 51);
        background-color: rgb(235, 235, 235);
        border-radius: 8px;
        text-align: left;
        caret-color: rgb(51, 51, 51);
        display: flex;
        height: 75px;
        padding: 15px;
        direction: ltr;
        text-overflow: unset;
        box-shadow: rgb(0 0 0 / 0%) 0px 0px 0px 1px inset;
        font-size: 16px;
        font-weight: 400;


        border-style: solid;
        border-color: aqua;
    }

    .logo-btn{
        height: 45px;
        border: none;
        margin-left: 40px;
    }

    .btn{
        cursor: pointer;
        clear: both;
        width: 272px;
        align-items: center;
        display: flex;
        background-color: rgb(119, 119, 119);
        opacity: 1;
        border-radius: 10px;
        border-style: none;
        box-shadow: rgb(97 97 97 / 20%) 2px 4px 8px 4px;
    }
    .btn span{
        flex: auto;
        font-size: 18px;
        color: white;
        margin-right: 12px;
    }
    .banner-metamask{
        height: 60px;
        width: 60px;
        align-items: center;
        border-style: solid;
        padding: 10px;
        border-width: 2px;
        border-radius: 30px;
        border-color: #8c8a8a;
    }
</style>