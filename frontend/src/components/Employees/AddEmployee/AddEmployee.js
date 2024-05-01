import React, { useState } from "react";
import Nav from "../../Header/Nav";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import "./addEmployee.scss";
import { FiPhone } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
const AddEmployee = () => {
  const navigate = useNavigate();
  const initialValue = {
    employeeName: "",
    email: "",
    mobile: "",
    Designation: "",
    Gender: "",
    Course: [],
    image: null,
  };

  const [empData, setEmpData] = useState(initialValue);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      if (checked) {
        setEmpData({ ...empData, Course: [...empData.Course, name] });
      } else {
        setEmpData({
          ...empData,
          Course: empData.Course.filter((course) => course !== name),
        });
      }
    } else if (type === "file") {
      setEmpData({ ...empData, [name]: e.target.files[0] });
    } else {
      setEmpData({ ...empData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", empData);
    if (!empData.image) {
      toast.error("Please select an image");
      return;
    }
    const formData = new FormData();
    formData.append("employeeName", empData.employeeName);
    formData.append("email", empData.email);
    formData.append("mobile", empData.mobile);
    formData.append("Designation", empData.Designation);
    formData.append("Gender", empData.Gender);
    empData.Course.forEach((course) => {
      formData.append("Course", course);
    });
    formData.append("image", empData.image);

    const auth = JSON.parse(localStorage.getItem("user")) || { token: null };
    const userToken = auth.token;
    const headers = {
      Authorization: `Bearer ${userToken}`,
    };

    axios
      .post("https://employee-database-9v1y.onrender.com/addEmployee", formData, { headers })
      .then((response) => {
        console.log(formData);
        setEmpData(initialValue);
        toast.success(response.data.message);
        navigate('/list')
      })
      .catch((err) => {
        console.log("Error during registration:", err);
        toast.error(err.response.data.message);
      });
  };

  return (
    <>
      <Nav />
      <div className="add-emp-container">
        <div className="heading">
          <h1>Add Employee</h1>
        </div>
        <div className="form-container">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="info">
              <p>
                <FaRegUser />
                <input
                  type="text"
                  placeholder="Name"
                  name="employeeName"
                  value={empData.employeeName}
                  onChange={handleChange}
                  required
                />
              </p>
              <p>
                <MdOutlineEmail />
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={empData.email}
                  onChange={handleChange}
                  required
                />
              </p>
              <p>
                <FiPhone/>
                <input
                  type="text"
                  placeholder="Mobile"
                  name="mobile"
                  value={empData.mobile}
                  onChange={handleChange}
                  required
                />
              </p>
              <p>
                <select
                  name="Designation"
                  value={empData.Designation}
                  onChange={handleChange}
                  required
                  className="designation"
                >
                  <option value="">Select Designation</option>
                  <option value="Hr">HR</option>
                  <option value="Manager">Manager</option>
                  <option value="Sales">Sales</option>
                </select>
              </p>
              <div className="gender">
                <p>Gender</p>

                <p>
                  <input
                    type="radio"
                    name="Gender"
                    value="Male"
                    checked={empData.Gender === "Male"}
                    onChange={handleChange}
                    required
                  />

                  <span>Male</span>
                </p>

                <p>
                  <input
                    type="radio"
                    name="Gender"
                    value="Female"
                    checked={empData.Gender === "Female"}
                    onChange={handleChange}
                    required
                  />
                  <span>Female</span>
                </p>
              </div>


              <div className="course">
                <p>Course</p>
                <p>
                <input
                  type="checkbox"
                  name="MCA"
                  checked={empData.Course.includes("MCA")}
                  onChange={handleChange}
                />
                <span>MCA</span>
                </p>
                

                <p>
                  <input
                    type="checkbox"
                    name="BCA"
                    checked={empData.Course.includes("BCA")}
                    onChange={handleChange}
                  />
                  <span>BCA</span>
                </p>
                <p>
                  <input
                    type="checkbox"
                    name="BSC"
                    checked={empData.Course.includes("BSC")}
                    onChange={handleChange}
                  />
                  <span>BSC</span>
                </p>
              </div>

              <div className="image">
               
                  <p>Upload Image:</p>
                  <input
                    type="file"
                    name="image"
                    onChange={handleChange}
                    required
                  />
                
              </div>
            </div>
            <div className="btn-container">
              <button type="submit">Add Employee</button>
            </div>
          </form>
        </div>
      </div>
      <Toaster
        toastOptions={{
          style: {
            background: "#363636",
            color: "#fff",
            width: "350px",
            fontSize: "18px",
          },
        }}
      />
    </>
  );
};

export default AddEmployee;
