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
import Login from "../pages/Login"
import ReserveTable from "../pages/table/TableBooking";
import ReserveOffice from "../pages/office/OfficeBooking";
import ReserveMeetingRoom from "../pages/meetingRoom/MeetingRoomBooking";
import Contact from "../pages/contact/Contact";

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
        element: <Login/>,
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
        element: <AdminDashboard />/* (
          <PrivateRoute requiredRole="admin">
            <AdminDashboard />
          </PrivateRoute>
        ) */,
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
        element: <UserDashboard />/* (
          <PrivateRoute requiredRole="user">
            <UserDashboard />
          </PrivateRoute>
        ) */,
      },
      {
        path: "edicio-reserva-taula",
        element: <EditIndividualTable/>/*(
          <PrivateRoute requiredRole="user">
            <EditIndividualTable />
          </PrivateRoute>
        )*/,
      },
      {
        path: "edicio-reserva-oficina",
        element: <EditOffice/>/*(
          <PrivateRoute requiredRole="user">
            <EditOffice />
          </PrivateRoute>
        )*/,
      },
      {
        path: "edicio-reserva-sala-reunions",
        element: <EditMeetingRoom />/*(
          <PrivateRoute requiredRole="user">
            <EditMeetingRoom />
          </PrivateRoute>
        )*/,
      },
    ],
  },
]);

export default router;
