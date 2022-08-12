
import { useContract } from 'wagmi'
import {contractAddress} from "../../helpers/constants";
import * as contractAbi from "../../contracts/abi";

// export interface for smart contract
export const useSmartContract = () => useContract({
    addressOrName: contractAddress,
    contractInterface: contractAbi,
})
