import {Web3Storage} from 'web3.storage/dist/bundle.esm.min.js'

// function to upload a file to IPFS via web3.storage
export const uploadFileToWebStorage = async (file) => {
    // Construct with token and endpoint
    const client = new Web3Storage({token: process.env.NEXT_PUBLIC_STORAGE_API_KEY})
    console.log({file})
    if (!file) return;
    // Pack files into a CAR and send to web3.storage
    const rootCid = await client.put(file) // Promise<CIDString>

    // Fetch and verify files from web3.storage
    const res = await client.get(rootCid) // Promise<Web3Response | null>
    const files = await res.files() // Promise<Web3File[]>

    return {
        imageUrl : `https://infura-ipfs.io/ipfs/${files[0].cid}`,
        imageSize : files[0].size,
        imageType : files[0].type
    };
}


// function to upload a content to IPFS via web3.storage
export const uploadContentToWeb3Storage = async (data) => {
    // Construct with token and endpoint
    const client = new Web3Storage({token: process.env.NEXT_PUBLIC_STORAGE_API_KEY})


    // Pack files into a CAR and send to web3.storage
    const rootCid = await client.put(data) // Promise<CIDString>
    // Fetch and verify files from web3.storage
    const res = await client.get(rootCid) // Promise<Web3Response | null>
    const files = await res.files() // Promise<Web3File[]>
    return `https://ipfs.infura.io/ipfs/${files[0].cid}`;
}
