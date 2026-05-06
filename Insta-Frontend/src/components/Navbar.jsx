import { useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();

    return (
        <div className="border-b bg-white fixed top-0 w-full z-10">
            <div className="max-w-4xl mx-auto flex justify-between items-center p-3">

                {/* Logo */}
                <h1
                    onClick={() => navigate("/")}
                    className="cursor-pointer font-bold text-lg"
                >
                    Instagram
                </h1>

                {/* Icons */}
                <div className="flex gap-5 text-xl cursor-pointer">

                    {/* Home */}
                    <span onClick={() => navigate("/")}>🏠</span>

                    {/* Add Post (future use) */}
                    <span>➕</span>

                    {/* Likes */}
                    <span>❤️</span>

                    {/* 🔥 CHAT BUTTON ADD */}
                    <span onClick={() => navigate("/chat")}>💬</span>

                    {/* Profile */}
                    <span onClick={() => navigate("/profile")}>👤</span>

                </div>

            </div>
        </div>
    );
}

export default Navbar;