export const getDataFromStorage = (varName) => JSON.parse(localStorage.getItem(varName));

export const setDataToStorage = (varName, data) => localStorage.setItem(varName, JSON.stringify(data));

export const dateFormatConverter = (dateVal) => new Date(dateVal.split('/')[2], dateVal.split('/')[1] - 1, dateVal.split('/')[0])