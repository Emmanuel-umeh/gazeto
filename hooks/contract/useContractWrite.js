import {useContractWrite, usePrepareContractWrite, useWaitForTransaction} from 'wagmi'
import {contractAddress, nftContractAddress} from "../../helpers/constants";
import NftAbi from "../../contracts/abi/nft.json";

export const useContractSend =(functionName, args) =>{
    const { config, ...rest } = usePrepareContractWrite({
        addressOrName: nftContractAddress,
        contractInterface: NftAbi,
        chainId: 80001,
        functionName,
        args,
        onError : (err) => {
            console.log({err})
        }
    })

    const { data, isSuccess, write, writeAsync, error, isLoading } = useContractWrite(config)
    console.log({config})
    return {data, isSuccess, write, writeAsync, isLoading}
}
