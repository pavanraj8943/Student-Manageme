import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";

const StudentForm = ({ onSave, editingStudent, onCancel }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        rollNumber: "",
        marks: { subject1: 0, subject2: 0, subject3: 0 }
    });
    const [isExpanded, setIsExpanded] = useState(false);
    const { token } = useAuth();

    useEffect(() => {
        if (editingStudent) {
            setFormData({
                name: editingStudent.name,
                email: editingStudent.email,
                rollNumber: editingStudent.rollNumber,
                marks: editingStudent.marks || { subject1: 0, subject2: 0, subject3: 0 }
            });
            setIsExpanded(true);
        } else {
            setFormData({
                name: "",
                email: "",
                rollNumber: "",
                marks: { subject1: 0, subject2: 0, subject3: 0 }
            });
        }
    }, [editingStudent]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const config = { headers: { Authorization: `Bearer ${token}` } };
            if (editingStudent) {
                await axios.put(`/api/students/${editingStudent._id}`, formData, config);
            } else {
                await axios.post("/api/students", formData, config);
            }
            onSave();
            setFormData({
                name: "",
                email: "",
                rollNumber: "",
                marks: { subject1: 0, subject2: 0, subject3: 0 }
            });
        } catch (err) {
            alert(err.response?.data?.message || "Operation failed");
        }
    };

    return (
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-emerald-50 animate-fadeInUp">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-extrabold text-slate-800">
                    {editingStudent ? "Edit Student" : "Add Student"}
                </h2>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full uppercase">Records</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition"
                    required
                />
                <input
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition"
                    required
                />
                <input
                    type="text"
                    placeholder="Roll Number"
                    value={formData.rollNumber}
                    onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition"
                    required
                />

                <div className="mt-6">
                    <button
                        type="button"
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="w-full flex justify-between items-center bg-emerald-50/50 p-3 rounded-xl text-sm font-bold text-slate-700 border border-emerald-100 transition hover:bg-emerald-50"
                    >
                        Subject Marks
                        <span className={`transform transition-transform ${isExpanded ? "rotate-180" : ""}`}>▼</span>
                    </button>

                    {isExpanded && (
                        <div className="mt-4 space-y-3 p-2 animate-fadeIn">
                            <div className="flex gap-4 items-center">
                                <label className="text-xs font-bold text-slate-500 w-24">Subject 1</label>
                                <input
                                    type="number"
                                    value={formData.marks.subject1}
                                    onChange={(e) => setFormData({ ...formData, marks: { ...formData.marks, subject1: Number(e.target.value) } })}
                                    className="flex-1 bg-slate-50 border border-slate-100 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-emerald-500/30"
                                />
                            </div>
                            <div className="flex gap-4 items-center">
                                <label className="text-xs font-bold text-slate-500 w-24">Subject 2</label>
                                <input
                                    type="number"
                                    value={formData.marks.subject2}
                                    onChange={(e) => setFormData({ ...formData, marks: { ...formData.marks, subject2: Number(e.target.value) } })}
                                    className="flex-1 bg-slate-50 border border-slate-100 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-emerald-500/30"
                                />
                            </div>
                            <div className="flex gap-4 items-center">
                                <label className="text-xs font-bold text-slate-500 w-24">Subject 3</label>
                                <input
                                    type="number"
                                    value={formData.marks.subject3}
                                    onChange={(e) => setFormData({ ...formData, marks: { ...formData.marks, subject3: Number(e.target.value) } })}
                                    className="flex-1 bg-slate-50 border border-slate-100 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-emerald-500/30"
                                />
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex gap-3 pt-4">
                    <button
                        type="submit"
                        className="flex-1 py-3.5 bg-emerald-600 text-white rounded-xl font-bold shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition active:scale-95"
                    >
                        {editingStudent ? "Update Record" : "Save Student"}
                    </button>
                    {editingStudent && (
                        <button
                            type="button"
                            onClick={onCancel}
                            className="px-6 py-3.5 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default StudentForm;
