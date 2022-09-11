
import { useContract } from 'wagmi'
import {contractAddress, nftContractAddress} from "../../helpers/constants";
import NftAbi from "../../contracts/abi/nft.json";
// export interface for smart contract
export const useSmartContract = () => {
    const resp = useContract({
        addressOrName: nftContractAddress,
        contractInterface: NftAbi,
    })
    return {resp}
}
