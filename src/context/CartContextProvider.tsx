import React, {useState, createContext, useEffect} from 'react';
import { cartT, infoCourseCartT } from '../typesInterfaces/types';
import {  getStorageObj, removeStorage, saveStorage } from '../helpers/storagesFunc';
import { namesStorage } from '../initData/namesStorage';
import { isEmpty, isNil } from 'lodash';
import { simpleAlertTimer } from '../helpers/alerts';

type propsT = {
  children: JSX.Element;
}

// type cartInitT = {
//   infoCourse: [];
//   total: number;
//   totalDiscount: number;
// }

const cartInit: cartT = {
  infoCourse: [],
  total: 0,
  totalDiscount: 0
};

type contextT = {
  cartCtx: cartT;
  updateCartCtx: (infoNewCourse: infoCourseCartT) => void;
  removeCourseCtx: (idCourse: infoCourseCartT['idCourse']) => void;
  clearCartCtx: () => void;
}

// CREACIÓN DEL CONTEXT
const CartContextHook = createContext<contextT>({
  cartCtx: cartInit,
  updateCartCtx: () => {},
  removeCourseCtx: () => {},
  clearCartCtx: () => {}
});

const CartContextProvider:React.FC<propsT> = ({children}) => {

  const [cartCtx, setCartCtx] = useState<cartT>(cartInit);

  const getCartStorage = ():cartT => {
    const cartValues = getStorageObj({name: namesStorage.cartStorage}) as cartT ;
    if (isNil(cartValues) === true || isEmpty(cartValues) === true) {
      return {
        infoCourse: [],
        total: 0,
        totalDiscount: 0
      };
    }

    return cartValues
  }

  const checkCourse = (idCourse: infoCourseCartT['idCourse']) => {
    let hasThisCourse = false;
    const currentCart = getCartStorage();

    if (isEmpty(currentCart.infoCourse) === true) {
      hasThisCourse = false;
    }

    // buscar el curso en caso de haber cursos agregados
    hasThisCourse = currentCart.infoCourse.some(c => c.idCourse === idCourse);

    return hasThisCourse;
  }

  const removeCourseCtx = (idCourse: infoCourseCartT['idCourse']) => {
    const currentCart = getCartStorage();
    const cartFiltered = currentCart.infoCourse.filter(c => c.idCourse !== idCourse);

    // si no hay nada al eliminar se reinicia el carrito
    if (isNil(cartFiltered) === true || isEmpty(cartFiltered) === true) {
          // ELIMINAR de storage
      removeStorage({name: namesStorage.cartStorage});

      simpleAlertTimer({
        title: 'Carrito vacio',
        icon: 'info',
      });
      return setCartCtx(cartInit);
    }

    // EN CASO DE QUE QUEDEN VALORES
    let total = 0;
    let totalDiscount = 0;

    cartFiltered.map((c) => {
      total += Number(c.discountPrice) !== 0 ? Number(c.discountPrice) : c.price; // preció a pagar total
      totalDiscount += c.price; // total a pagar SIN descuento ()
    });

    
    const updatedAllCart = {
      infoCourse: cartFiltered,
      total,
      totalDiscount
    }

    setCartCtx(updatedAllCart);

    
    // guarda en storage
    saveStorage({
      name: namesStorage.cartStorage,
      value: JSON.stringify(updatedAllCart)
    });

    simpleAlertTimer({
      title: 'Se ha eliminado un curso con éxito',
      icon: 'success',
    });

  }
  
  const updateCartCtx = (infoNewCourse: infoCourseCartT) => {

    // VERIFICAR EXISTENCIA EN EN CARRITO
    // COMO SON CURSOS, LA REGLA SERÁ QUE SOLO SE PUEDE AGREGAR UNO, NO 
    // EXISTIRÁ UN CONTADOR DE TIPO QTY: 2 ... N... 

    const hasThisCourse = checkCourse(infoNewCourse.idCourse);

    if (hasThisCourse === true) {
      simpleAlertTimer({
        title: 'Este curso ya fue agregado',
        icon: 'warning',
      });
      return;
    }

    const updatedCartInfo = [
      ...cartCtx.infoCourse,
      infoNewCourse
    ];

    let total = 0;
    let totalDiscount = 0;

    updatedCartInfo.map((c) => {
      total += Number(c.discountPrice) !== 0 ? Number(c.discountPrice) : c.price; // preció a pagar total
      totalDiscount += c.price; // total a pagar SIN descuento ()
    });

    const updatedAllCart = {
      infoCourse: updatedCartInfo,
      total,
      totalDiscount
    }

    setCartCtx(updatedAllCart);

    // guarda en storage
    saveStorage({
      name: namesStorage.cartStorage,
      value: JSON.stringify(updatedAllCart)
    });

    simpleAlertTimer({
      title: 'Se ha agregado a tu carrito con éxito',
      icon: 'success',
    });

  }

  const clearCartCtx = () => {
    setCartCtx(cartInit);
    removeStorage({name: namesStorage.cartStorage});
  }


  // en la carga o reload o 'x', revisar si en storage hay un "carrito"....  temas de persistencia
  const checkStorage = () => {
    const currentCart = getCartStorage();

    if (isEmpty(currentCart.infoCourse) === true) {
      return;
    }

    setCartCtx(currentCart);

  }

  useEffect(() => {
    checkStorage();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  

  return (
    <CartContextHook.Provider
      value={{cartCtx, updateCartCtx, removeCourseCtx, clearCartCtx}}
    >
      {children}
    </CartContextHook.Provider>
  )
}

export {
  CartContextHook, CartContextProvider
}