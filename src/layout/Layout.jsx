import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

const Layout = () => {
  return (
    <div>
      <nav>
        <Header/>
      </nav>
      <main>
        <Outlet />
      </main>
      <nav>
        <Footer/>
      </nav>
    </div>
  );
};

export default Layout;