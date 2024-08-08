import { isNil, isString } from "lodash";


interface storageI{
    name: string;
}

interface storageSaveUpdateI extends storageI {
    value: string;
}

const getStorageObj = (info:storageI ) => {
    let newValue = {};
    
    if (isNil(info.name) || info.name === '') {
        newValue = {};
    }

    const value: string = sessionStorage.getItem(info.name)!;

    if (isNil(value) ===  true) {
        newValue = {};
    }
    else {
        newValue = JSON.parse(value);
    }

    return newValue;
}

const getStorageArr = (info:storageI ) => {
    let newValue = [];
    
    if (isNil(info.name) || info.name === '') {
        newValue = [];
    }

    const value: string = sessionStorage.getItem(info.name)!;

    if (isNil(value) ===  true) {
        newValue = [];
    }
    else {
        newValue = JSON.parse(value);
    }

    return newValue;
}

const getStorageString = (info:storageI ): string => {
    let newValue: string;
    
    if (isNil(info.name) || info.name === '') {
        newValue = '';
    }

    const value: string = sessionStorage.getItem(info.name)!;
    if (isNil(value) === true) {
        newValue = '';
    }
    else {
        newValue = value;
    }
    
    return newValue;
}

const saveStorage = (info: storageSaveUpdateI): boolean => {
    // si algún valor requiere de JSON.stringify() ya se debe mandar con ese parse... AQUÍ NO SE REALIZA ESA ACCIÓN...
    let response = false;

    if (isNil(info.value) === true || isNil(info.name) === true ) {
        return response;
    }

    if (isString(info.value) === false) {
        return response;
    }

    
    sessionStorage.setItem(info.name, info.value);
    response = true;
    return response;
}

const removeStorage = (info: storageI) =>{ 
    sessionStorage.removeItem(info.name);
}


export {
    getStorageObj,
    getStorageString,
    getStorageArr,
    saveStorage,
    removeStorage
}