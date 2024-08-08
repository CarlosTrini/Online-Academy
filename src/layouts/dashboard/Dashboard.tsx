import {} from "react";
import { Outlet } from "react-router-dom";

import "./dashboardStyles.scss";

import Header from "../../components/header/Header";
import { CartContextProvider } from "../../context/CartContextProvider";
import { CategoryContextProvider } from "../../context/categoryContextProvider";
import { AuthContextProvider } from "../../context/AuthContextProvider";

const Dashboard = () => {
  return (
    <>
      <AuthContextProvider>
        <CategoryContextProvider>
          <CartContextProvider>
            <main className="bg-main">
              <Header />
              <Outlet />
              <footer className="footer text-center ">
                <p className="fs-28 text-primary">Online Academy</p>
                <span className="text-warning">Carlos Trinidad</span>
              </footer>
            </main>
          </CartContextProvider>
        </CategoryContextProvider>
      </AuthContextProvider>
    </>
  );
};

export default Dashboard;
