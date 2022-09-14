import {Web3Storage, File, Blob} from 'web3.storage/dist/bundle.esm.min.js'
import axios from "axios";
// function to upload a file to IPFS via web3.storage
export const uploadFileToWebStorage = async (file) => {
    try {
        // Construct with token and endpoint
        const client = new Web3Storage({token: process.env.NEXT_PUBLIC_STORAGE_API_KEY})
        console.log('stuff ', process.env.NEXT_PUBLIC_STORAGE_API_KEY  )
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
    }catch (e) {
        console.log({e})
    }

}


// function to upload a content to IPFS via web3.storage
export const uploadContentToWeb3Storage = async (data) => {
    try {
        const client = new Web3Storage({token: process.env.NEXT_PUBLIC_STORAGE_API_KEY})
        //use file object
        const blob = new Blob([JSON.stringify(data)], {type : 'application/json'})
        const files = [new File([blob], 'metadata.json')]
        const rootCid = await client.put(files)

        const resx = await client.get(rootCid)
        const filesx = await resx.files()
        return {
            imageUrl : `https://infura-ipfs.io/ipfs/${filesx[0].cid}`,
            imageSize : filesx[0].size,
            imageType : filesx[0].type
        };
    } catch (error) {
        console.log("Error uploading file: ", error);
    }
}

// function to upload a content to IPFS via web3.storage
export const uploadMarkdownToWebStorage = async (data) => {
    try {
        const client = new Web3Storage({token: process.env.NEXT_PUBLIC_STORAGE_API_KEY})
        //use file object
        const blob = new Blob([data], {type : 'text/markdown'})
        const files = [new File([blob], 'content.md')]
        const rootCid = await client.put(files)

        const resx = await client.get(rootCid)
        const filesx = await resx.files()
        return {
            imageUrl : `https://infura-ipfs.io/ipfs/${filesx[0].cid}`,
            imageSize : filesx[0].size,
            imageType : filesx[0].type
        };
    } catch (error) {
        console.log("Error uploading file: ", error);
    }
}



// get the metedata for an NFT from IPFS
export const fetchNftMeta = async (ipfsUrl) => {
    try {
        if (!ipfsUrl) return null;
        const meta = await axios.get(ipfsUrl);
        return meta;
    } catch (e) {
        console.log({ e });
    }
};

