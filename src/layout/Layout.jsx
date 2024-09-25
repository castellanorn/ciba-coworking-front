import { Outlet } from "react-router-dom";
import HeaderMobile from "../components/header/Header";
import FooterMobile from "../components/footer/Footer";


const Layout = () => {
  return (
    <div>
      <nav>
        <HeaderMobile/>
      </nav>
      <main>
        <Outlet />
      </main>
      <nav>
        <FooterMobile/>
      </nav>
    </div>
  );
};

export default Layout;