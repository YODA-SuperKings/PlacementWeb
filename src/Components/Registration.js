import React, {useState} from 'react';
import { Link } from "react-router-dom";
import toast from 'react-simple-toasts';
import { useNavigate } from "react-router-dom";

function Registration(){
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password,setPassword] = useState(null);
    const [confirmPassword,setConfirmPassword] = useState(null);
    const [registrationtype,setRegistrationType] = useState(null);
    const [nameLabel,setNameLabel] = useState("Name");
    const [name,setName] = useState(null);

    const handleInputChange = (e) => {
        const {id , value} = e.target;
        if(id === "firstName")
            setFirstName(value);
        if(id === "lastName")
            setLastName(value);
        if(id === "email")
            setEmail(value);
        if(id === "password")
            setPassword(value);
        if(id === "confirmPassword")
            setConfirmPassword(value);
        if(id === "registrationtype")
        {
            setRegistrationType(value);
            if(value === "1")
                setNameLabel("Institute Name");
            else if(value === "2")
                setNameLabel("Company Name");
        }
        if(id === "name")
            setName(value);
    }

    const addUser = () => {
        let toastColor = '';
        const postBody = {
            FirstName: firstName,
            LastName: lastName,
            Password: password,
            ConfirmPassword: confirmPassword,
            Email: email,
            RegistrationType: parseInt(registrationtype),
            Name: name
        };
        fetch('https://localhost:44342/api/Users/CreateUser', 
        { 
            method: 'POST',
            body: JSON.stringify(postBody),
            withCredentials: true, 
            crossorigin: true,
            headers: {
            Accept: 'application/json','Content-Type': 'application/json'
            },
        }) 
        .then((res) => res.json())
        .then((data) => {
            if(data === "User email already exists.")
                toastColor = 'Red';
            else
                toastColor = 'Green';
            toast(<><b style={{ color: toastColor }}>{data}</b></>, { position: 'top-right' });
            console.log(data);
        })
        .catch((error) => {
            toast(<><b style={{ color: 'Red' }}>{error}</b></>, { position: 'top-right' });
            console.error(error);
        });
     };

    const handleSubmit  = () => {
        if(firstName === null || firstName === "")
        {
            toast(<><b style={{ color: 'Red' }}>First Name Required.</b></>, { position: 'top-right' });
        }
        else if(lastName === null || lastName === "")
        {
            toast(<><b style={{ color: 'Red' }}>Last Name Required.</b></>, { position: 'top-right' });
        }
        else if(password === null || password === "")
        {
            toast(<><b style={{ color: 'Red' }}>Password Required.</b></>, { position: 'top-right' });
        }
        else if(confirmPassword === null || confirmPassword === "")
        {
            toast(<><b style={{ color: 'Red' }}>Confirm Password Required.</b></>, { position: 'top-right' });
        }
        else if(((password !== null || password !== "") && (confirmPassword !== null || confirmPassword !== "")) && password !== confirmPassword){
            toast(<><b style={{ color: 'Red' }}>Password & Confirm Password not matching.</b></>, { position: 'top-right' });
        }
        else if(email === null || email === "")
        {
            toast(<><b style={{ color: 'Red' }}>Email Required.</b></>, { position: 'top-right' });
        }
        else if(registrationtype === null)
        {
            toast(<><b style={{ color: 'Red' }}>Registration Type Required.</b></>, { position: 'top-right' });
        }
        else if(name === null)
        {
            toast(<><b style={{ color: 'Red' }}>{nameLabel} Required.</b></>, { position: 'top-right' });
        }
        else{
            addUser();
            navigate("/");
        }
    }
    
    return(
        <div className="form-registration">
            <h1 className='header'>CREATE AN ACCOUNT</h1>
            <div className="form-registration-body">
                <div className="username">
                    <label className="form_label" for="firstName">First Name </label><br></br>
                    <input className="form_input" type="text" value={firstName} onChange = {(e) => handleInputChange(e)} id="firstName" placeholder="First Name"/>
                </div>
                <div className="lastname">
                    <label className="form_label" for="lastName">Last Name </label><br></br>
                    <input  type="text" name="" id="lastName" value={lastName}  className="form_input" onChange = {(e) => handleInputChange(e)} placeholder="LastName"/>
                </div>
                <div className="password">
                    <label className="form_label" for="password">Password </label><br></br>
                    <input className="form_input" type="password"  id="password" value={password} onChange = {(e) => handleInputChange(e)} placeholder="Password"/>
                </div>
                <div className="confirm-password">
                    <label className="form_label" for="confirmPassword">Confirm Password </label><br></br>
                    <input className="form_input" type="password" id="confirmPassword" value={confirmPassword} onChange = {(e) => handleInputChange(e)} placeholder="Confirm Password"/>
                </div>
                <div className="email">
                    <label className="form_label" for="email">Email </label><br></br>
                    <input  type="email" id="email" className="form_input" value={email} onChange = {(e) => handleInputChange(e)} placeholder="Email"/>
                </div>
                <div className="registrationtype">
                    <label className="form_label" for="registrationtype">Registration Type </label><br></br>
                    <select className="form_input" id="registrationtype" value={registrationtype} onChange = {(e) => handleInputChange(e)}>
                        <option value={0}>-Select-</option>
                        <option value={1}>College</option>
                        <option value={2}>Company</option>
                    </select>
                </div>
                <div className="email">
                    <label className="form_label" for="name">{nameLabel}</label><br></br>
                    <input  type="text" id="name" className="form_input" value={name} onChange = {(e) => handleInputChange(e)} placeholder={nameLabel}/>
                </div>
            </div>
            <div class="footer">
                <button onClick={()=>handleSubmit()} type="submit" class="btn">REGISTER</button>
                <div className='already-account'>Already have an account ? <span style={{paddingLeft: "37%"}}></span> <Link to="/">Sign In</Link></div>
            </div>
        </div>
    )
} 

export default Registration