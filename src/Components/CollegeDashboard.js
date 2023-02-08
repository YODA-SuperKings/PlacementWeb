import React, {useState, useEffect} from 'react';
import toast from 'react-simple-toasts';
import Table from 'react-bootstrap/Table';
import { useNavigate,Link } from "react-router-dom";

function CollegeDashboard(){
    const navigate = useNavigate();
    const [tableData, setTableData] = useState([]);

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
                <Table responsive bordered hover>
                        <thead>
                            <tr>
                                <th>Student Name</th>
                                <th>Registration Number</th>
                                <th>DOB</th>
                                <th>Gender</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Course</th>
                                <th>Institute Name</th>
                                <th>University</th>
                                <th>Year Of Passing</th>
                                <th>Percentage</th>
                                <th>Company Name</th>
                                <th>Placement Date</th>
                                <th>Round 1</th>
                                <th>Round 2</th>
                                <th>Result</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map(d =>
                                <tr key = {d.id}>
                                    <td>{d.studentName}</td>
                                    <td>{d.registrationNumber}</td>
                                    <td>{d.dob}</td>
                                    <td>{d.gender}</td>
                                    <td>{d.email}</td>
                                    <td>{d.phone}</td>
                                    <td>{d.course}</td>
                                    <td>{d.instituteName}</td>
                                    <td>{d.university}</td>
                                    <td>{d.yearOfPassing}</td>
                                    <td>{d.percentage}</td>
                                    <td>{d.companyName}</td>
                                    <td>{d.placementDate}</td>
                                    <td>{d.roundOne}</td>
                                    <td>{d.roundTwo}</td>
                                    <td>{d.isGotOffer}</td>
                                    <td>
                                        <button type="submit" class="btn">Edit</button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    )
}

export default CollegeDashboard