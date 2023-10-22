import Navbar from "./Navbar";
import React, { useState, useRef, useEffect } from 'react'
import Axios from 'axios';
import { useNavigate} from "react-router-dom"
import { setGlobalState, createGlobalState} from 'react-hooks-global-state'


function Company() {
    const [compid, SetCompID]           = useState(null)
    const [compname, SetCompName]       = useState(null)
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
/////
   
   //text value change and stor in state
    const handlecompid = (e) => {
        SetCompID(e.target.value)
    }
    const handlecompname = (e) => {
        SetCompName(e.target.value)
        
    }
    //button enable/disable 
    const [btnupdate, setBtnUpdate] = useState(true)
    const [btnsave, setBtnSave] = useState(true)

    /////// get last ID record+1 from table
     /////// get last ID record+1 from table
     const maxid = () => {
        let str1 = "SELECT max(compid)+1 as maxid  from company"
        Axios.get(process.env.REACT_APP_GETDATA, { params: { mySQL: str1 } })
            .then(result => {
                SetCompID('')
                try {
                     if (result.data[0].maxid) {
                       // alert(result.data.length)
                        setLastrecord (result.data[0].maxid)
                        SetCompID(lastrecord)
                        return
                    } 
                    if (!result.data[0].maxid) {
                       // alert("Received Null value ")
                         document.getElementById('txtcompid').value=1
                         //document.getElementById('txtcompname').focus()
                     }
                } catch (error) {
                    console.log(error)
                }
            })
    }
        
    //// insert data into table
    const insertdata = (e) => {
        e.preventDefault()
        if(compname.length===0){
            setError(true)
            alert(error)
            return
            
        }
        try {
            let str1 ="insert into company (compname) value ('"+ document.getElementById('txtcompname').value +"')"
            Axios.post(process.env.REACT_APP_POSTDATA, { mySQL: str1 }).then(
                (e)=> 
                {
                    SetCompID('')
                    SetCompName('')
                    setBtnUpdate(true)
                    document.getElementById('txtcompid').focus()
                    //alert(error)
                })
        } catch (error) {
            console.log(error)
        }
      
        }

        //// Update data into table
    const updatedata = (e) => {
        e.preventDefault()
        if(compname.length===0){
            setError(true)
            alert(error)
            return
         }
        let str1 ="update company set compname ='"+ document.getElementById('txtcompname').value  +"'where compid ='" + document.getElementById('txtcompid').value +"'"
        Axios.post(process.env.REACT_APP_POSTDATA, { mySQL: str1 }).then(
            (e)=> 
            {
                SetCompID('')
                SetCompName('')
                //alert(error)
            })
        }
    /////// get role id data from table role 
    const getiddata = () => {
        let str1 = "SELECT * FROM company where compid ='" + document.getElementById('txtcompid').value + "' "
        Axios.get(process.env.REACT_APP_GETDATA, { params: { mySQL: str1 } })
            .then(result => {
               // alert(result.data[0].compname)
                if (result.data.length) {
                    SetCompName(result.data[0].compname)
                    //document.getElementById('txtcompname').value =result.data[0].compname
                    setBtnSave(true)
                    setBtnUpdate(false)
                }else{
                  //document.getElementById('txttypename').value =""
                    SetCompName('')
                    setBtnSave(false)
                    setBtnUpdate(true)
                }
             
  
            })
        }
    /////////////

    /////// get role name data from table role 
    const getnamedata = () => {
   
        let str1 = "SELECT * FROM company where compname ='" + document.getElementById('txtcompname').value + "' "
        Axios.get(process.env.REACT_APP_GETDATA, { params: { mySQL: str1 } })
            .then(result => {
                //alert(res.data[0].email)
                if (result.data.length) {
                    alert("This Record is already exists at ID: "+result.data[0].compid)
                   document.getElementById('txtcompid').value =result.data[0].compid
                }
  
            })
        }


return (
    <>
   <Navbar />
   <div className="container bg-primary  p-2 text-white justify-content-center  ">        
            <h3><b>PRODUCTS COMPANY NAME</b></h3> 
      </div>
   <div className="container">
        <div className="row pay-3">
            <div class="col-md-6">
                <div className="form-group">
                    <label>Company ID</label>
                    <input 
                        tabIndex={"1"}
                         ref={inputRef}
                        value={compid} 
                        onChange={handlecompid} 
                        onBlur={getiddata}
                        onFocus={maxid}
                        id="txtcompid" 
                        type="text" 
                        class="form-control" 
                    />
                    <label>Company Type</label>
                    <input 
                    tabIndex={"2"}
                    value={compname} 
                    onChange={handlecompname} 
                    //onBlur={getrolenamedata}
                    id="txtcompname" 
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

export default Company;
