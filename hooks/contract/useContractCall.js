import {useContractRead, useNetwork} from 'wagmi'
import {contractAddress, nftContractAddress} from "../../helpers/constants";
import NftAbi from "../../contracts/abi/nft.json";

// read from smart contract
export const useContractCall =(functionName, args, watch) =>{
    const resp = useContractRead({
        addressOrName: nftContractAddress,
        contractInterface: NftAbi,
        functionName: functionName,
        args,
        watch,
        onError : (err) => {
            console.log({err})
        }
    })

    return resp
}
