import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Layout from "../layout/Layout";
import ReserveTable from "../pages/ReserveTable"
import ReserveOffice from "../pages/ReserveOffice";
import ReserveMeetingRoom from "../pages/ReserveMeetingRoom";
// import EditReserveTable from "../pages/EditReserveTable";
import Contact from "../pages/Contact";
/* import SignIn from "../pages/SignIn"; */
/* import BranchPage from "../pages/BranchPage"; */
/* import TopicPage from "../pages/TopicPage"; */
/* import CreateTopicPage from "../pages/CreateTopicPage"; */
/* import EditProfilePage from "../pages/EditProfilePage"; */
/*  */
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
                path: "login",
                element: <Login />,
            },
            { 
                path: "reserve_office_page", 
                element: <ReserveOffice /> 
            }, 
            { 
                path: "reserve_table_page", 
                element: <ReserveTable /> 
            },
            
                {
                    path: "reserve_meeting_room_page",
                    element: <ReserveMeetingRoom/>
                },
            // {
            //     path: "edit_reserve_table_page",
            //     element: <EditReserveTable/>
            // },
            {
                path: "/contact_page",
                element: <Contact/>
            },
            /*    { */
            /*        path: "branch/:id", */
            /*        element: <BranchPage /> */
            /*    }, */
            /*    { */
            /*        path: "topic/:id", */
            /*        element: <TopicPage /> */
            /*    }, */
            {
                path: "create_topic",
                element: (
                    <PrivateRoute>
                        {/* <CreateTopicPage /> */}
                    </PrivateRoute>)
            },
            {
                path: "edit_profile/:id",
                element: (
                    <PrivateRoute>
                        {/*  <EditProfilePage /> */}
                    </PrivateRoute>
                )
            }]
},
])
export default router;