import React, {useState, useEffect} from 'react';
import toast from 'react-simple-toasts';
import DataGrid from 'react-data-grid';
import 'react-data-grid/lib/styles.css';
import { useNavigate, Link } from "react-router-dom";
import PlacementRequest from './PlacementRequest';

function CompanyDashboard(){
    const navigate = useNavigate();
    const [tableData, setTableData] = useState([]);
    const [loggedInEmailId, setLoggedInEmailId] = useState([localStorage.getItem('LoggedInEmail')]);
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
        { key: 'yearOfPassing', name: 'Year Of Passing'},
        { key: 'percentage', name: 'Percentage'},
        { key: 'companyName', name: 'Company'},
        { key: 'placementDate', name: 'Placement Date'},
        { key: 'roundOne', name: 'Round 1'},
        { key: 'roundTwo', name: 'Round 2'},
        { key: 'isGotOffer', name: 'Result'},
        { key: 'actions', name: 'Actions'}
    ]

    const getStudentsGridData  = (e) => {
        fetch('https://localhost:44342/api/Student/GetStudentsByCompany?loggedInEmailId=' + loggedInEmailId, 
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

     const handleRowChange = (e) => {
        debugger;
     }

    return (
        <div className="form-company-dashboard">
            <div>
                <span style={{paddingLeft: "95%"}}></span>
                <Link to={"/"}>Log out</Link>
                {localStorage.removeItem("LoggedInEmail")}
            </div>
            <h1 className='company_dashboard_header'> Company Details</h1>
            <div className="form-company-dashboard-body">
                <div style={{ paddingLeft: "87%" }}>
                    <PlacementRequest />
                </div>
                <div>
                    <DataGrid className='companyGrid' columns={columns} rows={tableData} onRowsChange={(e) => handleRowChange(e)} />
                </div>
            </div>
        </div>
    )
}

export default CompanyDashboard