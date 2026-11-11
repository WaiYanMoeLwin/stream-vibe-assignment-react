import api from "../api/api";

export const replaceImageSource = async (source) => {
    const isValid = await api.verifyImage(source);
    return isValid ? source : '/images/general-placeholder.jpg';
}