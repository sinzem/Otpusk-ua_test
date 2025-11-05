import { Outlet } from "react-router-dom";
import { Header } from "../components/header/Header";
import { Footer } from "../components/footer/Footer";
import { Loader } from "../components/loader/Loader";

const Layout = () => {
    return (
        <div className="main">
          <Header />
          <Outlet />
          <Footer />
          <Loader /> 
        </div>
    );
};

export { Layout };