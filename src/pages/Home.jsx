import { useEffect, useState } from "react"
import { fetchUserData, logout } from "../services/api";
import { useNavigate } from "react-router-dom";


export const Home = () => {
    const [user,setUser] = useState([]);
    const navigate = useNavigate();
    useEffect(()=>{
         const fetchUser = async ()=>{
            try{
                const res = await fetchUserData();
                setUser(res.data.user);
            }catch(err){
                console.log(err);
            }
        }
        fetchUser();
    },[]);


  const handleLogout= async()=>{
    try {
        await logout();
        localStorage.removeItem('token');
        navigate("/login");
    } catch (err) {
        console.log(err);
    }
  }

  return (
    <div className="container mt-5" style={{maxWidth:'400px'}}>
        <div className="card shadow-sm">
            <div className="card-body p-4">
            <h2 className="card-title">webseeder task</h2>
            <h5 className="card-title text-center mb-4">{user?.name}</h5>
            <p className="card-text">{user?.email}</p>
            <button onClick={handleLogout} className="btn w-100 btn-outline  theme-danger">logout</button>
            </div>
        </div>
    </div>
  )
}
