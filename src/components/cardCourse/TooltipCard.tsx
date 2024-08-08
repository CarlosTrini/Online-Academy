import React, { useState, useEffect, useContext } from "react";
import { cardCourseT } from "../../typesInterfaces/types";
import moment from "moment";
import { isNil } from "lodash";
import './cardAndToolCourse.scss';
import { CartContextHook } from "../../context/CartContextProvider";
import { addToFavorites } from "../../helpers/favoritesActions";

type propsT = cardCourseT & {
  open: boolean;
}

const TooltipCard:React.FC<propsT> = (infoCard) => {
  const {
    duration,
    level,
    idCourse,
    idTeacher,
    imageCourse,
    price,
    // category,
    // score,
    // studentsQty,
    titleCourse,
    discountPrice,
    teacherName,
    lastUpdated,
    shortDescription,
    skills,
  } = infoCard;

  const {updateCartCtx} = useContext(CartContextHook);
  const [levelArrows, setLevelArrows] = useState<string[]>([]);

  const makeLevelArrows = () => {
    // 'Básico', 'Intermedio', 'Avanzado',
    const emptyArrows = 'fa-solid fa-caret-right text-secondary';
    const fillArrows = 'fa-solid fa-caret-right text-warning';
    
    const levelObj = {
      'Básico': [fillArrows, emptyArrows, emptyArrows], 
      'Intermedio': [fillArrows, fillArrows, emptyArrows],  
      'Avanzado': [fillArrows, fillArrows, fillArrows],
    };

    setLevelArrows(levelObj[level]);
  }

  useEffect(() => {
    if (isNil(level) === false) {
      makeLevelArrows();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [level]);

  return (
    <>
    {
        <div className={`p-3 tool-container`}>
          <p className="fs-18 fw-bold">
            {titleCourse}
          </p>
          <div className="d-flex justify-content-between">
            <p className="mb-0 fs-12 t-font-white">
              Actualización:  <span className="fw-bold"> {moment(lastUpdated, 'DD-MM-YYYY').format('MMMM D, YYYY')}</span>
            </p>
            <p className="mb-0 fs-12 t-font-white">
              Duración: <span className="fw-bold"> {duration} horas</span>
            </p>
          </div>
    
          <div className="my-2">
            <p className="mb-0 fs-14">
              Nivel
              <span className="fw-bold"> {level} </span>
              {levelArrows.map((a) => (
                <i className={`${a} mr-1`} ></i>
              ))}
            </p>
          </div>
    
          <div className="fs-14">
            <p className="mb-1 text-right fw-bold tool-short-desc" >
              {shortDescription}
            </p>
            <ul>
              {
                skills.map(s => {
                  return (
                    <li>{s}</li>
                  );
                })
              }
            </ul>
          </div>
    
          <div className="text-end">
            <button className="btn btn-outline-primary me-2"
              onClick={() => {
                const addCourse = {
                  idCourse,
                  imageCourse,
                  idTeacher,
                  titleCourse,
                  price,
                  discountPrice,
                  teacherName, 
                  isRepeated: false
                }
                updateCartCtx(addCourse);
              }}
            >
              <i className="fas fa-plus me-1 "></i>
              Añadir al carrito
              </button>
            <button className="btn btn-outline-danger"
              onClick={() => {
                addToFavorites(idCourse);
              }}
            >
              <i className="fas fa-heart "></i>
            </button>
          </div>
        </div>
    }
    </>
  );
};

// falta duracion, nivel

export default TooltipCard;
