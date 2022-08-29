import {useContractWrite, usePrepareContractWrite} from 'wagmi'
import {contractAddress} from "../../helpers/constants";
import CounterAbi from "../../contracts/abi/counter.json";

export const useContractSend =(functionName) =>{
    const { config, ...rest } = usePrepareContractWrite({
        addressOrName: contractAddress,
        contractInterface: CounterAbi,
        functionName,
        onError : (err) => {
            console.log({err})
        }
    })
    const { data, isLoading, isSuccess, write, writeAsync, error } = useContractWrite(config)
    return {data, isLoading, isSuccess, write}
}
