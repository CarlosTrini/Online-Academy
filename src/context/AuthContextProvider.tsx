import React, { createContext, useEffect, useState } from 'react'
import { getStorageObj, removeStorage } from '../helpers/storagesFunc';
import { namesStorage } from '../initData/namesStorage';
import { isEmpty, isNil } from 'lodash';
import { loginDataT, typeUserCategory } from '../typesInterfaces/types';
import { useNavigate } from 'react-router-dom';

type propsT = {
  children: JSX.Element
}

type authContextT = {
  isAuth: boolean,
  authInfo: loginDataT,
  loginAuth: (infoUser: loginDataT) => void,
  closeAuth: () => void
}



const initAuthInfo = {
  idUser: '',
  name: '',
  typeUser: 'Estudiante' as typeUserCategory,
  login: false,
  userPicture: '',
};

const initContext = {
  isAuth:false,
  authInfo: initAuthInfo,
  loginAuth: () => {},
  closeAuth: () => {}
}

// EL CONTEXT
const AuthContextHook = createContext<authContextT>(initContext);


const AuthContextProvider: React.FC<propsT> = ({children}) => {

  const NAVIGATE = useNavigate();

  const [isAuth, setIsAuth] = useState(false);
  const [authInfo, setAuthInfo] = useState<loginDataT>(initAuthInfo);


  const loginAuth = (infoUser: loginDataT) => {
    setAuthInfo(infoUser);
  }

  const closeAuth = () => {
    resetAuth();
    NAVIGATE('/');
  }
  
  const checkAuth = () => {
    const authInfoStorage: loginDataT = getStorageObj({
      name: namesStorage.loginDataStorage
    }) as loginDataT;

    if (isNil(authInfoStorage) === true || isEmpty(authInfoStorage) === true) {
      resetAuth();
      return;
    }

    setIsAuth(true);
    setAuthInfo(authInfoStorage);
  }

  const resetAuth = () => {
    setIsAuth(false);
    setAuthInfo({
      idUser: '',
      name: '',
      typeUser: 'Estudiante',
      login: false,
      userPicture: ''
    });

    removeStorage({
      name: namesStorage.loginDataStorage
    });
  }

  useEffect(() => {
    checkAuth();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return (
    <AuthContextHook.Provider
      value={{
        isAuth, authInfo, closeAuth, loginAuth,
      }}
    >
      {children}
    </AuthContextHook.Provider>
  )
}

export { AuthContextProvider, AuthContextHook}