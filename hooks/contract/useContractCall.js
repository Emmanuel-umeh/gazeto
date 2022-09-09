import {useContractRead, useNetwork} from 'wagmi'
import {contractAddress, nftContractAddress} from "../../helpers/constants";
import CounterAbi from "../../contracts/abi/counter.json";

// read from smart contract
export const useContractCall =(functionName) =>{
    const resp = useContractRead({
        addressOrName: contractAddress,
        contractInterface: CounterAbi,
        functionName: functionName,
        watch : true,
        onError : (err) => {
            console.log({err})
        }
    })

    return resp
}


// read from smart contract
export const useNftContractCall =(functionName) =>{
    const resp = useContractRead({
        addressOrName: nftContractAddress,
        contractInterface: CounterAbi,
        functionName: functionName,
        watch : true,
        onError : (err) => {
            console.log({err})
        }
    })

    return resp
}

