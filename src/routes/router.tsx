import DefaultLayout from "@/components/Layouts/DefaultLayout";
import SignIn from "@/components/SignIn";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
    {
        element: <DefaultLayout />,
        children: [
            {
                path: "/",
                element: <SignIn />,
            },
        ],
    },
]);

export default router;
