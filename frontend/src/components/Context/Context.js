import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom"
import toast, { Toaster } from "react-hot-toast";
// import "react-toastify/dist/ReactToastify.css";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [showRegister, setShowRegister] = useState(true);
  const [fetchData, setFetchData] = useState([ ])
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editCardData, setEditCardData] = useState(null);
  const [selectedDomain, setSelectedDomain] = useState(null);
  const [showAnalytics, setShowAnalytics]= useState(false)
  const [showDashboard, setShowDashboard]= useState(false)
const navigate = useNavigate()
  
 

  const auth = JSON.parse(localStorage.getItem("user")) || { token: null };
  const userToken = auth.token;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${userToken}`,
  };

//   const fetchDomains = ()=>{

//     axios.get("https://e-dashboard-wfgu.onrender.com/allDomain",{headers})
//     .then((res)=>{
//        console.log(res.data)
//             setFetchData(res.data.domains);
          
//     })
//     .catch((err)=>{
//         console.log(err)
//     })
// }

// const handleEdit = async(id) => {
//   try {
//     const response = await axios.get(`https://e-dashboard-wfgu.onrender.com/fetchSingleDomain/${id}`,{headers});
    
//     if (response.status === 200) {
//       const singleDomainData = response.data.availableDomain; 
//       console.log(singleDomainData)
    
//       setEditCardData(singleDomainData);
//       setEditModalVisible(true);
//     } else {
//       toast.error("Error fetching single domain data");
     
//     }
//   } catch (error) {
//     toast.error("API call failed:", error);

//   }
// };

// const handleDelete = async (id) => {
//   try {
//     const response = await axios.delete(`https://e-dashboard-wfgu.onrender.com/deleteDomain/${id}`, { headers });


//     if (response.status === 200) {
//       console.log("Domain deleted successfully");
//       fetchDomains(); 
//       toast.success("Domain deleted successfully");
//     } else {
//       console.error("Error deleting domain:", response.data);
//       toast.error("Error deleting domain");
//     }
//   } catch (error) {
//     console.error("API call failed:", error);
//     toast.error("An error occurred");
//   }
// };

  const showLoginForm = () => {
    setShowRegister(false);
  };

 

  return (
    <AppContext.Provider
      value={{
        navigate,
        showLoginForm,
        showRegister,
        setShowRegister,
       showDashboard, setShowDashboard
      }}
    >
      {children}

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
    </AppContext.Provider>
  );
};

const useGlobal = () => {
  return useContext(AppContext);
};
export { AppContext, useGlobal, AppProvider };
