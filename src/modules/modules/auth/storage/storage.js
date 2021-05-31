export const getLocalToken = () => localStorage.getItem('mynotetoken')
export const deleteLocalToken = () => localStorage.clear();
export const setLocalToken = token => {
    localStorage.setItem('mynotetoken', token)
}
