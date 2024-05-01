import logo from './logo.svg';
import './App.css';
import { Route, Routes } from "react-router-dom";
import Auth from "./components/Authentication/Auth";
import Dashboard from "./components/Dashboard/Dashboard";
import PrivateComponent from "./components/PrivateComponent/PrivateComponent";
import AddEmployee from './components/Employees/AddEmployee/AddEmployee';
import ListEmployee from './components/Employees/ListEmployee/ListEmployee';
import EditEmployee from './components/Employees/EditEmployee/EditEmployee';

function App() {
  return (
    <>
     <Routes>
        <Route element={<PrivateComponent />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path='/addEmp' element={<AddEmployee/>}/>
          <Route path='/list' element={<ListEmployee/>}/>
          <Route path='/edit/:id' element={<EditEmployee/>}/>
        </Route>

        <Route path="/" element={<Auth />} />
      </Routes>
     
    </>
  );
}

export default App;
