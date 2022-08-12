export const truncateText = (text, length = 100, ending = '...') => {
    if (text.length > length) {
        return text.substring(0, length - ending.length) + ending;
    }
    return text;
}

export const truncateAddress = (address, length = 20) => {
    return truncateText(address, length, '...');
}

