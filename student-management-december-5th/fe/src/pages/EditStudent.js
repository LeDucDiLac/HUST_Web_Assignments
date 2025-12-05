import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

// ==============================================
// Bai 3 

function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [stuClass, setStuClass] = useState("");

  // Fetch student data when component loads
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/students/${id}`)
      .then((res) => {
        setName(res.data.name);
        setAge(res.data.age);
        setStuClass(res.data.class);
      })
      .catch((err) => console.error(err));
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:5000/api/students/${id}`, {
        name,
        age: Number(age),
        class: stuClass,
      })
      .then((res) => {
        console.log("Đã cập nhật:", res.data);
        alert("Cập nhật học sinh thành công!");
        // Navigate back to home page
        navigate("/");
      })
      .catch((err) => {
        console.error("Lỗi khi cập nhật:", err);
        alert("Lỗi khi cập nhật học sinh");
      });
  };

  return (
    <div className="edit-student-page">
      <h1>Chỉnh Sửa Thông Tin Học Sinh</h1>

      <form onSubmit={handleUpdate} className="edit-student-form">
        <div>
          <label>Họ tên:</label>
          <input
            type="text"
            placeholder="Họ tên"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Tuổi:</label>
          <input
            type="number"
            placeholder="Tuổi"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Lớp:</label>
          <input
            type="text"
            placeholder="Lớp"
            value={stuClass}
            onChange={(e) => setStuClass(e.target.value)}
            required
          />
        </div>

        <div className="button-group">
          <button type="submit">Cập Nhật</button>
          <button type="button" onClick={() => navigate("/")}>
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditStudent;
