import api from '../api/api';

export const login = async (email, password, showMessageBox, navigate) => {
    try {
        const user = await api.authenticateUser(email, password);
        const onSuccess = async () => {
            setLoggedInUser(user);
            // Redirect to the previous page or home page after successful login
            const redirectAfterLogin = localStorage.getItem('redirectAfterLogin');
            if (redirectAfterLogin) {
                localStorage.removeItem('redirectAfterLogin');
                navigate(redirectAfterLogin);
            } else {
                navigate('/');
            }
        }
        showMessageBox(`Welcome back, ${user.firstName}!`, onSuccess);
    } catch (error) {
        showMessageBox(error.message);
    }
}

export const register = async (firstName, lastName, email, password, onSuccess, showMessageBox) => {
    if (await api.checkDuplicateUser(email)) {
        showMessageBox('Email is already registered. Please use a different email.');
        return;
    }

    const newUser = { firstName, lastName, email, password, watchList: [] };
    try {
        await api.registerUser(newUser);
        showMessageBox('Registration successful! You can now log in.', onSuccess);
    } catch (error) {
        showMessageBox(error.message);
    }
}

export const logout = async (navigate) => {
    localStorage.removeItem('loggedInUser');
    navigate(0); // Refresh the page to update the UI
}


export const getWatchList = async () => {
    return await api.fetchWatchList();
}

export const addToWatchList = async (item, showMessageBox) => {
    try {
        await api.addToWatchList(item);
        showMessageBox('Item added to your watch list.');
    } catch (error) {
        showMessageBox(error.message);
    }
}

export const removeFromWatchList = async (item, showMessageBox) => {
    try {
        await api.removeFromWatchList(item);
    } catch (error) {
        showMessageBox(error.message);
    }
}

export const getLoggedInUser = () => {
    return JSON.parse(localStorage.getItem('loggedInUser'));
}

export const setLoggedInUser = (user) => {
    localStorage.setItem('loggedInUser', JSON.stringify(user));
}

export const isLoggedIn = () => {
    return !!localStorage.getItem('loggedInUser');
}