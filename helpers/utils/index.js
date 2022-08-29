import {truncateRegex} from "../regex";


export const truncateText = (text, length = 100, ending = '...') => {
    if (text.length > length) {
        return text.substring(0, length - ending.length) + ending;
    }
    return text;
}

/**
 * Truncates an ethereum address to the format 0x0000…0000
 * @param address Full address to truncate
 * @returns Truncated address
 */
export const truncateEthAddress = (address) => {
    if(!address) return ''
    const match = address.match(truncateRegex);
    if (!match) return address;
    return `${match[1]}…${match[2]}`;
};
