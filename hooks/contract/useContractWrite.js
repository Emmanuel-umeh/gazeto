import {useContractWrite, usePrepareContractWrite} from 'wagmi'
import {contractAddress} from "../../helpers/constants";
import * as contractAbi from "../../contracts/abi";

export const useContractWrite =(functionName) =>{
    const { config } = usePrepareContractWrite({
        addressOrName: contractAddress,
        contractInterface: contractAbi,
        functionName,
    })
    const { data, isLoading, isSuccess, write } = useContractWrite(config)
    return {data, isLoading, isSuccess, write}
}
