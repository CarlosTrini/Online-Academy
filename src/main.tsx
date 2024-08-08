import React from "react";
import ReactDOM from "react-dom/client";
// import App from './App.tsx';

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/mainStyles.scss";

// ROUTER
import { RouterProvider } from "react-router-dom";
import { routes } from "./routes/routes";
import {
  makeCategories,
  makeCourses,
  makeInitUsers,
  makeTeachers,
  makePopularCategories,
} from "./initData/initData";

// AQUI NECESITAMOS QUE SE CARGUE LA DATA INICIAL...
makeCourses();
makeTeachers();
makeInitUsers();
makeCategories();
makePopularCategories();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
      <RouterProvider router={routes} >
        {/* <App /> */}
      </RouterProvider>
  </React.StrictMode>
);
