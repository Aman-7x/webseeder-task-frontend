import { useState } from "react"
import { signupUser } from "../services/api.jsx";
import { Link, useNavigate } from "react-router-dom";

export const Signup = () => {
    const [formData,setFormData]=useState({
        name:"",
        email:"",
        password:""
    });
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState(null);
    const navigate = useNavigate();
    const handleChange=(e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit= async (e)=>{
        e.preventDefault();
        try{
            setError(null);
            setLoading(true);

             await signupUser(formData);
              
             navigate("/login");
        }catch(err){
            setError(err?.response?.data?.messsage || "Sign up Failed, Check your credentials!")
        }finally{
            setLoading(false);
        }
    }
  return (
    <div className="container mt-5" style={{maxWidth:"400px"}}>
        <div className="card shadow-sm">
            <div className="card-body  p-4">
                <h3 className="card-title text-center mb-4">Create Account</h3>

                {error && <p className="alert alert-danger text-center">{error}</p>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input 
                        className="form-control"
                        type="text"
                        name="name"
                        onChange={handleChange}
                        value={formData?.name}
                        required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="email"
                        className="form-control"
                        name="email"
                        value={formData?.email}
                        onChange={handleChange}
                        required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Passowrd</label>
                        <input 
                        className="form-control"
                        type="password"
                        name="password"
                        value={formData?.password}
                        onChange={handleChange}
                        required
                        />
                    </div>

                    <button type="submit" className="btn btn-success w-100 mb-3" disabled={loading}>
                        {loading?"Creating Account...":"Sign Up"}
                    </button>
                </form>

                <p className="text-center fg-3 mb-0" style={{fontSize:'14px'}}>Already have an account ? <Link to="/login">Login</Link> </p>
            </div>
        </div>
    </div>
  )
}

