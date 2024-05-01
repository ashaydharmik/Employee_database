import React, { useState } from "react";
import "./dashboard.scss";
import welcome from "../../assets/welcome.jpg"
import Nav from "../Header/Nav";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
const [showEmp, setShowEmp] = useState(false)
const navigate = useNavigate()

const addEmp=()=>{
setShowEmp(true)
navigate("/addEmp")
}

  return (
    <>
      <section className="dashboard-container">
        <div className="navbar">
          <Nav/>
        </div>
        <div className="create-employee">
          <h1>Welcome to Admin panel</h1>
          <img src={welcome} alt=""/>
          <button onClick={addEmp}>Create Employee</button>
        </div>
       </section>
    </>
  );
};

export default Dashboard;
