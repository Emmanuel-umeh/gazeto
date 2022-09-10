import {useContractRead, useNetwork} from 'wagmi'
import {contractAddress, nftContractAddress} from "../../helpers/constants";
import NftAbi from "../../contracts/abi/nft.json";

// read from smart contract
export const useContractCall =(functionName) =>{
    const resp = useContractRead({
        addressOrName: contractAddress,
        contractInterface: NftAbi,
        functionName: functionName,
        watch : true,
        onError : (err) => {
            console.log({err})
        }
    })

    return resp
}
