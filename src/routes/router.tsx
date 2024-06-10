import DefaultLayout from "@/components/Layouts/DefaultLayout";
import SignIn from "@/components/SignIn";
import SignUp from "@/components/SignUp";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter([
    {
        element: <DefaultLayout />,
        children: [
            {
                path: "/",
                element: <SignIn />,
            },
            {
                path: "/sign-up",
                element: <SignUp />,
            },
            {
                path: "/ledger",
                element: <ProtectedRoute />,
                children: [
                    {
                        path: "/ledger",
                        element: <div>보이냐?</div>,
                    },
                ],
            },
        ],
    },
]);

export default router;
