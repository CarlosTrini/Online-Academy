import { createBrowserRouter } from "react-router-dom";

import MainPagePublic from "../pages/mainPagePublic/MainPagePublic";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import ErrorPage from "../pages/404/ErrorPage";
import Dashboard from "../layouts/dashboard/Dashboard";
import InfoByCourseName from "../pages/InfoByCourseName/InfoByCourseName";
import TeachersCourse from "../pages/teachersCourse/TeachersCourse";
import InfoByCategory from "../pages/InfoByCategory/InfoByCategory";
import UserProfile from "../pages/profile/UserProfile";
import Cart from "../pages/cart/Cart";

const routes = createBrowserRouter([
  {
    path: "/:id?",
    element: <Dashboard />,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <MainPagePublic />,
      },
      {
        path: "cart/:idUser",
        element: <Cart />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    // errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/profile/:id",
    element: <Dashboard />,
    children: [
      {
        // path: './',
        index: true,
        element: <UserProfile />,
      },
    ],
  },

  {
    path: "/course",
    element: <Dashboard />,
    children: [
      {
        path: "by-name/:courseName",
        element: <InfoByCourseName />,
      },
      {
        path: "by-teacher/:idTeacher",
        element: <TeachersCourse />,
      },
      {
        path: "by-category/:courseCategoryName",
        element: <InfoByCategory />,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

// TODO: RUTA CON NOMBRE DE CATEGORIA... course-by-category/:byCategoryName

export { routes };
