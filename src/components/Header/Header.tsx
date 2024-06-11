import useAuth from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

function Header() {
    const navigate = useNavigate();
    const { user, logOut } = useAuth();

    const handleHomeClick = () => navigate("/ledger");

    const handleProfileImageclick = () => navigate("/mypage");

    const handleProfileClick = () => navigate("/mypage");
    const handleLogOutClick = () => {
        logOut();
        navigate("/");
    };

    return (
        <header className="h-16">
            <nav className="h-full bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-600">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <div className="flex cursor-pointer">
                        <img
                            src="https://flowbite.com/docs/images/logo.svg"
                            className="mr-3 h-6 sm:h-9"
                            alt="Flowbite Logo"
                        />
                        <span
                            onClick={handleHomeClick}
                            className="self-center text-xl font-semibold whitespace-nowrap dark:text-white cu"
                        >
                            인증기능이 있는 가계부
                        </span>
                    </div>

                    <div className="flex items-center lg:order-2 gap-2">
                        <div className="w-10 h-10 rounded-full overflow-hidden">
                            <img
                                className="w-full h-full object-cover cursor-pointer"
                                src={
                                    user?.avatar
                                        ? user.avatar
                                        : "/default-profile.jpg"
                                }
                                alt="header-profile-image"
                                onClick={handleProfileImageclick}
                            />
                        </div>

                        <button
                            onClick={handleHomeClick}
                            className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                        >
                            Home
                        </button>
                        <button
                            onClick={handleProfileClick}
                            className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                        >
                            My Profile
                        </button>
                        <button
                            onClick={handleLogOutClick}
                            className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                        >
                            Log Out
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;
