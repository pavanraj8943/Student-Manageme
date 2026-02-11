import React from "react";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const DEFAULT_AVATAR = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64"><rect width="64" height="64" fill="%23e0f2f1"/><text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" font-size="28" fill="%230f766e" font-family="Arial">${user?.name?.charAt(0) || "U"}</text></svg>`;

    return (
        <header className="flex items-center justify-between py-6 px-10 bg-white shadow-sm border-b border-gray-100 mb-8 rounded-2xl">
            <div className="flex flex-col">
                <h1 className="text-2xl font-extrabold text-[#0f3f76] m-0 leading-tight">
                    Student<span className="text-[#10b981]">Desk</span>
                </h1>
                <p className="text-xs text-slate-500 font-medium tracking-wide uppercase">Management Dashboard</p>
            </div>

            <div className="flex items-center gap-6">
                <div className="text-right hidden sm:block">
                    <p className="text-sm font-bold text-slate-800 m-0">{user?.name || "User"}</p>
                    <div className="flex items-center gap-1 justify-end">
                        <span className="w-1.5 h-1.5 bg-[#14b8a6] rounded-full shadow-[0_0_8px_rgba(20,184,166,0.6)]"></span>
                        <p className="text-[10px] font-bold text-[#0f766e] uppercase tracking-tighter">Active session</p>
                    </div>
                </div>

                <div className="relative group">
                    <img
                        src={user?.image || DEFAULT_AVATAR}
                        alt="Profile"
                        className="w-12 h-12 rounded-full border-2 border-[#10b981] object-cover bg-emerald-50 shadow-md transition-transform group-hover:scale-105"
                    />
                </div>

                <button
                    onClick={handleLogout}
                    className="bg-slate-50 text-slate-700 border border-slate-200 py-2.5 px-5 rounded-xl text-sm font-bold transition hover:bg-slate-100 hover:text-slate-900 active:scale-95"
                >
                    Sign Out
                </button>
            </div>
        </header>
    );
};

export default Header;
