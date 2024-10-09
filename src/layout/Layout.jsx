import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
/* import MenuMobile from "../components/header/MenuMobile"; */

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
      {/*   <MenuMobile /> */}
      </nav>
    </div>
  );
};

export default Layout;