import { useState } from "react";
import axios from "axios";

// =================================================//
// Bai 2//

function AddStudentForm({ onStudentAdded }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [stuClass, setStuClass] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newStudent = {
        name,
        age: parseInt(age),
        class: stuClass,
      };

      await axios.post("http://localhost:5000/api/students", newStudent);

      // Clear form
      setName("");
      setAge("");
      setStuClass("");

      // Notify parent component
      if (onStudentAdded) {
        onStudentAdded();
      }

      alert("Student added successfully!");
    } catch (error) {
      console.error("Error adding student:", error);
      alert("Failed to add student");
    }
  };

  return (
    <div className="add-student-form">
      <h2>Add New Student</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Họ tên"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Tuổi"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Lớp"
          value={stuClass}
          onChange={(e) => setStuClass(e.target.value)}
          required
        />
        <button type="submit">Thêm học sinh</button>
      </form>
    </div>
  );
}

export default AddStudentForm;

// =============================================//