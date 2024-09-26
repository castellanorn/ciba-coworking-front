import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Home from "../pages/Home";
import Layout from "../layout/Layout";
import OfficeBooking from "../pages/OfficeBooking";
import MeetingRoomBooking from "../pages/MeetingRoomBooking";
import TableBooking from "../pages/TableBooking";
import Contact from "../pages/Contact";
import AdminDashboard from "../pages/admin/AdminDashboard";
import ManageIndividual from "../pages/admin/ManageIndividual";
import ManageOffice from "../pages/admin/ManageOffice";
import ManageMeetingRoom from "../pages/admin/ManageMeetingRoom";
import UserDashboard from "../pages/user/UserDashboard";
import EditIndividualTable from "../pages/user/EditIndividualTable";
import EditOffice from "../pages/user/EditOffice";
import EditMeetingRoom from "../pages/user/EditMeetingRoom";
import Login from "../pages/Login"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "inici-sessio",
        element: <Login/>,
      },
      {
        path: "contacte",
        element: <Contact />,
      },
      // Rutas compartidas entre admin y usuario
      {
        path: "reservar-taula",
        element: <TableBooking />,
      },
      {
        path: "reservar-despatx",
        element: <OfficeBooking />,
      },
      {
        path: "reservar-reunio",
        element: <MeetingRoomBooking />,
      },
      // Rutas admin
      {
        path: "panell-administrador",
        element: (
          <PrivateRoute requiredRole="admin">
            <AdminDashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "gestio-de-taulas",
        element: (
          <PrivateRoute requiredRole="admin">
            <ManageIndividual />
          </PrivateRoute>
        ),
      },
      {
        path: "gestio-despatx",
        element: (
          <PrivateRoute requiredRole="admin">
            <ManageOffice />
          </PrivateRoute>
        ),
      },
      {
        path: "gestio-reunio",
        element: (
          <PrivateRoute requiredRole="admin">
            <ManageMeetingRoom />
          </PrivateRoute>
        ),
      },
      // Rutas user
      {
        path: "panell-usuari",
        element: (
          <PrivateRoute requiredRole="user">
            <UserDashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "edit-reserve-taula",
        element: (
          <PrivateRoute requiredRole="user">
            <EditIndividualTable />
          </PrivateRoute>
        ),
      },
      {
        path: "edit-reserve-despatx",
        element: (
          <PrivateRoute requiredRole="user">
            <EditOffice />
          </PrivateRoute>
        ),
      },
      {
        path: "edit-reserva-sala-reunions",
        element: (
          <PrivateRoute requiredRole="user">
            <EditMeetingRoom />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
