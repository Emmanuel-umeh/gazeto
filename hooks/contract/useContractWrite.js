import {useContractWrite, usePrepareContractWrite, useWaitForTransaction} from 'wagmi'
import {contractAddress, nftContractAddress} from "../../helpers/constants";
import CounterAbi from "../../contracts/abi/counter.json";

export const useContractSend =(functionName, args) =>{
    const { config, ...rest } = usePrepareContractWrite({
        addressOrName: contractAddress,
        contractInterface: CounterAbi,
        chainId: 80001,
        functionName,
        args,
        onError : (err) => {
            console.log({err})
        }
    })

    const { data, isSuccess, write, writeAsync, error } = useContractWrite(config)
    const {isLoading} = useWaitForTransaction({
        hash: data?.hash,
    })
    return {data, isLoading, isSuccess, write, writeAsync}
}


export const useNftContractSend =(functionName) =>{
    const { config, ...rest } = usePrepareContractWrite({
        addressOrName: nftContractAddress,
        contractInterface: CounterAbi,
        chainId: 80001,
        functionName,
        onError : (err) => {
            console.log({err})
        }
    })

    const { data, isSuccess, write, writeAsync, error } = useContractWrite(config)
    const {isLoading} = useWaitForTransaction({
        hash: data?.hash,
    })
    return {data, isLoading, isSuccess, write, writeAsync}
}
