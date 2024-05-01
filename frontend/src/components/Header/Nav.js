import React from 'react'
import  {Link, useNavigate} from "react-router-dom"
import "./nav.scss"

const Nav = () => {
  const auth = localStorage.getItem("user")
    const navigate = useNavigate();
    const name = auth ? JSON.parse(auth).userName : "";

  const handleLogout=()=>{
    if(auth){
      localStorage.clear();
      navigate("/")
    }
  }

  return (
    <>
    <section className='navbar-container'>
<div className='left-menu'>
  <nav>
    <ul>
      <li><Link to="/dashboard" >Home</Link></li>
      <li><Link to="/list" >Employee List</Link></li>
    </ul>
  </nav>
</div>
<div className='right-menu'>
<nav>
    <ul>
      <li>{name}</li>
      <li onClick={handleLogout}>Logout</li>
    </ul>
  </nav>
</div>
    </section>
    </>
  )
}

export default Nav