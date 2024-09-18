import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Home from "../pages/Home";
import Login from "../pages/Login";
/* import SignIn from "../pages/SignIn"; */
/* import BranchPage from "../pages/BranchPage"; */
/* import TopicPage from "../pages/TopicPage"; */
/* import CreateTopicPage from "../pages/CreateTopicPage"; */
/* import CreateCommentPage from "../pages/CreateCommentPage"; */
/* import EditCommentPage from "../pages/EditCommentPage"; */
/* import EditProfilePage from "../pages/EditProfilePage"; */
/*  */
const router = createBrowserRouter ([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "login",
        element: <Login />
    },
 /*    { */
 /*        path: "signin", */
 /*        element: <SignIn /> */
 /*    }, */
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
        path: "create_comment",
        element: (
            <PrivateRoute>
                {/* <CreateCommentPage /> */}
            </PrivateRoute>)
    },
    {
        path: "edit_comment/:id",
        element: (
            <PrivateRoute>
                {/* <EditCommentPage /> */}
            </PrivateRoute>)
    },
    {
        path: "edit_profile/:id",
        element: (
            <PrivateRoute>
               {/*  <EditProfilePage /> */}
            </PrivateRoute>
            )
    }
])

export default router;