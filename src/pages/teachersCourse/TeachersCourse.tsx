import  { useEffect, useState } from "react";
import { Spin } from "antd";
import { cardCourseT, coursesT, teacherT } from "../../typesInterfaces/types";
import { getStorageArr } from "../../helpers/storagesFunc";
import { namesStorage } from "../../initData/namesStorage";
import { isEmpty, isNil } from "lodash";

import "react-multi-carousel/lib/styles.css";
import notFoundImage from "../../assets/not-found-courses-teacher.svg";
import "./teacherCourseName.scss";
import CardCourse from "../../components/cardCourse/CardCourse";
import { useParams } from "react-router-dom";

import noPictureImg from "../../assets/teachers.svg";
import { Badge } from "react-bootstrap";


const TeachersCourse = () => {
  const PARAMS = useParams();

  const [notFoundCourse, setNotFoundCourse] = useState(false);
  const [coursesInfo, setCoursesInfo] = useState<cardCourseT[]>([]);
  const [loaderMoreCourses, setLoaderMoreCourses] = useState(true);
  const [teacherInfo, setTeacherInfo] = useState<teacherT>();

  const [average, setAverage] = useState({
    mark: 0,
    comments: 0,
    studentes: 0,
    courses: 0,
  });

  const makeAverages = (allTeacherCourses: coursesT[]) => {
    let totalStudents = 0;
    let totalComments = 0;
    let totalMarks = 0;

    const totalCourses = allTeacherCourses.length;
    allTeacherCourses.map((t) => (totalStudents += t.students));
    // allTeacherCourses.map((t) => (totalComments += t.commentsCourse?.length));
    allTeacherCourses.map((t) => {
      if (isNil(t.commentsCourse) === false ) {
        totalComments += t.commentsCourse.length;
      } else {
        totalComments = 0;
      }
    });
    allTeacherCourses.map((t) => (totalMarks += t.score));

    setAverage({
      courses: totalCourses,
      studentes: totalStudents,
      comments: totalComments,
      mark: Math.ceil(totalMarks / totalCourses),
    });
  };

  const getTeacherInfo = (idTeacher: teacherT["id"]) => {
    setLoaderMoreCourses(true);

    // ==> ==> GET CURSOS DEL INSTRUCTOR
    const courses = getStorageArr({ name: namesStorage.coursesStorage });

    if (isEmpty(courses) === true || idTeacher === "") {
      return setNotFoundCourse(true);
    }

    setNotFoundCourse(false);
    // ya con los cursos, traemos los que le pertenecen al teacher
    const allTeacherCourses: coursesT[] = courses.filter(
      (c: coursesT) => c.idTeacher === idTeacher
    );

    if (
      isEmpty(allTeacherCourses) === true ||
      isNil(allTeacherCourses) === true
    ) {
      return setNotFoundCourse(true);
    }

    // ==> ==> GET INFO DEL INSTRUCTOR
    const teachers = getStorageArr({ name: namesStorage.teachersStorage });

    if (isEmpty(teachers) === true || idTeacher === "") {
      return;
    }

    const teacherFilter: teacherT = teachers.find(
      (t: teacherT) => t.id === idTeacher
    );
    if (isNil(teacherFilter) === true || isEmpty(teacherFilter) === true) {
      return;
    }

    const cardCourse: cardCourseT[] = allTeacherCourses.map((t) => {
      return {
        level: t.level,
        duration: t.courseDuration,
        idCourse: t.id,
        imageCourse: t.image,
        idTeacher: t.idTeacher,
        titleCourse: t.title,
        score: t.score,
        price: t.price,
        category: t.category,
        discountPrice: t.discountPrice,
        studentsQty: t.students,
        teacherName: teacherFilter.name + " " + teacherFilter.lastName,
        lastUpdated: t.lastUpdated,
        shortDescription: t.shortDescription,
        skills: t.skills,
      };
    });

    //simulamos la consulta
    setTimeout(() => {
      makeAverages(allTeacherCourses);
      setTeacherInfo(teacherFilter);
      setCoursesInfo(cardCourse);
      setLoaderMoreCourses(false);
    }, 1500);
  };

  useEffect(() => {
    if (isNil(PARAMS.idTeacher) === false && PARAMS.idTeacher !== "") {
      getTeacherInfo(PARAMS.idTeacher);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [PARAMS]);

  return (
    <>
     <Spin
          spinning={loaderMoreCourses}
          size="large"
          // style={{ minHeight: 500, background: "blue" }}
        >
          <section className="w-sections teacher-header">
            <div className="header-img">
              <img src={teacherInfo?.picture || noPictureImg} alt="" />
            </div>
            <div className="ms-4">
              <p className="fs-30 fw-bold mb-0">
                {teacherInfo?.name} {teacherInfo?.lastName}
              </p>
              <Badge bg="primary">{teacherInfo?.typeUser}</Badge>
              <p className="mt-3 fs-18">
                {" "}
                <i className="fas fa-star text-primary me-2"></i> Puntuación
                promedio : <span className=" fw-bold">{average.mark}</span>{" "}
              </p>
              <p className="fs-18">
                {" "}
                <i className="fas fa-comment text-primary me-2"></i> Comentarios:{" "}
                <span className=" fw-bold">{average.comments}</span>{" "}
              </p>
              <p className="fs-18">
                {" "}
                <i className="fas fa-users text-primary me-2"></i> Cantidad de
                estudiantes: <span className=" fw-bold">{average.studentes}</span>{" "}
              </p>
              <p className="fs-18">
                {" "}
                <i className="fas fa-book text-primary me-2"></i> cursos:{" "}
                <span className=" fw-bold">{average.courses}</span>{" "}
              </p>
            </div>
          </section>

          <section className="w-sections mt-5 teacher-about ">
            <div className="teacher-desc ">
              <p className="fs-22 fw-bold">Sobre el instructor</p>

              <p className="fs-20 fw-bold text-primary">
                <i className="fas fa-hand text-primary me-2"></i>
                {teacherInfo?.aboutMe.greeting}
              </p>

              <p className="fs-20">{teacherInfo?.aboutMe.text}</p>
            </div>
            <div>
              <ul className="list-unstyled teacher-links fw-bold text-white">
                <li className="">
                  {" "}
                  <a href="#">
                    {" "}
                    <i className="fas fa-link me-2 "></i> Página web{" "}
                  </a>
                </li>
                <li className="">
                  {" "}
                  <a href="#">
                    <i className="fa-brands fa-facebook me-2 "></i> Facebok{" "}
                  </a>
                </li>
                <li className="">
                  {" "}
                  <a href="#">
                    <i className="fa-brands fa-linkedin me-2 "></i> LinkedIn{" "}
                  </a>
                </li>
                <li className="">
                  {" "}
                  <a href="#">
                    <i className="fa-brands fa-tiktok me-2 "></i> TikTok{" "}
                  </a>
                </li>
              </ul>
            </div>
          </section>

        </Spin>


        <Spin
          spinning={loaderMoreCourses}
          size="large"
          // style={{ minHeight: 500, background: "blue" }}
        >
      <section className="w-sections mt-5">
        <p className="fs-22 fw-bold">Cursos <span>({coursesInfo.length})</span></p>
          {notFoundCourse === true && (
            <>
              <div className="not-found-container">
                <div className="not-found-image">
                  <img src={notFoundImage} alt="" />
                </div>
                <div className="text-center">
                  <p className="fs-22 fw-bold text-primary">
                    No hemos encontramos más cursos de este instructor
                  </p>
                </div>
              </div>
            </>
          )}

          {notFoundCourse === false && (
            <>
              <div>
                <p className="fs-18 text-primary">
                  <i className="fas fa-video me-2"></i>
                  Cursos de este Instructor
                </p>
              </div>

              <div className="teacher-courses">
                 {coursesInfo.map((t) => (
                    <CardCourse open={true} {...t} key={t.idTeacher} />
                  ))}
              </div>
             
            </>
          )}
      </section>
        </Spin>
    </>
  );
};

export default TeachersCourse;
