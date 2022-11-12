import type { Nft } from "./Nft";

export interface User{
    address?: string ;
    username?: string;
    nfts: Nft[];
}