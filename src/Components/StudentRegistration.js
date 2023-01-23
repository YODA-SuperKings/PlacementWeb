import React, {useState, useEffect} from 'react';
import toast from 'react-simple-toasts';
import { useNavigate, Link } from "react-router-dom";
import Select from 'react-select';

function StudentRegistration(){
    const navigate = useNavigate();
    const [studentName, setStudentName] = useState(null);
    const [dob, setDOB] = useState(null);
    const [male, setMale] = useState(null);
    const [female, setFemale] = useState(null);
    const [email, setEmail] = useState(null);
    const [sslc, setSSLC] = useState(null);
    const [course, setCourse] = useState(null);
    const [university, setUniversity] = useState(null);
    const [cgpapercentage, setCGPAPercentage] = useState(null);
    const [registrationNumber, setRegistrationNumber] = useState(null);
    const [companyName, setCompanyName] = useState([]);
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [hsc, setHSC] = useState(null);
    const [instituteName, setInstituteName] = useState(null);
    const [yearOfPassing, setYearOfPassing] = useState(null);
    const [placementDate, setPlacementDate] = useState(null);
    const [selectedCompanies, setSelectedCompanies] = useState(null);
    const [file, setFile] = useState();
    let companyOptions = [];
    let finalCompanies = "";
    const d = [{label:"Google",value:"Google"},{label:"SSG",value:"SSG"},{label:"IBM",value:"IBM"}]

    const handleInputChange = (e) => {
        const {id , value} = e.target;
        if(id === "studentName")
            setStudentName(value);
        if(id === "dob")
            setDOB(value);
        if(id === "gender_male")
            setMale(value);
        else
            setFemale(value);
        if(id === "email")
            setEmail(value);
        if(id === "sslc")
            setSSLC(value);
        if(id === "course")
            setCourse(value);
        if(id === "university")
            setUniversity(value);
        if(id === "cgpapercentage")
            setCGPAPercentage(value);
        if(id === "registrationNumber")
            setRegistrationNumber(value);
        if(id === "phoneNumber")
            setPhoneNumber(value);
        if(id === "hsc")
            setHSC(value);
        if(id === "instituteName")
            setInstituteName(value);
        if(id === "yearOfPassing")
            setYearOfPassing(value);
        if(id === "placementDate")
            setPlacementDate(value);
        if(id === "companyName")
            setSelectedCompanies(value);
    }

    const getCompanyNames= () => {
        fetch('https://localhost:44342/api/Users/GetCompanies', 
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
            setCompanyName(data);
        })
        .catch((error) => {
            console.error(error);
        });
    }

    useEffect(() => {
        getCompanyNames();
     }, [])

    const addStudent = () => {
        debugger;
        let toastColor = '';
        const postBody = {
            RegistrationNumber: parseInt(registrationNumber),
            StudentName: studentName,
            Image: "",
            DOB: dob,
            Gender: (male !== null) ? "Male" : "Female",
            Email: email,
            Phone: phoneNumber,
            SSLC: parseInt(sslc),
            HSC: parseInt(hsc),
            Course: course,
            InstituteName: instituteName,
            University:university,
            YearOfPassing: parseInt(yearOfPassing),
            Percentage: parseInt(cgpapercentage),
            CompanyName: selectedCompanies,
            RoundOne: false,
            RoundTwo: false,
            IsGotOffer: false,
            PlacementDate: placementDate
        };
        fetch('https://localhost:44342/api/Student/CreateStudent', 
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
            if(data === "Student email already exists." || data === "Student registration number already exists.")
                toastColor = 'Red';
            else
                toastColor = 'Green';
            toast(<><b style={{ color: toastColor }}>{data}</b></>, { position: 'top-right' });
            console.log(data);
        })
        .catch((error) => {
            toast(<><b style={{ color: toastColor }}>{error}</b></>, { position: 'top-right' });
            console.error(error);
        });
     };

    const handleSaveSubmit  = (e) => {
        if(studentName === null || studentName === "")
        {
            toast(<><b style={{ color: 'Red' }}>Student Name Required.</b></>, { position: 'top-right' });
        }
        else if(dob === null || dob === "")
        {
            toast(<><b style={{ color: 'Red' }}>Date Of Birth Required.</b></>, { position: 'top-right' });
        }
        else if(dob === null || dob === "")
        {
            toast(<><b style={{ color: 'Red' }}>Date Of Birth Required.</b></>, { position: 'top-right' });
        }
        else if(email === null || email === "")
        {
            toast(<><b style={{ color: 'Red' }}>Email Required.</b></>, { position: 'top-right' });
        }
        else if(sslc === null || sslc === "")
        {
            toast(<><b style={{ color: 'Red' }}>SSLC % Required.</b></>, { position: 'top-right' });
        }
        else if(course === null || course === "")
        {
            toast(<><b style={{ color: 'Red' }}>Course Required.</b></>, { position: 'top-right' });
        }
        else if(university === null || university === "")
        {
            toast(<><b style={{ color: 'Red' }}>University Required.</b></>, { position: 'top-right' });
        }
        else if(cgpapercentage === null || cgpapercentage === "")
        {
            toast(<><b style={{ color: 'Red' }}>CGPA / Percentage Required.</b></>, { position: 'top-right' });
        }
        else if(registrationNumber === null || registrationNumber === "")
        {
            toast(<><b style={{ color: 'Red' }}>Registration Number Required.</b></>, { position: 'top-right' });
        } 
        else if(companyName === null || companyName === "")
        {
            toast(<><b style={{ color: 'Red' }}>Company Name Required.</b></>, { position: 'top-right' });
        }
        else if(phoneNumber === null || phoneNumber === "")
        {
            toast(<><b style={{ color: 'Red' }}>Phone Number Required.</b></>, { position: 'top-right' });
        }
        else if(hsc === null || hsc === "")
        {
            toast(<><b style={{ color: 'Red' }}>HSC % Required.</b></>, { position: 'top-right' });
        }
        else if(instituteName === null || instituteName === "")
        {
            toast(<><b style={{ color: 'Red' }}>Institute Name Required.</b></>, { position: 'top-right' });
        }
        else if(yearOfPassing === null || yearOfPassing === "")
        {
            toast(<><b style={{ color: 'Red' }}>Year Of Passing Required.</b></>, { position: 'top-right' });
        }
        else{
            addStudent();
            navigate("/CollegeDashboard");
        }
    }

    const handleCancelSubmit  = (e) => {
        navigate("/CollegeDashboard");
    }

    const handlePhotoUpload = (e) =>{
        setFile(URL.createObjectURL(e.target.files[0]));
    }

    return (
        <div className="form-student-registration">
            <div>
                <span style={{paddingLeft: "90%"}}></span>
                <Link to={"/"}>Log out</Link>
                {localStorage.removeItem("LoggedInEmail")}
            </div>
            <div><h1 className='student_registration_header'>STUDENT REGISTRATION</h1></div>
            <div className="form-student-registration-body">
            <div className='row'>
            <div className='column'>
                    <div>
                        <label className="form_label" for="studentName">Student Name </label><br></br>
                        <input className="form_input" type="text" id="studentName" value={studentName} onChange = {(e) => handleInputChange(e)} placeholder="Student Name"/>
                    </div>
                    <div>
                        <label className="form_label" for="dob">Date of Birth </label><br></br>
                        <input  type="date" name="" id="dob" className="form_input" value={dob} onChange = {(e) => handleInputChange(e)} placeholder="Date of Birth"/>
                    </div>
                    <div>
                        <label className="form_label" for="gender">Gender </label><br></br>
                        <div id="gender" onChange={(e) => handleInputChange(e)}>
                            <input type="radio" id="gender_male" defaultChecked value={male} name="gender" /> Male
                            <input type="radio" id="gender_female" value={female} name="gender" /> Female
                        </div>
                    </div>
                    <div>
                        <label className="form_label" for="email">Email </label><br></br>
                        <input  type="email" id="email" className="form_input" value={email} onChange = {(e) => handleInputChange(e)} placeholder="Email"/>
                    </div>
                    <div>
                        <label className="form_label" for="sslc">SSLC % </label><br></br>
                        <input className="form_input" type="number" id="sslc" value={sslc} onChange = {(e) => handleInputChange(e)} placeholder="SSLC %"/>
                    </div>
                    <div>
                        <label className="form_label" for="course">Course </label><br></br>
                        <input className="form_input" type="text" id="course" value={course} onChange = {(e) => handleInputChange(e)} placeholder="Course"/>
                    </div>
                    <div>
                        <label className="form_label" for="university">University </label><br></br>
                        <input className="form_input" type="text" id="university" value={university} onChange = {(e) => handleInputChange(e)} placeholder="University"/>
                    </div>
                    <div>
                        <label className="form_label" for="cgpapercentage">CGPA / Percentage </label><br></br>
                        <input className="form_input" type="number" id="cgpapercentage" value={cgpapercentage} onChange = {(e) => handleInputChange(e)} placeholder="CGPA / Percentage"/>
                    </div>
            </div>
            <div className='column'>
                    <div>
                        <label className="form_label" for="registrationNumber">Registration Number </label><br></br>
                        <input className="form_input" type="number" id="registrationNumber" value={registrationNumber} onChange = {(e) => handleInputChange(e)} placeholder="Registration Number"/>
                    </div>
                    <div>
                        <label className="form_label" for="placementDate">Placement Date</label><br></br>
                        <input className="form_input" type="date" id="placementDate" value={placementDate} onChange = {(e) => handleInputChange(e)} placeholder="Placement Date" />
                    </div>
                    <div>
                        <label className="form_label" for="gap"> </label><br></br>
                        <input className="form_input" type="hidden"/>
                    </div>
                    <div>
                        <label className="form_label" for="phoneNumber">Phone Number </label><br></br>
                        <input className="form_input" type="text" id="phoneNumber" value={phoneNumber} onChange = {(e) => handleInputChange(e)} placeholder="Phone Number"/>
                    </div>
                    <div>
                        <label className="form_label" for="hsc">HSC % </label><br></br>
                        <input className="form_input" type="number" id="hsc" value={hsc} onChange = {(e) => handleInputChange(e)} placeholder="HSC %"/>
                    </div>
                    <div>
                        <label className="form_label" for="instituteName">Institute Name </label><br></br>
                        <input className="form_input" type="text" id="instituteName" value={instituteName} onChange = {(e) => handleInputChange(e)} placeholder="Institute Name"/>
                    </div>
                    <div>
                        <label className="form_label" for="yearOfPassing">Year of Passing </label><br></br>
                        <input  type="date" name="" id="yearOfPassing" className="form_input" value={yearOfPassing} onChange = {(e) => handleInputChange(e)} placeholder="Year of Passing"/>
                    </div>
                    <div>
                        <label className="form_label" for="companyName">Company Name </label><br></br>
                        <select className="form_input" id="companyName" value={selectedCompanies} onChange = {(e) => handleInputChange(e)}>
                          {companyName.map((option) => (<option value={option.value}>{option.label}</option>))}
                        </select>
                    </div>
                    {/* <div style={{ paddingTop: "20px"}}>
                        
                    </div> */}
            </div>
            {/* <div className='column'>
                <div className="img-wrap img-upload">
                    <img for="photo-upload" src={file}/>
                </div>
                <input id="photo-upload" type="file" onChange={handlePhotoUpload}/>
            </div> */}
            </div>
            </div>
            <div className="college_footer">
                <div style={{ paddingLeft: "80%" }}>
                    <button onClick={(e)=>handleSaveSubmit(e)} type="submit" class="btn_student_save">Save</button>
                    <span style={{paddingLeft: "5%"}}></span>
                    <button onClick={(e)=>handleCancelSubmit(e)} type="submit" class="btn_student_cancel">Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default StudentRegistration