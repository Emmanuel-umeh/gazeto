import {useContractWrite, usePrepareContractWrite, useWaitForTransaction} from 'wagmi'
import {contractAddress, nftContractAddress} from "../../helpers/constants";
import NftAbi from "../../contracts/abi/nft.json";

export const useContractSend =(functionName, args) =>{
    const { config, ...rest } = usePrepareContractWrite({
        addressOrName: contractAddress,
        contractInterface: NftAbi,
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