

export const checkImageSource = async (source) => {
    try {
        const response = await fetch(source);
        return response.ok;
    } catch (error) {
        console.error('Error fetching image:', error);
        return false;
    }
}

export const replaceImageSource = async (source) => {
    const isValid = await checkImageSource(source);
    return isValid ? source : '/images/general-placeholder.jpg';
}