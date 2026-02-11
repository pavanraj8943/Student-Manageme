import React from "react";

const StudentTable = ({ students, onEdit, onDelete, loading }) => {
    if (loading) {
        return (
            <div className="bg-white rounded-3xl p-10 shadow-xl border border-slate-50 text-center">
                <div className="inline-block w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-slate-500 font-medium">Fetching students...</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-50">
            <div className="p-6 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
                <h3 className="font-extrabold text-slate-800 text-lg uppercase tracking-wider">Student Registry</h3>
                <span className="text-xs font-bold text-slate-400">{students.length} Total Records</span>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-[#f8fafc]">
                        <tr>
                            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Student</th>
                            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest hidden md:table-cell">Roll No</th>
                            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest hidden lg:table-cell">Email</th>
                            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">S1</th>
                            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">S2</th>
                            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">S3</th>
                            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Total</th>
                            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {students.length === 0 ? (
                            <tr>
                                <td colSpan="8" className="px-6 py-12 text-center text-slate-400 font-medium">
                                    No records found in database
                                </td>
                            </tr>
                        ) : (
                            students.map((student) => {
                                const total =
                                    (student.marks?.subject1 || 0) +
                                    (student.marks?.subject2 || 0) +
                                    (student.marks?.subject3 || 0);

                                return (
                                    <tr key={student._id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="px-6 py-4 font-bold text-slate-700">{student.name}</td>
                                        <td className="px-6 py-4 text-slate-500 text-sm hidden md:table-cell">{student.rollNumber}</td>
                                        <td className="px-6 py-4 text-slate-500 text-sm hidden lg:table-cell">{student.email}</td>
                                        <td className="px-6 py-4 text-slate-600 font-medium">{student.marks?.subject1 || 0}</td>
                                        <td className="px-6 py-4 text-slate-600 font-medium">{student.marks?.subject2 || 0}</td>
                                        <td className="px-6 py-4 text-slate-600 font-medium">{student.marks?.subject3 || 0}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-md text-xs font-black ${total > 200 ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-500'}`}>
                                                {total}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right space-x-2">
                                            <button
                                                onClick={() => onEdit(student)}
                                                className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => onDelete(student._id)}
                                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StudentTable;
