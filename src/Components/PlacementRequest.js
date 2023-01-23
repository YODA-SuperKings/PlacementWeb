import React,{useState, useEffect} from "react";

function PlacementRequest({ email, subject, body, ...props }) {
    const [loggedInEmailId, setLoggedInEmailId] = useState([localStorage.getItem('LoggedInEmail')]);
    const [firstName, setFirstName] = useState(null);
    const [lastName, setlastName] = useState(null);
    const [companyName, setCompanyName] = useState(null);
    const p1 = 'Respected Sir/Madam, ';
    const p2 = 'This is to bring in your kind notice, that I am ' + firstName + ' ' + lastName + ' manager of ' + companyName + '.'
    const p3 ='We as an organization is putting up a proposal for campus recruitment to hire graduates or fresher for our firm.We would like you to arrange the mentioned arrangements for the recruitment procedures.(Mention all the procedures here)';
    const p4 ='Our organization deals with(Dealers/distributors).Mention and provide a small introduction of the company';
    const p5 ='For further details,please reach out to(Email) or our HR Department(Contact details of HR)';
    const p6 ='We await your corporation and response. ';
    const p7='Thanking You,';
    const p8=firstName + ' ' + lastName;

    const bodyContent = p1 + '%0D%0A %0D%0A' + p2 +'%0D%0A %0D%0A' + p3+'%0D%0A %0D%0A' + p4+'%0D%0A %0D%0A' + p5+'%0D%0A %0D%0A' + p6+'%0D%0A %0D%0A' +p7+'%0D%0A'+p8;

    const getUserMailDetails = (e) => {
      fetch('https://localhost:44342/api/Users/GetUserMailDetails?emailId=' + loggedInEmailId, 
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
          setFirstName(data.firstName);
          setlastName(data.lastName);
          setCompanyName(data.name);
          console.log(data);
      })
      .catch((error) => {
          console.error(error);
      });
  }

    useEffect(() => {
      getUserMailDetails();
   }, [])

    function Mailto({ email, subject, body, ...props }) {
        return (
          <a href={`mailto:${email}?subject=${subject || ""}&body=${body || ""}`}>
            {props.children}
          </a>
        );
      }

  return (
    <div>
        <a href={`mailto:${email}?subject=${subject || ""}&body=${body || ""}`}>{props.children}</a>
        <Mailto email={loggedInEmailId} subject="Proposal for Campus Recruitment" body={bodyContent}>College Placement Request</Mailto>
    </div>
  );
}

export default PlacementRequest
