import { useContractRead } from 'wagmi'
import {contractAddress} from "../../helpers/constants";
import * as contractAbi from "../../contracts/abi";

export const useContractCall =(functionName) =>{
    const { data, isError, isLoading } = useContractRead({
        addressOrName: contractAddress,
        contractInterface: contractAbi,
        functionName: functionName,
    })

    return {data, isError, isLoading}
}
