import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Layout from "../layout/Layout";

import AdminDashboard from "../pages/admin/AdminDashboard";
import ManageIndividual from "../pages/admin/ManageIndividual";
import ManageOffice from "../pages/admin/ManageOffice";
import ManageMeetingRoom from "../pages/admin/ManageMeetingRoom";
import UserDashboard from "../pages/user/UserDashboard";
import EditIndividualTable from "../pages/user/EditIndividualTable";
import EditOffice from "../pages/user/EditOffice";
import EditMeetingRoom from "../pages/user/EditMeetingRoom";
import Login from "../pages/Login";
import ReserveTable from "../pages/table/TableBooking";
import ReserveOffice from "../pages/office/OfficeBooking";
import ReserveMeetingRoom from "../pages/meetingRoom/MeetingRoomBooking";
import Contact from "../pages/contact/Contact";
import ManageReserves from "../pages/admin/ManageReserves";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "inici-sessio",
        element: <Login />,
      },
      {
        path: "contacte",
        element: <Contact />,
      },
      // Rutas compartidas entre admin y usuario
      {
        path: "reserva-taula",
        element: <ReserveTable />,
      },
      {
        path: "reserva-oficina",
        element: <ReserveOffice />,
      },
      {
        path: "reserva-reunio",
        element: <ReserveMeetingRoom />,
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
        path: "gestio-reserves",
        element: (
          <PrivateRoute requiredRole="admin">
            <ManageReserves />
          </PrivateRoute>
        ),
      },
      {
        path: "gestio-de-taules",
        element: (
          <PrivateRoute requiredRole="admin">
            <ManageIndividual />
          </PrivateRoute>
        ),
      },
      {
        path: "gestio-oficina",
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
        path: "edicio-reserva-taula",
        element: (
          <PrivateRoute requiredRole="user">
            <EditIndividualTable />
          </PrivateRoute>
        ),
      },
      {
        path: "edicio-reserva-oficina",
        element: (
          <PrivateRoute requiredRole="user">
            <EditOffice />
          </PrivateRoute>
        ),
      },
      {
        path: "edicio-reserva-sala-reunions",
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