import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#020617] via-[#020617] to-[#0b1120] text-gray-200 px-6">
      <div className="max-w-4xl w-full text-center flex flex-col items-center gap-8 animate-fadeInUp">

        {/* Icon */}
        <div className="p-4 rounded-full bg-emerald-500/20">
          <svg
            className="w-20 h-20 text-sky-400 drop-shadow-[0_0_24px_rgba(56,189,248,0.7)]"
            viewBox="0 0 64 64"
            fill="none"
          >
            <path d="M32 12L8 24L32 36L56 24L32 12Z" stroke="currentColor" strokeWidth="3"/>
            <path d="M8 24V40C8 44 12 48 16 48H20" stroke="currentColor" strokeWidth="3"/>
            <path d="M56 24V40C56 44 52 48 48 48H44" stroke="currentColor" strokeWidth="3"/>
          </svg>
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-extrabold">
          <span className="block">StudentDesk</span>
          <span className="block text-blue-200">Student Management</span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-xl text-lg text-slate-300">
          Secure dashboard for student records, ready when you are.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/login"
            className="px-8 py-3 rounded-full bg-blue-600 hover:bg-blue-700 transition shadow-lg font-semibold"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="px-8 py-3 rounded-full border border-slate-400 hover:bg-slate-800 transition font-semibold"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
