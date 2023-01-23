import React, {useState, useEffect} from 'react';
import toast from 'react-simple-toasts';
import DataGrid from 'react-data-grid';
import 'react-data-grid/lib/styles.css';
import { useNavigate,Link } from "react-router-dom";

function CollegeDashboard(){
    const navigate = useNavigate();
    const [tableData, setTableData] = useState([]);
    const columns = [
        { key: 'id', name: 'Id', width: 1},
        { key: 'studentName', name: 'Student Name'},
        { key: 'registrationNumber', name: 'Registration Number'},
        { key: 'dob', name: 'DOB'},
        { key: 'gender', name: 'Gender'},
        { key: 'email', name: 'Email'},
        { key: 'phone', name: 'Phone'},
        { key: 'course', name: 'Course'},
        { key: 'instituteName', name: 'Institute Name'},
        { key: 'university', name: 'University'},
        { key: 'yearOfPassing', name: 'Year Of Passing'},
        { key: 'percentage', name: 'Percentage'},
        { key: 'companyName', name: 'Company Name'},
        { key: 'placementDate', name: 'Placement Date'},
        { key: 'roundOne', name: 'Round 1'},
        { key: 'roundTwo', name: 'Round 2'},
        { key: 'isGotOffer', name: 'Result'}
    ]

    const getStudentsGridData  = (e) => {
        fetch('https://localhost:44342/api/Student/GetStudents', 
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
            setTableData(data);
            console.log(data);
        })
        .catch((error) => {
            console.error(error);
        });
    }

    useEffect(() => {
        getStudentsGridData();
     }, [])

     const handleAddStudent = (e) => {
        navigate("/StudentRegistration");
     }

    return (
        <div className="form-college-dashboard">
            <div>
                <span style={{paddingLeft: "95%"}}></span>
                <Link to={"/"}>Log out</Link>
                {localStorage.removeItem("LoggedInEmail")}
            </div>
            <h1 className='college_dashboard_header'> Student Details</h1>
            <div className="form-college-dashboard-body">
                <div style={{ paddingLeft: "87%" }}>
                    <button className='btn_add_student' onClick={(e)=>handleAddStudent(e)}>Add Student Details</button>
                </div>
                <div>
                    <DataGrid className='studentGrid' columns={columns} rows={tableData} />
                </div>
            </div>
        </div>
    )
}

export default CollegeDashboard