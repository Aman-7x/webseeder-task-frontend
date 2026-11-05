import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";

export const Login = () => {
    const [formData,setFormData]=useState({
        email:"",
        password:""
    })
    const [error,setError]=useState(null);
    const [loading,setLoading]=useState(false);
    const navigate=useNavigate();

    const handleChange=(e)=>{
        setFormData({
            ...formData,[e.target.name]:e.target.value
        });
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{

            setLoading(true);
            setError(null);

            const res = await loginUser(formData);
            if(res.data.accessToken){
                localStorage.setItem('token',JSON.stringify(res.data.accessToken));
            }
            if(res.data.user){
                localStorage.setItem('user',JSON.stringify(res.data.user));
            }

            navigate('/');
        }catch(err){
            setError(err?.response?.data?.message || "Login Failed Please check your credintial");
        }finally{
            setLoading(false);
        }

    }
  return (
    <div className="container mt-5" style={{maxWidth:'400px'}}>
      <div className="card shadow-sm">
        <div className="card-body p-4">
            <h3 className="card-title text-center mb-4">
                Login
            </h3>

        {error && <p className="alert alert-danger">{error}</p>}

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                <label className="form-label">Email</label>
                <input 
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                />
                </div>

                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                    className="form-control"
                    type="password" 
                    name="password"
                    onChange={handleChange}
                    value={formData.password}
                    required
                    />
                </div>

                <button type="submit" className="btn btn-primary w-100 mb-3" disabled={loading}>
                    {loading?'Loggind in...':'Login'}
                </button>

                <p className="text-center fg-3 mb-0" style={{fontSize:'14px'}}>
                    Don't have an account <Link to={'/signup'}>Sign up</Link>
                </p>
            </form>
        </div>
      </div>
    </div>
  )
}

