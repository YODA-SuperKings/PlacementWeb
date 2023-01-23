import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import toast from 'react-simple-toasts';

function Login(){
    const navigate = useNavigate();
    const [email, setEmail] = useState(null);
    const [password,setPassword] = useState(null);
    const [authenticated, setauthenticated] = useState(localStorage.getItem(localStorage.getItem("authenticated")|| false));

    const handleInputChange = (e) => {
        const {id , value} = e.target;
        if(id === "email"){
            setEmail(value);
        }
        if(id === "password"){
            setPassword(value);
        }
    }

    const handleSubmit  = (e) => {
        e.preventDefault()
        localStorage.setItem('LoggedInEmail', email);
        fetch('https://localhost:44342/api/Users/AuthenticateUser?email='+email+'&password=' + password, 
        { 
            method: 'GET',
            withCredentials: true, 
            crossorigin: true,
            headers: {
            Accept: 'application/json','Content-Type': 'application/json'
            },
        }) 
        .then((res) => res.json())
        .then((data) => {
            if (data) {
                toast(<><b style={{ color: 'Green' }}>Login Succesfully.</b></>, { position: 'top-right' });
                setauthenticated(true)
                localStorage.setItem("authenticated", true);
                if(data.registrationType === 1)
                    navigate("/CollegeDashboard");
                else if(data.registrationType === 2)
                    navigate("/CompanyDashboard");
            }
            else
            {
                toast(<><b style={{ color: 'Red' }}>Invalid login credentials.</b></>, { position: 'top-right' });
            }
        })
        .catch((error) => {
            console.error(error);
        });
    }

    return(
        <div className="form-login">
            <h1 className='header'>Sign in To Your Account</h1>
            <div className="form-login-body">
                <div className="email">
                    <label className="form_label" for="email">Email </label><br></br>
                    <input  type="email" id="email" className="form_input" value={email} onChange = {(e) => handleInputChange(e)} placeholder="Email"/>
                </div>
                <div className="password">
                    <label className="form_label" for="password">Password </label><br></br>
                    <input className="form_input" type="password"  id="password" value={password} onChange = {(e) => handleInputChange(e)} placeholder="Password"/>
                </div>
            </div>
            <div class="footer">
                <button onClick={(e)=>handleSubmit(e)} type="submit" class="btn">SIGN IN</button>
                <div><Link to="/Registration">Sign Up</Link><span style={{paddingLeft: "52%"}}></span><Link>Forgot Password ?</Link></div>
            </div>
        </div>
    )
} 

export default Login