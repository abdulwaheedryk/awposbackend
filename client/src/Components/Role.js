import Navbar from "./Navbar";
import React, { useState, useRef, useEffect } from 'react'
import Axios from 'axios';
import { useNavigate} from "react-router-dom"
import { setGlobalState, createGlobalState} from 'react-hooks-global-state'


function Role() {
    const [roleid, SetRoleid]           = useState(null)
    const [rolename, SetRolename]       = useState(null)
    const [error, setError]             = useState(false)
    const [lastrecord, setLastrecord]   = useState(null)
    const navigate                      = useNavigate()
    const {useGlobalState, setGlobalState} = createGlobalState({})
    
   /// on page load focuse  on textbox write ref={inputRef}  where you want to focus on page load
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  ////////

   //text value change and stor in state
    const handleroleid = (e) => {
        SetRoleid(e.target.value)
    }
    const handlerolename = (e) => {
        SetRolename(e.target.value)
        
    }
    //button enable/disable 
    const [btnupdate, setBtnUpdate] = useState(true)
    const [btnsave, setBtnSave] = useState(true)

    /////// get last ID record+1 from table
    const maxid = (propsmaxid) => {
        let str1 = "SELECT max(roleid)+1 as maxroleid  from role"
        Axios.get(process.env.REACT_APP_GETDATA, { params: { mySQL: str1 } })
            .then(result => {
                if (result.data.length) {
                    setLastrecord (result.data[0].maxroleid)
                    document.getElementById('txtroleid').value =lastrecord
               

                } else {
                    alert("no record found in Role Table")
                }
            })
            }
        
    //// insert data into table
    const insertdata = (e) => {
        e.preventDefault()
        if(rolename.length===0){
            setError(true)
            alert(error)
            return
            
        }
        let str1 ="insert into role (rolename) value ('"+ document.getElementById('txtrolename').value +"')"
        Axios.post(process.env.REACT_APP_POSTDATA, { mySQL: str1 }).then(
            (e)=> 
            {
                document.getElementById('txtroleid').value =''
                document.getElementById('txtrolename').value =''
                setBtnUpdate(true)

                //alert(error)
            })
        }

        //// Update data into table
    const updatedata = (e) => {
        e.preventDefault()
        if(rolename.length===0){
            setError(true)
            alert(error)
            return
         }
        let str1 ="update role set rolename ='"+ document.getElementById('txtrolename').value  +"'where roleid ='" + document.getElementById('txtroleid').value +"'"
        Axios.post(process.env.REACT_APP_POSTDATA, { mySQL: str1 }).then(
            (e)=> 
            {
                document.getElementById('txtroleid').value =''
                document.getElementById('txtrolename').value =''
               
                //alert(error)
            })
        }
    /////// get role id data from table role 
    const getroleiddata = () => {
   
        let str1 = "SELECT * FROM role where roleid ='" + document.getElementById('txtroleid').value + "' "
        Axios.get(process.env.REACT_APP_GETDATA, { params: { mySQL: str1 } })
            .then(result => {
                //alert(res.data[0].email)
                if (result.data.length) {
                    document.getElementById('txtrolename').value =result.data[0].rolename
                    setBtnSave(true)
                    setBtnUpdate(false)


                }else{
                  document.getElementById('txtrolename').value =""
                    setBtnSave(false)
                    setBtnUpdate(true)

                }
                
  
            })
        }
    /////////////

    /////// get role name data from table role 
    const getrolenamedata = () => {
   
        let str1 = "SELECT * FROM role where rolename ='" + document.getElementById('txtrolename').value + "' "
        Axios.get(process.env.REACT_APP_GETDATA, { params: { mySQL: str1 } })
            .then(result => {
                //alert(res.data[0].email)
                if (result.data.length) {
                    alert("This Role is already exists at ID: "+result.data[0].roleid)
                   document.getElementById('txtroleid').value =result.data[0].roleid
                }
  
            })
        }


return (
    <>
   <Navbar />
   <div className="container bg-primary  p-2 text-white justify-content-center  ">        
            <h3><b>USER ROLES</b></h3> 
      </div>
   <div className="container">
        <div className="row pay-3">
            <div class="col-md-6">
                <div className="form-group">
                    <label>Role ID</label>
                    <input 
                        tabIndex={"1"}
                        ref={inputRef}
                        value={roleid} 
                        onChange={handleroleid} 
                        onBlur={getroleiddata}
                        onFocus={maxid}
                        id="txtroleid" 
                        type="text" 
                        class="form-control" 
                    />
                    <label>Role Name</label>
                    <input 
                    tabIndex={"2"}
                    value={rolename} 
                    onChange={handlerolename} 
                    //onBlur={getrolenamedata}
                    id="txtrolename" 
                    type="text" 
                    class="form-control" 
                    />
         
                </div>
                <div class="btn-group">
                    <button tabIndex={"3"} type="button" class="btn btn-primary mx-.5" onClick={insertdata} disabled={btnsave}  >Save</button>
                    <button tabIndex={"4"} type="button" class="btn btn-primary mx-1" onClick={updatedata} disabled={btnupdate} >Update</button>
                    <button tabIndex={"5"} type="button" class="btn btn-primary mx-.5" onClick={() =>navigate("/Dashboard")} >Close</button>
                </div> 
            </div>
            <div class="col-md-6"></div>

        </div>
    </div>      
    </>
  );
}

export default Role;
