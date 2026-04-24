export function getUserData() {
    return JSON.parse(localStorage.getItem('userData'));
}

export function setUserData(data) {
    let userInfo = {
        email: data.email,
        token: data.accessToken,
        id: data._id
    }
    return localStorage.setItem('userData', JSON.stringify(userInfo));
}

export function clearUserData() {
    localStorage.removeItem('userData');
}

export const userUtil = {
    getUserData,
    setUserData,
    clearUserData
}