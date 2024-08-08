import React, { createContext, useEffect, useState } from "react";
import { getStorageString, removeStorage, saveStorage } from "../helpers/storagesFunc";
import { namesStorage } from "../initData/namesStorage";
import { isNil } from "lodash";
import { useLocation } from "react-router-dom";

type propsT = {
  children: JSX.Element;
};

type CategoryContextType = {
  currentCategoryCtx: string | undefined;
    updateCurrentCategory: (category: string | undefined) => void;
  };

const CategoryContextHook = createContext<CategoryContextType>({
  currentCategoryCtx: '',
    updateCurrentCategory: () => {}
});

const CategoryContextProvider: React.FC<propsT> = ({ children }) => {

    const LOCATION = useLocation();

  const [currentCategoryCtx, setCurrentCategoryCtx] = useState<
    string | undefined
  >(undefined);

  const updateCurrentCategory = (category: string | undefined) => {
    setCurrentCategoryCtx(category);

    if (isNil(category) === true) {
      removeStorage({ name: namesStorage.currentCategoryStorage });
      return;
    }

    saveStorage({
      name: namesStorage.currentCategoryStorage,
      value: category,
    });
  };

  const checkCategory = () => {
    const currentCategory = getStorageString({
      name: namesStorage.currentCategoryStorage,
    });

    if (currentCategory !== '') {
        return setCurrentCategoryCtx(currentCategory);
    }

    // en caso de que sea otra cosas...
   resetCategory();


  };

  const resetCategory = () => {
    removeStorage({
        name: namesStorage.currentCategoryStorage
    });
    setCurrentCategoryCtx(undefined);
  }

  useEffect(() => {
    if (LOCATION.pathname.includes('/by-category/') === false) {
        resetCategory();
    }

    checkCategory();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [LOCATION.pathname]);

  return (
    <CategoryContextHook.Provider
      value={{
        currentCategoryCtx,
        updateCurrentCategory,
      }}
    >
      {children}
    </CategoryContextHook.Provider>
  );
};

export { CategoryContextHook, CategoryContextProvider };
