import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../Components/Header";
import StudentForm from "../Components/StudentForm";
import StudentTable from "../Components/StudentTable";
import { useAuth } from "../Context/AuthContext";

const Dashboard = () => {
    const [students, setStudents] = useState([]);
    const [editingStudent, setEditingStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const { token } = useAuth();

    const fetchStudents = async () => {
        try {
            setLoading(true);
            const res = await axios.get("/api/students", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setStudents(res.data);
        } catch (err) {
            console.error("Failed to fetch students", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, [token]);

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this student?")) return;
        try {
            await axios.delete(`/api/students/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchStudents();
        } catch (err) {
            alert("Delete failed");
        }
    };

    const handleEdit = (student) => {
        setEditingStudent(student);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleSave = () => {
        setEditingStudent(null);
        fetchStudents();
    };

    return (
        <div className="min-h-screen bg-[#f3f4f6] px-4 py-8 sm:px-10 lg:px-20 font-sans">
            <div className="max-w-6xl mx-auto">
                <Header />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1">
                        <StudentForm
                            onSave={handleSave}
                            editingStudent={editingStudent}
                            onCancel={() => setEditingStudent(null)}
                        />
                    </div>

                    <div className="lg:col-span-2">
                        <StudentTable
                            students={students}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            loading={loading}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
