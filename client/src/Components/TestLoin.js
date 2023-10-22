import React, { useState } from 'react'
import Axios from 'axios';
import {Link, useNavigate} from "react-router-dom"

function TestLoin() {
    const naviate = useNavigate()
    const [username, SetUsername] = useState('')
    const [password, SetPassword] = useState('')
    const handleUsername = (e) => {
        SetUsername(e.target.value)
    }
    const handlePassword = (e) => {
        SetPassword(e.target.value)
    }
    const handleLogin = () => {
        console.log({ username, password })
        let str1 = "SELECT * FROM users where username ='" + document.getElementById('txtusername').value + "' AND password = '" + document.getElementById('txtpassword').value + "' "
        Axios.get("http://localhost:3001/api/DataQuery", { params: { mySQL: str1 } })
            .then(result => {

                //alert(res.data[0].email)
                if (result.data.length) {
                    const poslogin='T'
                    //alert(result.data[0].email, "OK")
                    naviate('/Dashboard')
                    localStorage.getItem('T')
                } else {
                    alert("Username or Password is incorrect")
                    localStorage.getItem('F')

                }
                //console.log(result)
            })
            .catch(error => {
                console.log(error)
            })
    }
    return (
        <div>
            <div className='col-sm-6'>
                <label>Login Page1</label>
                <input value={username} onChange={handleUsername} class="form-control" id='txtusername' placeholder='User Name' ></input>
                <input value={password} onChange={handlePassword} class="form-control" id='txtpassword' placeholder='Password' ></input>
                <div>
                    <button onClick={handleLogin} class=" btn btn-primary btn-block" id='btnlogin'>Login</button>
                    <label id='lblloginstatus'></label>
                </div>
            </div>
        </div>
    )
}

export default TestLoin
