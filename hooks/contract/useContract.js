
import { useContract } from 'wagmi'
import {contractAddress} from "../../helpers/constants";
import CounterAbi from "../../contracts/abi/counter.json";

// export interface for smart contract
export const useSmartContract = () => {
    const resp = useContract({
        addressOrName: contractAddress,
        contractInterface: CounterAbi,
    })
    return {resp}
}
