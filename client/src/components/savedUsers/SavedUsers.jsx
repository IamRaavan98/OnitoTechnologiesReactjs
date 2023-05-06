import React, { useEffect, useState } from "react";

import "./savedUsers.css";
import axios from "axios";

const SavedUsers = () => {

const [usersInfo, setUsersInfo] = useState(null)
    
useEffect(()=>{
  handleData();
},[])


function handleAge(birthdate) {

  const today = new Date();
  let year =  birthdate.slice(0,4)
  let month =  birthdate.slice(5,7)
  let date = birthdate.slice(8,10)
  const age = today.getFullYear() - year - 
             (today.getMonth() < month || 
             (today.getMonth() === date && today.getDate() < date));
  return age;
}

const handleData = async()=>{
   try {
     const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/getAllData/`)
     
     if(res?.data?.success === true){
      setUsersInfo(res?.data?.data.reverse())
     }
   } catch (error) {
     console.log(error?.message);
   }
}
let i= 0;
    return (
    <>
      <div className="container">
        <div className="heading">
          <div className="left">
            <span>show</span>
            <span>entries</span>
            <button>Excel</button>
            <button>Print</button>
          </div>
          <div className="right">
            <label >
                Search:
                <input type="text" />
            </label>
          </div>
        </div>
          <div className="tableof">
            <tr className="tableHeadingof">
              <th className="item nameof">Name</th>
              <th className="item genderof">Age/Gender</th>
              <th className="item addressof">Address</th>
              <th className="item Idof">Govt ID</th>
              <th className="item guardianof">Guardian Details</th>
              <th className="item nationalityof">Nationality</th>
            </tr>
            {usersInfo !== null && usersInfo.map((item)=>{
              i++;

              let age = handleAge(item?.Age?.slice(0,10));
              return(
                <tr key={item.id} className={i%2===0?('offwhite tableData'):('tableData')}>
                  <td className="nameof">{item?.name}</td>
                  <td className="genderof">{age}/{item?.gender}</td>
                  <td className="addressof">{item?.Address}</td>
                  <td className="Idof">{item?.ID}</td>
                  <td className="guardianof">{item?.guardian}</td>
                  <td className="nationalityof">{item?.Nationality}</td>
                </tr>
              )
            })}
          </div>

      </div>
    </>
  );
};

export default SavedUsers;
