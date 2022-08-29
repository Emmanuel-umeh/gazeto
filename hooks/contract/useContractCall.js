import {useContractRead, useNetwork} from 'wagmi'
import {contractAddress} from "../../helpers/constants";
import CounterAbi from "../../contracts/abi/counter.json";

// read from smart contract
export const useContractCall =(functionName) =>{
    const resp = useContractRead({
        addressOrName: contractAddress,
        contractInterface: CounterAbi,
        functionName: functionName,
        onError : (err) => {
            console.log({err})
        }
    })

    return resp
}

