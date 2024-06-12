// import api from "@/api/api";
import Detail from "@/components/Detail";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import SignIn from "@/components/SignIn";
import SignUp from "@/components/SignUp";
import LedgerPage from "@/components/pages/LedgerPage";
import MyPage from "@/components/pages/MyPage";
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
                element: <ProtectedRoute />,
                children: [
                    {
                        path: "/ledger",
                        element: <LedgerPage />,
                        // loader: () => api.ledger.getLedger(),
                    },
                    {
                        path: "/mypage",
                        element: <MyPage />,
                    },
                    {
                        path: "detail/:id",
                        element: <Detail />,
                    },
                ],
            },
        ],
    },
]);

export default router;
