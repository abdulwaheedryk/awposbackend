import Navbar from "./Navbar";
import React, { useEffect, useState, useRef } from 'react'
import Axios from 'axios';
import { useNavigate} from "react-router-dom"


function Userinfo() {
    const [username, SetUsername] = useState(null)
    const [email, SetEmail] = useState(null)
    const [password, SetPassword] = useState(null)
    const [roleresult, SetRoleresult] = useState([])
    const [role, SetRole] = useState(null)
    const [error, setError] = useState(false)
    const [lastrecord, setLastrecord] = useState([])
    const navigate = useNavigate()
/// on page load focuse  on textbox write ref={inputRef}  where you want to focus on page load
const inputRef = useRef(null);
useEffect(() => {
  inputRef.current.focus();
}, []);
////////

   //text value change and stor in state
    const handlerusername = (e) => {
        SetUsername(e.target.value)
    }
    const handleremail = (e) => {
      SetEmail(e.target.value)
  }
    const handlerpassword = (e) => {
        SetPassword(e.target.value)

    }
    const handlerrole = (e) => {
      SetRole(e.target.value)
  }
    //button enable/disable 
    const [btnupdate, setBtnUpdate] = useState(true)
    const [btnsave, setBtnSave] = useState(true)

    /////// get last ID record+1 from table
    const usernamegot = () => {
      document.getElementById('txtusername').value =''
      document.getElementById('txtemail').value =''
      document.getElementById('txtpassword').value =''
      getrolenamedata()
      setBtnSave(false)
      setBtnUpdate(false)
      
            }
        
    //// insert data into table
    const insertdata = (e) => {
        e.preventDefault()
        if(username.length===0){
            setError(true)
            alert(error)
            return
            
        }
        let str1 ="insert into users (username, email, password, role) value ('"+ document.getElementById('txtusername').value +"','"+ document.getElementById('txtemail').value +"','"+ document.getElementById('txtpassword').value +"','"+ role +"')"
        Axios.post(process.env.REACT_APP_POSTDATA, { mySQL: str1 }).then(
            (e)=> 
            {
                document.getElementById('txtusername').value =''
                document.getElementById('txtemail').value =''
                document.getElementById('txtpassword').value =''
                setBtnUpdate(true)
                //alert(error)
            })
        }

        //// Update data into table
    const updatedata = (e) => {
        e.preventDefault()
        if(username.length===0){
            setError(true)
            alert(error)
            return
         }
        
        let str1 ="update users set email ='"+ document.getElementById('txtemail').value  +"', password='"+ document.getElementById('txtpassword').value +"', role='"+ role +"' where username ='" + document.getElementById('txtusername').value +"'"
        Axios.post(process.env.REACT_APP_POSTDATA, { mySQL: str1 }).then(
            (e)=> 
            {
                document.getElementById('txtusername').value =''
                document.getElementById('txtemail').value =''
                document.getElementById('txtpassword').value =''
               
                //alert(error)
            })
        }
    /////// get role id data from table role 
    const getusername = () => {
   
        let str1 = "SELECT * FROM users where username ='" + document.getElementById('txtusername').value + "' "
        Axios.get(process.env.REACT_APP_GETDATA, { params: { mySQL: str1 } })
            .then(result => {
                //alert(res.data[0].email)
                if (result.data.length) {
                    document.getElementById('txtemail').value =result.data[0].email
                    document.getElementById('txtpassword').value =result.data[0].password
                    document.getElementById('txtrole').value =result.data[0].role
                    setBtnSave(true)
                    setBtnUpdate(false)
                }else{
                    setBtnSave(false)
                    setBtnUpdate(true)

                }
                
  
            })
        }
    /////////////

    /////// get role name data from table role 
    const getrolenamedata = () => {
        let str1 = "SELECT * FROM role "
        Axios.get(process.env.REACT_APP_GETDATA, { params: { mySQL: str1 } })
            .then(roleresult => {
              SetRoleresult(roleresult.data)
             //console.log(roleresult,"Role Name")
            })
        }
    /////////////
   
    /////////
  return (
    <>
   <Navbar />
   <div className="container bg-primary  p-2 text-white justify-content-center  ">        
            <h3><b>USER INFORMATION</b></h3> 
    </div>
    <div className="container">
        <div className="row pay-3">
            <div class="col-md-6">
                <div className="form-group">
                    <label>User Name</label>
                    <input 
                        value={username} 
                        onChange={handlerusername} 
                        onBlur={getusername}
                        onFocus={usernamegot}
                        ref={inputRef}
                        id="txtusername" 
                        type="text" 
                        class="form-control" 
                    />
                     <label>Email</label>
                    <input 
                        value={email} 
                        onChange={handleremail} 
                        // onBlur={getroleiddata}
                        // onFocus={maxid}
                        id="txtemail" 
                        type="text" 
                        class="form-control" 
                    />
                    <label>Password</label>
                    <input 
                    value={password} 
                    onChange={handlerpassword} 
                    //onBlur={getrolenamedata}
                    id="txtpassword" 
                    type="text" 
                    class="form-control" 
                    />
                    {/*dropdown/combobox data from role table */}
                    <select class="form-select form-select-lg mb-3"
                    id="txtrole"
                    aria-label=".form-select-lg example"
                    onChange={(e)=>SetRole(e.target.value)}
                    >
                     {
                      roleresult.map((opts,i)=><option>{opts.rolename}</option>)
                     }
                    </select>
                </div>
                <div class="btn-group">
                    <button type="button" class="btn btn-primary mx-.5" onClick={insertdata} disabled={btnsave}  >Save</button>
                    <button type="button" class="btn btn-primary mx-1" onClick={updatedata} disabled={btnupdate} >Update</button>
                    <button type="button" class="btn btn-primary mx-1" onClick={() =>navigate("/Dashboard")} >Close</button>
                </div> 
            </div>
            <div class="col-md-6"></div>

        </div>
    </div>      
    </>
  );
}

export default Userinfo;
