import {ethers} from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider';
import { NFT_ABI } from '../abis/Nft';

const getProvider= async ()=>{
    const eth = await detectEthereumProvider();
    try {
        return new ethers.providers.Web3Provider(eth!);
    } catch (error) {
        console.log('Please install MetaMask!')
        alert("Profavor instala Metamask");
         throw new Error("Please install MetaMask!");
            
    }
}

const getAccountWallet=async ()=>{
    const provider= await getProvider();
    const signer = provider?.getSigner();
    //const accounts= await provider?.send("eth_requestAccounts", []);
    return signer?.getAddress();
}

const getSigner= async  ()=>{
    const provider = await getProvider()
    return provider.getSigner();
}

const isAddress=(address: string)=>{
    return ethers.utils.isAddress(address);
}


const ownerContract = async (address: string)=>{
    const  provider= await getProvider();
    const signer= provider.getSigner();
    const contract= new ethers.Contract(address, NFT_ABI, signer);
    const owner  =await contract.owner();
    return owner as string;
}

const parseUnits= (value: string, decimal: number)=>{
    return ethers.utils.parseUnits(value,decimal);
}


const decodeImageByBase64=(value: string)=>{
    const base64= value.split(",");
        if(base64.length>0){
          const metadata= JSON.parse( atob(base64[1]));
          return  metadata.image; 
        }
        return ;
}

export {
    getProvider,
    getSigner,
    isAddress,
    ownerContract,
    getAccountWallet,
    parseUnits,
    decodeImageByBase64
}