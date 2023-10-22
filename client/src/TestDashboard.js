import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
function TestDashboard() {
    const [data, setData] = useState([])
    

  useEffect(()=> {
    let str1 ="SELECT * FROM users"
    Axios.get("http://localhost:3001/api/DataQuery",{params: {mySQL:str1}}
    ).then(res => setData(res.data))
    .catch(err => console.log(err));
  }, [])
    return (
    <div>
      <h5 className='text-center '>Users Data</h5>
     <div className='d-flex vh-100 bg-primary-subtle justify-content-center align-items-center '> 
      <div className='d-inline-flex  bg-white rounded p-3 '>
        <table>
            <thead>
                    <tr>
                        <th>User Name</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>Action</th>
                    </tr>
            </thead>
            <tbody>
            {data.map((users, index) =>{
                    return <tr key={index}>
                        <td>{users.username}</td>
                        <td>{users.email}</td>
                        <td>{users.password}</td>
                        <td>
                          <button className='btn btn-sm btn-primary mx-2'>Edit</button>
                        </td>
                    </tr>
                })}
            </tbody>
        </table>
      </div>
      </div>
    </div>
  )
}

export default TestDashboard
