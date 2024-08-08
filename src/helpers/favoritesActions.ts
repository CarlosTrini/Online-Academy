import { isEmpty, isNil} from "lodash";
import { namesStorage } from "../initData/namesStorage";
import { coursesT, loginDataT } from "../typesInterfaces/types";

import { userT } from "../typesInterfaces/types";
import { getStorageArr, getStorageObj, saveStorage } from "./storagesFunc";
import { simpleAlertTimer } from "./alerts";

type addToFT = {
    (idCourse: coursesT['id']): void;
};

type delToFT = {
    (idCourse: coursesT['id']): void
}

const checkLogin = (): {isLogin: boolean, data: loginDataT | null} => {
    const dataLogin = getStorageObj({ name: namesStorage.loginDataStorage }) as loginDataT;

    if (isNil(dataLogin) === true || isEmpty(dataLogin) === true) {
        return {
            isLogin: false,
            data: null
        };
    }
    return {
        isLogin: true,
        data: dataLogin
    };
}

export const addToFavorites:addToFT = (idCourse) => {

    const login = checkLogin();

    if (login.isLogin === false) {
        return simpleAlertTimer({
            title: 'Es necesario iniciar sesión',
            icon: 'info'
        });
    }

    // en caso de que si se tenga una sesión iniciada...
    // traer a los usuarios para sacar al que necesitamos y agregar a sus favoritos el id del curso...
    const users: userT[] = getStorageArr({name:namesStorage.usersStorage}) ;

    if(isNil(users) === true || isEmpty(users) === true) {
        return simpleAlertTimer({
            title: 'Ah ocurrido un error. Recarga la página',
            icon: 'error'
        });
    }

    let hasThisCourse = false;
    // si todo bien con los usuarios...
    const updateUser = users.map(u => {
        if (u.id === login.data?.idUser) {
            // revisar que el curso aún no existe en favoritos
            if (u.favorites.some(f => f === idCourse) === false) {
                u.favorites.push(idCourse);
            } else {
                hasThisCourse = true;
            }
        }

        return u;
    });

    saveStorage({
        name: namesStorage.usersStorage,
        value: JSON.stringify(updateUser)
    });


    simpleAlertTimer({
        title: hasThisCourse === false ? 'El curso se añadió a tus favoritos' : 'Ya se ha añadido este curso' ,
        icon: hasThisCourse === false ? 'success' : 'info'
    });

}

export const delToFavorites: delToFT = (idCourse) => {
 
    const login = checkLogin();

    if (login.isLogin === false) {
        return simpleAlertTimer({
            title: 'Es necesario iniciar sesión',
            icon: 'info'
        });
    }
    
    // traer a los usuarios para sacar al que necesitamos y agregar a sus favoritos el id del curso...
    const users: userT[] = getStorageArr({name:namesStorage.usersStorage}) ;

    if(isNil(users) === true || isEmpty(users) === true) {
        return simpleAlertTimer({
            title: 'Ah ocurrido un error. Recarga la página',
            icon: 'error'
        });
    }

    
    // si todo bien con los usuarios...
    const updateUser = users.map(u => {
        if (u.id === login.data?.idUser) {
            // revisar que el curso aún no existe en favoritos
             u.favorites =  u.favorites.filter(f => f !== idCourse);
        }

        return u;
    });

    saveStorage({
        name: namesStorage.usersStorage,
        value: JSON.stringify(updateUser)
    });


    simpleAlertTimer({
        title: 'El curso se eliminó de tus favoritos',
        icon: 'success'
    });

}


