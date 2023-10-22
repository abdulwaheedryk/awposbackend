import React, { useContext, useEffect, useState, useRef } from "react";
import Axios from "axios";
import "./MyStyle.css";

import { Link, useNavigate } from "react-router-dom";
import Protected from "./Protected";
import Test from "./Test";

function Login() {
  const navigate = useNavigate();
  const [username, SetUsername] = useState("");
  const [password, SetPassword] = useState("");
  const data = "this is parent component data";
  /// on page load focuse  on textbox write ref={inputRef}  where you want to focus on page load
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  ////////
///////////// keypress event
const handlekeydown = event => {
    if(event.key === "Enter") {
       try {
        event.target.nextSibling.nextSibling.focus()
       } catch (error) {
        console.log(error)
       }
      }
  }
  /////////////
  const handleUsername = (e) => {
    SetUsername(e.target.value);
  };
  const handlePassword = (e) => {
    SetPassword(e.target.value);
  };

  const handleLogin = () => {
    //alert(process.env.REACT_APP_GETDATA)
    let str1 =
      "SELECT * FROM users where username ='" +
      document.getElementById("txtusername").value +
      "' AND password = '" +
      document.getElementById("txtpassword").value +
      "' ";
    Axios.get(process.env.REACT_APP_GETDATA, { params: { mySQL: str1 } })
      .then((result) => {
        //alert(result)
        //alert(result.data[0].email)
        // try{
        //    // alert(result.data.length)
        // }catch(err){
        //     alert(err)
        // }
        /////////
        if (result.data.length) {
          SetUsername(result.data[0].username);
          localStorage.setItem("token", "Authorized");
          localStorage.setItem("loginuser", username);
          localStorage.setItem("loginrole", result.data[0].role);
          navigate("/Dashboard");
        } else {
          alert("Username or Password is incorrect");
          // localStorage.setItem('authorized', false);
        }
        //console.log(result)
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    // <div className='logincenter'>
    <div className=" login template d-flex justify-content-center align-items-center 50-w p-5 rounded   ">
      <div className="logincenter">
        <label className="mt-3">
          <strong>Login Page</strong>
        </label>
        <div className="mt-3">
          <input
           ref={inputRef}
            value={username}
            onChange={handleUsername}
            onKeyDown={handlekeydown}
            className="form-control input-sm"
            id="txtusername"
            placeholder="User Name"
           

          ></input>
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={handlePassword}
            className="form-control input-sm mt-3"
            id="txtpassword"
            placeholder="Password"
            onKeyDown={handlekeydown}

          ></input>
        </div>
        <div className="d-grid">
          <button
            onClick={handleLogin}
            class=" btn btn-primary btn-block btn-sm mt-3"
            id="btnlogin"
          >
            Login
          </button>
          <label id="lblloginstatus"></label>
        </div>
      </div>
    </div>
    // </div>
  );
}

export default Login;
