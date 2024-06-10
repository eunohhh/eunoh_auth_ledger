import useAuth from "@/hooks/useAuth";
import { Outlet } from "react-router-dom";
import Header from "../Header";

function DefaultLayout() {
    const { isLoggedIn } = useAuth();

    return (
        <>
            {isLoggedIn ? <Header /> : null}

            <main
                id="default-layout"
                className="h-screen grid place-items-center"
            >
                <Outlet />
            </main>
        </>
    );
}

export default DefaultLayout;
