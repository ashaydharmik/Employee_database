
import React, { useEffect, useState } from "react";
import Nav from "../../Header/Nav";
import axios from "axios";
import "./listEmployee.scss"
import toast,{Toaster} from "react-hot-toast";
import { Link } from "react-router-dom";
const ListEmployee = () => {
    const [showAllEmp, setShowAllEmp] = useState([]);

  useEffect(() => {
    handleShowEmp();
  }, []);
   
  
 
    const handleShowEmp=()=>{
      const auth = JSON.parse(localStorage.getItem("user")) || { token: null };
      const userToken = auth.token;
      const headers = {
        Authorization: `Bearer ${userToken}`,
      };
      axios
      .get("http://localhost:4000/allEmployee", {headers})
      .then((res) => {
        setShowAllEmp(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
      
    }

    const handleDelete=(id)=>{
      const auth = JSON.parse(localStorage.getItem("user")) || { token: null };
      const userToken = auth.token;
      const headers = {
        Authorization: `Bearer ${userToken}`,
      };
        axios.delete(`http://localhost:4000/deleteEmployee/${id}`,{headers})
        .then(() => {
            handleShowEmp();
         toast.success("Employee Successfully Deleted!")
          })
        .catch((err) => {
          console.log(err);
        });
      }
    

      const handleSearch=(e)=>{
        const key = e.target.value;
        const auth = JSON.parse(localStorage.getItem("user")) || { token: null };
        const userToken = auth.token;
        const headers = {
          Authorization: `Bearer ${userToken}`,
        };
        if(key){
          axios.get(`http://localhost:4000/search/${key}`, {headers})
          .then((res)=>{
            setShowAllEmp(res.data)
              console.log(res.data)
            })
            .catch((err)=>{
              console.log(err)
            })
        }else{
          handleShowEmp();
        }
      }
  
      
  return (
    <>
      <Nav />
      <section className="all-emp-container">
      <div className='total-emp'>
      <p>Total Employee : {showAllEmp.totalEmployees}</p>
      <button><Link to="/addEmp">Add Employee</Link></button>
     </div>
        <div className="heading">
          <h1>ALL Employees</h1>
        </div>
        <div className="search-bar">
          <input
            type="text"
            name="text"
            placeholder="Search Employees"
            onChange={handleSearch}
          />
        </div>
        <table>
          <thead>
            <tr>
              <th>Unique Id</th>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile No</th>
              <th>Designation</th>
              <th>gender</th>
              <th>Course</th>
              <th>Create date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(showAllEmp.employees) &&
              showAllEmp.employees.length > 0 &&
              showAllEmp.employees.map((emp, index) => (
                <tr key={emp._id}>
                  <td>{emp._id}</td>
                  <td> 
                  <img src={`http://localhost:4000/uploads/${emp.image}`} alt="Employee" />

                    </td>
                  <td>{emp.employeeName}</td>
                  <td>{emp.email}</td>
                  <td>{emp.mobile}</td>
                  <td>{emp.Designation}</td>
                  <td>{emp.Gender}</td>
                  <td>
                  {Array.isArray(emp.Course) ? (
    emp.Course.map((course, index) => (
      <span key={index}>
        {index > 0 && ", "} 
        {course}
      </span>
    ))
  ) : (
    <span>{emp.Course}</span>
  )}
  </td>
                  <td>{emp.createdAt}</td>
                  <td>
                    <button><Link to={`/edit/${emp._id}`}>Edit</Link></button>
                    <button onClick={()=> handleDelete(emp._id)}>Delete</button>
                  </td>
                  
                  
                </tr>
              ))}
          </tbody>
        </table>
      </section>
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

export default ListEmployee;
