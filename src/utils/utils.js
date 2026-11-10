import api from "../api/api";

export const replaceImageSource = async (source) => {
    const isValid = await api.verifyImage(source);
    console.log(`Image source: ${source}, isValid: ${isValid}, returning: ${isValid ? source : '/images/general-placeholder.jpg'}`);
    return isValid ? source : '/images/general-placeholder.jpg';
}