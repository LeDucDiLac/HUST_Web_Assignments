import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AddStudentForm from "../AddStudentForm";

// =================================================
// Bai 2

function HomePage() {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const navigate = useNavigate();

  const fetchStudents = () => {
    axios
      .get("http://localhost:5000/api/students")
      .then((response) => setStudents(response.data))
      .catch((error) => console.error("Error fetching students:", error));
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  // =========================================
  // Bai 4

  const handleDelete = (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa học sinh này?")) return;

    axios
      .delete(`http://localhost:5000/api/students/${id}`)
      .then((res) => {
        console.log(res.data.message);
        setStudents((prevList) => prevList.filter((s) => s._id !== id));
        alert("Xóa học sinh thành công!");
      })
      .catch((err) => {
        console.error("Lỗi khi xóa:", err);
        alert("Lỗi khi xóa học sinh");
      });
  };
  // ===============================================

  // ===============================================
  // Bai 5: Search functionality
  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  // ===============================================

  // ===============================================
  // Bai 6: Sort functionality
  const sortedStudents = [...filteredStudents].sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    if (nameA < nameB) return sortAsc ? -1 : 1;
    if (nameA > nameB) return sortAsc ? 1 : -1;
    return 0;
  });
  // ===============================================

  return (
    <div className="App">
      <h1>Student Management</h1>

      <AddStudentForm onStudentAdded={fetchStudents} />

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Tìm kiếm theo tên..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="sort-btn"
          onClick={() => setSortAsc((prev) => !prev)}
          title="Sắp xếp theo tên"
        >
          Sắp xếp: {sortAsc ? "A → Z" : "Z → A"}
        </button>
        {searchTerm && (
          <span className="search-info">
            Tìm thấy {filteredStudents.length} kết quả
          </span>
        )}
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Class</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedStudents.length > 0 ? (
            sortedStudents.map((student) => (
              <tr key={student._id}>
                <td>{student.name}</td>
                <td>{student.age}</td>
                <td>{student.class}</td>
                <td>
                  <button onClick={() => handleEdit(student._id)}>Sửa</button>
                  <button
                    onClick={() => handleDelete(student._id)}
                    className="delete-btn"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center", color: "#888" }}>
                {searchTerm
                  ? "Không tìm thấy học sinh nào"
                  : "Chưa có học sinh nào"}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default HomePage;
