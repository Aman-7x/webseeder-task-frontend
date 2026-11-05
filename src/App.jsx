import {BrowserRouter as Router, Routes,Route} from "react-router-dom";
import { Home } from './pages/Home';
import {Login} from "./pages/Login.jsx"
import {Signup} from "./pages/Signup.jsx"
import { ProtectedRoute } from "./components/ProtectedRoute.jsx";
 

function App() {

  return (
    <Router>
      <div className='bg-white fg-black min-vh-100 pb-4'>
        <Routes>
          <Route path='/' element={ <ProtectedRoute><Home/></ProtectedRoute> }/>
          <Route path="/login"  element={<Login/>} />
          <Route path="/signup"  element={<Signup/>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
