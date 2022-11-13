import type { User } from '@/models/User';
import {BigNumber, ethers} from 'ethers';

//import { initializeProvider } from '@metamask/providers';

import { defineStore } from 'pinia'


import { NFT_ABI, NFT_ADDRESS } from '../abis/Nft';
import { postLoginUser, postRegister, postRegisterToken } from './api';
import { decodeImageByBase64, getProvider, getSigner } from './utils-eth';


interface State {
  user: User,
  nftContract: ethers.Contract | undefined,
  provider: ethers.providers.Web3Provider | undefined,
  loading: boolean,
  message?: string
}

export const useWallet = defineStore('city/wallet', {

  state: (): State => ({
    user: {
      //username: null,
      //address: null,
      nfts:[]
    },
    nftContract: undefined,
    loading: false,
    provider: undefined,
    

  }),
  getters: {
    getUser: (state) => state.user,
    isLoading: (state) => state.loading,
    isConnected: (state) => {
      //const address =state.user.address; 
      const username = state.user.username;
      
      //const swa=!!!address;
      const swu=!!username;
      
      return  swu;
    },
  },
  actions: {
    async initProvider() {
      
        if(this.user.address){
          return;
        }
        const provider = await getProvider();
        this.provider=provider;
        await this.startApp();
    },

    async startApp( ){
        const signer = this.provider?.getSigner();
        const accounts= await this.provider?.send("eth_requestAccounts", []);
        await signer?.getAddress().then((res)=>{
            console.log(res);
        }).catch((err)=>{
            console.log(err)
        })
        const account = accounts[0];
        this.user.address= account;
    },


    async register(username: string| null) {
      await this.initProvider()
      
      
      if(this.user.address && username){
        //this.user.username= username;
        await postRegister({username,address: this.user.address}).then((res)=>{
          this.user= res;
          localStorage.setItem("address",this.user.address!);
        })
        /* localStorage.setItem("username",username);
        localStorage.setItem("address",this.user.address); */
      }
    },

    initStorage(){
      
      //const username=localStorage.getItem("username");
      const address = localStorage.getItem("address");
      
      if(address){
        postLoginUser(address).then((res)=>{
          if(res.message){
            localStorage.removeItem("address");
            alert(res.message);  
          }else{
            
            this.user=res;
            this.getUris();
            
            localStorage.setItem("address",this.user.address!);
          }
            
        }).catch(err=>{
          
          localStorage.removeItem("address");
        });
      }
      
    },





   /*  async marketContract(){
      const provider = await getProvider();
      const signerContract= new ethers.Contract(MARKET_ADDRESS, MARKET_ABI, provider);
      return signerContract;
    },

    

    async signMarketContract(address: string){
      const signer = await getSigner();
      const signerContract= new ethers.Contract(MARKET_ADDRESS, MARKET_ABI, signer);
      signerContract.on("onWhiteListNftContractEvent",(nft_contract, add)=>{
        console.log(nft_contract, add);
      });
      await signerContract.addNftWhiteList(address);
      //await signerContract.addNftWhiteList("0x38758D4E61Bf99C61ecAcfFBa4e779645e0264FD");
    },

*/

    async registerToken(token:string,project_id: string ){
      const {address} =this.user;
      return  await postRegisterToken({address:address!,token ,project_id}).then((res)=>{
        this.user={
          ...this.user,
          ...res
        };
        this.getUris();
        return true;
      })
    },

  
    async mintContract721(){
        const signer= await getSigner();
        const signerContract= new ethers.Contract(NFT_ADDRESS, NFT_ABI, signer);
        
        
        

        const txMint= ()=>signerContract.mint(this.user.address, "1","2");
        
        //const txId= await txMint.wait();
        //console.log(txId);
        return {signerContract, txMint};

        //const txId= await txMint.wait();
        //console.log(txId);
        //console.log(txId);
        //return {signerContract, txMint};
        
    },


    /* async getUri(){
      const signer= await getSigner();
      debugger
      const signerContract= new ethers.Contract(NFT_ADDRESS, NFT_ABI, signer);
      const txUri= await signerContract.tokenURI("1");
      //const txId= await txUri.wait();
        //console.log(txId);
        const svgDecode =  decodeImageByBase64(txUri);
        console.log(svgDecode);
        return svgDecode;
    }, */

    async getUris(){
      if(this.user.nfts.length==0){
        return;
      }
      const signer= await getSigner();
      
      const signerContract= new ethers.Contract(NFT_ADDRESS, NFT_ABI, signer);
      for (let index = 0; index < this.user.nfts.length; index++) {
        const nft = this.user.nfts[index];
        const txUri= await signerContract.tokenURI(nft.token);
        const svgDecode =  decodeImageByBase64(txUri);
        this.user.nfts[index].image= svgDecode
      }
      
      //const txId= await txUri.wait();
      console.log(this.user);
        
        
        //return svgDecode;
    },

    


    
    async getContract(contract: string, tokenId: string){
      const signer= await getSigner();
      const signerContract= new ethers.Contract(contract, NFT_ABI, signer);
      const getOwner= async()=>signerContract.ownerOf(tokenId);
      return {getOwner};
    },


    clear() {
      this.$reset()
    }
  }
})


