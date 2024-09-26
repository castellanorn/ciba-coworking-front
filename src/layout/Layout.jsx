import { Outlet } from "react-router-dom";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";


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