import React, { useEffect, useState } from "react";
import { coursesT, idCourseT } from "../../../typesInterfaces/types";
import { isEmpty, isNil } from "lodash";

import noFavorite from "../../../assets/no-favorite.png";

import "../userProfile.scss";
import { Spin } from "antd";
import { getStorageArr } from "../../../helpers/storagesFunc";
import { namesStorage } from "../../../initData/namesStorage";
import LongCard from "../components/LongCard";

type propsT = {
  idsCourses: idCourseT[];
  getUserInfo: () => void;
};

const Favorites: React.FC<propsT> = ({ idsCourses, getUserInfo }) => {
  const [loader, setLoader] = useState(true);
  const [courses, setCourses] = useState<coursesT[]>([]);

  const getFavorites = () => {
    setCourses([]);
    setLoader(true);

    if (isEmpty(idsCourses) === true) {
      setLoader(false);
      return;
    }

    // en casos de haber suscripciones, mostrar los cursos
    const courses = getStorageArr({
      name: namesStorage.coursesStorage,
    }) as coursesT[];
    if (isEmpty(courses) === true || isNil(courses) === true) {
      setLoader(true);
      return;
    }

    // si todo bien con los cursos en storage...
    let coursesUser: coursesT[] = [];
    idsCourses.forEach((c) => {
      const courseFound = courses.find((co) => co.id === c);
      if (isEmpty(courseFound) === false && isNil(courseFound) === false) {
        coursesUser = [...coursesUser, courseFound];
      }
    });

    setTimeout(() => {
      setLoader(false);
      setCourses(coursesUser);
    }, 1500);
  };

  useEffect(() => {
    getFavorites();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idsCourses]);

  return (
    <>
      <Spin spinning={loader} size="large">
        <section className="">
          {(isEmpty(courses) === true || isNil(courses) === true) && (
            <>
              <div className="no-courses-img mx-auto">
                <img src={noFavorite} alt="" />
              </div>
              <div className="text-center">
                <p className="mb-0 fs-20 text-primary ">
                  Aún no has agregado favoritos
                </p>
              </div>
            </>
          )}

          {isEmpty(courses) === false &&
            isNil(courses) === false &&
            courses.map((c) => {
              return (
                <>
                 <LongCard course={c} isFavoriteTab={true} callback={() => getUserInfo()}  />
                </>
              );
            })}
        </section>
      </Spin>
    </>
  );
};

export default Favorites;
