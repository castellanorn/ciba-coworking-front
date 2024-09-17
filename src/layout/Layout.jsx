import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";


const Layout = () => {
  return (
    <div>
      <nav>
        <Navbar></Navbar>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;