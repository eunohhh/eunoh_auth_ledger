import { Outlet } from "react-router-dom";

function DefaultLayout() {
    return (
        <div id="default-layout" className="h-screen grid place-items-center">
            <Outlet />
        </div>
    );
}

export default DefaultLayout;
