import Navbar from "./Navbar";
import React, { useState, useRef, useEffect } from 'react'
import Axios from 'axios';
import { useNavigate} from "react-router-dom"
import { setGlobalState, createGlobalState} from 'react-hooks-global-state'


function Accountgroup() {
    const [groupid, SetGroupid]           = useState(null)
    const [groupname, SetGroupName]       = useState(null)
    const [error, setError]             = useState(false)
    const [lastrecord, setLastrecord]   = useState(null)
    const navigate                      = useNavigate()
    const {useGlobalState, setGlobalState} = createGlobalState({})


        /////////////
 /// on page load focuse  on textbox write ref={inputRef}  where you want to focus on page load
 const inputRef = useRef(null);
 useEffect(() => {
   inputRef.current.focus();
 }, []);
 ////////
   
   //text value change and stor in state
    const handlegroupid = (e) => {
        SetGroupid(e.target.value)
    }
    const handlegroupname = (e) => {
        SetGroupName(e.target.value)
        
    }
    //button enable/disable 
    const [btnupdate, setBtnUpdate] = useState(true)
    const [btnsave, setBtnSave] = useState(true)

    /////// get last ID record+1 from table
    const maxid = (propsmaxid) => {
        let str1 = "SELECT max(groupid)+1 as maxid  from accgroup"
        Axios.get(process.env.REACT_APP_GETDATA, { params: { mySQL: str1 } })
            .then(result => {
                
                try {
                    SetGroupid('')
                    setLastrecord (result.data[0].maxid)
                    document.getElementById('txtgroupid').value =lastrecord
                    SetGroupName('')
                    document.getElementById('txtgroupname').focus()
                    setBtnSave(false)
                    setBtnUpdate(true)
                   } catch (error) {
                     console.error('An error occurred:', error);
                     document.getElementById('txtgroupname').value=1
                   }


                // if (result.data.length) {
                //     SetTypeid('')
    
                //     setLastrecord (result.data[0].maxid)
                //     document.getElementById('txttypeid').value =lastrecord
                //     SetTypeName('')
                //  } else {
                //     alert("no record found in Role Table")
                // }
            })
            }
        
    //// insert data into table
    const insertdata = (e) => {
        e.preventDefault()
        if(groupname.length===0){
            setError(true)
            alert(error)
            return
          }
        let str1 ="insert into accgroup (groupid, groupname) value ('"+ document.getElementById('txtgroupid').value +"', '"+ document.getElementById('txtgroupname').value +"')"
        Axios.post(process.env.REACT_APP_POSTDATA, { mySQL: str1 }).then(
            (e)=> 
            {
                document.getElementById('txtgroupid').value=''
                document.getElementById('txtgroupname').value=''
                // SetGroupid('')
                // SetGroupName('')
                setBtnUpdate(true)

                //alert(error)
            })
        }

        //// Update data into table
    const updatedata = (e) => {
        e.preventDefault()
        if(groupname.length===0){
            setError(true)
            alert(error)
            return
         }
        let str1 ="update accgroup set groupname ='"+ document.getElementById('txtgroup').value  +"'where groupid ='" + document.getElementById('txtgroupid').value +"'"
        Axios.post(process.env.REACT_APP_POSTDATA, { mySQL: str1 }).then(
            (e)=> 
            {
                document.getElementById('txtgroupid').value=''
                document.getElementById('txtgroupname').value=''
                // SetGroupid('')
                // SetGroupName('')
            
                //alert(error)
            })
        }
    /////// get role id data from table role 
    const getiddata = () => {
   
        let str1 = "SELECT * FROM accgroup where groupid ='" + document.getElementById('txtgroupid').value + "' "
        Axios.get(process.env.REACT_APP_GETDATA, { params: { mySQL: str1 } })
            .then(result => {
                //alert(res.data[0].email)
                if (result.data.length) {
                    document.getElementById('txtgroupname').value =result.data[0].groupname
                    setBtnSave(true)
                    setBtnUpdate(false)
                }else{
                  //document.getElementById('txttypename').value =""
                 
                  document.getElementById('txtgroupname').value=''
                  //SetGroupName('')
                    setBtnSave(false)
                    setBtnUpdate(true)
                }
             
  
            })
        }
    /////////////

    /////// get role name data from table role 
    const getnamedata = () => {
   
        let str1 = "SELECT * FROM accgroup where groupname ='" + document.getElementById('txtgroupname').value + "' "
        Axios.get(process.env.REACT_APP_GETDATA, { params: { mySQL: str1 } })
            .then(result => {
                //alert(res.data[0].email)
                if (result.data.length) {
                    alert("This record is already exists at ID: "+result.data[0].groupid)
                   document.getElementById('txtgroupid').value =result.data[0].groupid
                }
  
            })
        }


return (
    <>
   <Navbar />
   <div className="container bg-primary  p-2 text-white justify-content-center  ">        
            <h3><b>ACCOUNT GROUP</b></h3> 
      </div>
   <div className="container">
        <div className="row pay-3">
            <div className="col-md-6">
                <div className="form-group">
                    <label>Group ID</label>
                    <input 
                        tabIndex={"1"}
                        ref={inputRef}
                        value={groupid} 
                        onChange={handlegroupid} 
                        onBlur={getiddata}
                        //onFocus={maxid}
                        id="txtgroupid" 
                        type="text" 
                        className="form-control" 
                    />
                    <label>Group Name</label>
                    <input 
                    tabIndex={"2"}
                    value={groupname} 
                    onChange={handlegroupname} 
                    //onBlur={getGroupName}
                    id="txtgroupname" 
                    type="text" 
                    className="form-control" 
                    />
         
                </div>
                <div className="btn-group">
                    <button tabIndex={"3"} type="button" className="btn btn-primary mx-.5" onClick={insertdata} disabled={btnsave}  >Save</button>
                    <button tabIndex={"4"} type="button" className="btn btn-primary mx-1" onClick={updatedata} disabled={btnupdate} >Update</button>
                    <button tabIndex={"4"} type="button" className="btn btn-primary mx-1" onClick={maxid}  >Add New</button>
                    <button tabIndex={"5"} type="button" className="btn btn-primary mx-.5" onClick={() =>navigate("/Dashboard")} >Close</button>
                </div> 
            </div>
            <div className="col-md-6"></div>

        </div>
    </div>      
    </>
  );
}

export default Accountgroup;
