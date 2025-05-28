import { Outlet } from "react-router-dom";
import Header from "../Global/Header/Header";
import Footer from "../Global/Footer/Footer";

const Layout = () => {
    return (
      <div className="layout">
        <Header />
        <Outlet/>
        <Footer />
      </div>
    );
  }
  
  export default Layout;