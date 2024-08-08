import { useEffect, useContext, useState } from "react";
import { AuthContextHook } from "../../context/AuthContextProvider";

import {
  loginDataT,
  typeUserCategory,
  userT,
} from "../../typesInterfaces/types";
import { getStorageArr, getStorageObj } from "../../helpers/storagesFunc";
import { namesStorage } from "../../initData/namesStorage";
import { isEmpty, isNil } from "lodash";
import { useNavigate } from "react-router-dom";
import { Spin, Tabs } from "antd";

import "./userProfile.scss";
import TabInfo from "./tabs/TabInfo";
import Subscriptions from "./tabs/Subscriptions";
import Favorites from "./tabs/Favorites";
import CreditCard from "./tabs/CreditCard";

const userInfoInit = {
  typeUser: "Estudiante" as typeUserCategory,
  user: "",
  email: "",
  password: "",
  id: "",
  name: "",
  lastName: "",
  favorites: [],
  subscriptions: [],
  card: [
    //     {
    //     nameOwner: '',
    //     cardNumber: '',
    //     date: '',
    //     cvv: '',
    // }
  ],
  picture: "",
};

const UserProfile = () => {
  const NAVIGATE = useNavigate();
  const { isAuth } = useContext(AuthContextHook);

  const [userInfo, setUserInfo] = useState<userT>(userInfoInit);
  const [ userNotFound, setUserNotFound] = useState(false);
  const [loader, setLoader] = useState(true);

  const getUserInfo = () => {
    setLoader(true);
    const currentUser: loginDataT = getStorageObj({
      name: namesStorage.loginDataStorage,
    }) as loginDataT;

    const allUsers: userT[] = getStorageArr({
      name: namesStorage.usersStorage,
    });

    if (isEmpty(currentUser) === true || isNil(currentUser) === true) {
      setLoader(false);
      return NAVIGATE("/");
    }

    // si todo bien
    const findUser = allUsers.find((u) => u.id === currentUser.idUser);

    if (isNil(findUser) === true || isEmpty(findUser) === true) {
      setLoader(false);
      return setUserNotFound(true);
    }

    // si si sale el usuario...
    setUserInfo(findUser);
    setLoader(false);
    setUserNotFound(false);
  };

  useEffect(() => {
    setTimeout(() => {
      if (isAuth) {
        getUserInfo();
      }
    }, 1500);

  
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth]);

  return (
    <>
      <section className="w-sections">
        <Spin spinning={loader} size="large" style={{ minHeight: 300 }}>

          {
            userNotFound === false && (
              <section className="mt-3 p-3 border rounded ">
                <header className="text-center user-header">
                  <img
                    src={userInfo?.picture}
                    alt=""
                    width={200}
                    height={200}
                    className="rounded-circle"
                  />
                  <p className="fs-30 mb-0 text-50">
                    <i className="fa-regular fa-id-card me-2"></i>
                    {userInfo?.name} {userInfo?.lastName}{" "}
                  </p>
                  <p className="fs-14 mb-0 text-primary">
                    <i className="fas fa-user me-2"></i>
                    usuario: {userInfo?.user}
                  </p>
                  <p className="fs-14 mb-0 text-primary">{userInfo?.typeUser}</p>
                </header>

                <Tabs
                destroyInactiveTabPane={true}
                  tabPosition={"left"}
                  className="mt-3"
                  items={[
                    {
                      label: (
                        <>
                          <p className="mb-0">
                            {" "}
                            <i className="fas fa-user me-2"></i>Información básica{" "}
                          </p>
                        </>
                      ),
                      key: "1",
                      children: (
                        <TabInfo
                          userInfo={userInfo}
                          callback={() => getUserInfo()}
                        />
                      ),
                    },
                    {
                      label: (
                        <>
                          <p className="mb-0">
                            {" "}
                            <i className="fas fa-glasses me-2"></i> Mis
                            suscripciones{" "}
                          </p>
                        </>
                      ),
                      key: "2",
                      children: (
                        <Subscriptions
                          idsCourses={userInfo.subscriptions}
                          getUserInfo={() => getUserInfo()}
                        />
                      ),
                    },
                    {
                      label: (
                        <>
                          <p className="mb-0">
                            {" "}
                            <i className="fas fa-bookmark me-2"></i> Mis favoritos{" "}
                          </p>
                        </>
                      ),
                      key: "3",
                      children: (
                        <Favorites
                          idsCourses={userInfo.favorites}
                          getUserInfo={() => getUserInfo()}
                        />
                      ),
                    },
                    {
                      label: (
                        <>
                          <p className="mb-0">
                            {" "}
                            <i className="fas fa-credit-card me-2"></i> Mis tarjetas{" "}
                          </p>
                        </>
                      ),
                      key: "4",
                      children: <CreditCard userInfo={userInfo} />,
                    },
                  ]}
                />
              </section>
            )
          }

        </Spin>
      </section>
    </>
  );
};

export default UserProfile;
