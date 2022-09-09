import {Web3Storage} from 'web3.storage/dist/bundle.esm.min.js'

// function to upload a file to IPFS via web3.storage
export const uploadFileToWebStorage = async (e) => {
    // Construct with token and endpoint
    const client = new Web3Storage({token: process.env.REACT_APP_STORAGE_API_KEY})

    const file = e.target.files;
    if (!file) return;
    // Pack files into a CAR and send to web3.storage
    const rootCid = await client.put(file) // Promise<CIDString>

    // Fetch and verify files from web3.storage
    const res = await client.get(rootCid) // Promise<Web3Response | null>
    const files = await res.files() // Promise<Web3File[]>

    return `https://ipfs.infura.io/ipfs/${files[0].cid}`;
}


// function to upload a content to IPFS via web3.storage
export const uploadContentToWeb3Storage = async (data) => {
    // Construct with token and endpoint
    const client = new Web3Storage({token: process.env.REACT_APP_STORAGE_API_KEY})

    
    // Pack files into a CAR and send to web3.storage
    const rootCid = await client.put(data) // Promise<CIDString>

    // Fetch and verify files from web3.storage
    const res = await client.get(rootCid) // Promise<Web3Response | null>
    const files = await res.files() // Promise<Web3File[]>
    return `https://ipfs.infura.io/ipfs/${files[0].cid}`;
}
