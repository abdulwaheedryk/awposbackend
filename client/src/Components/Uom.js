import Navbar from "./Navbar";
import React, { useState, useRef, useEffect } from 'react'
import Axios from 'axios';
import { useNavigate} from "react-router-dom"
function Uom() {
    const [uomid, SetUomid] = useState(null)
    const [uom, SetUOM] = useState(null)
    const [error, setError] = useState(false)
    const [lastrecord, setLastrecord] = useState(null)
    const navigate = useNavigate()
  

        /////////////
/// on page load focuse  on textbox write ref={inputRef}  where you want to focus on page load
const inputRef = useRef(null);
useEffect(() => {
  inputRef.current.focus();
}, []);
////////
   
   //text value change and stor in state
    const handleuomid = (e) => {
        SetUomid(e.target.value)
    }
    const handleuom = (e) => {
        SetUOM(e.target.value)
        
    }
    //button enable/disable 
    const [btnupdate, setBtnUpdate] = useState(true)
    const [btnsave, setBtnSave] = useState(true)

    /////// get last ID record+1 from table
    const maxid = () => {
        let str1 = "SELECT max(uomid)+1 as maxuomid  from uom"
        Axios.get(process.env.REACT_APP_GETDATA, { params: { mySQL: str1 } })
            .then(result => {
                if (result.data.length) {
                    setLastrecord (result.data[0].maxuomid)
                    document.getElementById('txtuomid').value =lastrecord
                } 
                if (!result.data[0].maxuomid) {
                    // alert("Received Null value ")
                     document.getElementById('txtuomid').value=1
                 }
            })
    }
        
    //// Save/ insert data into table
    const insertdata = (e) => {
        e.preventDefault()
        if(uom.length===0){
            setError(true)
            alert(error)
            return
        }
        let str1 ="insert into uom ( uomname) value ('"+ document.getElementById('txtuomname').value +"')"
        Axios.post(process.env.REACT_APP_POSTDATA, { mySQL: str1 }).then(
            (e)=> 
            {
                document.getElementById('txtuomid').value =''
                document.getElementById('txtuomname').value =''
                setBtnUpdate(true)

                //alert(error)
            })
        }

        //// Update data into table
    const updatedata = (e) => {
        e.preventDefault()
        if(uom.length===0){
            setError(true)
            alert(error)
            return
         }
        let str1 ="update uom set uomname ='"+ document.getElementById('txtuomname').value  +"'where uomid ='" + document.getElementById('txtuomid').value +"'"
        Axios.post(process.env.REACT_APP_POSTDATA, { mySQL: str1 }).then(
            (e)=> 
            {
                document.getElementById('txtuomid').value =''
                document.getElementById('txtuomname').value =''
               
                //alert(error)
            })
        }
    /////// get role id data from table role 
    const getuomiddata = () => {
   
        let str1 = "SELECT * FROM uom where uomid ='" + document.getElementById('txtuomid').value + "' "
        Axios.get(process.env.REACT_APP_GETDATA, { params: { mySQL: str1 } })
            .then(result => {
                //alert(res.data[0].email)
                if (result.data.length) {
                    document.getElementById('txtuomname').value =result.data[0].uomname
                    setBtnSave(true)
                    setBtnUpdate(false)
                }else{
                  document.getElementById('txtuomname').value =""
                    setBtnSave(false)
                    setBtnUpdate(true)
                }
             })
        }
    /////////////

    /////// get role name data from table role 
    const getrolenamedata = () => {
   
        let str1 = "SELECT * FROM uom where uomname ='" + document.getElementById('txtuomname').value + "' "
        Axios.get(process.env.REACT_APP_GETDATA, { params: { mySQL: str1 } })
            .then(result => {
                //alert(res.data[0].email)
                if (result.data.length) {
                    alert("This Role is already exists at ID: "+result.data[0].uomid)
                   document.getElementById('txtuomid').value =result.data[0].uomid
                }
  
            })
        }


return (
    <>
   <Navbar />
   <div className="container bg-primary  p-2 text-white justify-content-center  ">        
            <h3><b>UNIT OF MEASURE</b></h3> 
      </div>
   <div className="container">
        <div className="row pay-3">
            <div class="col-md-6">
                <div className="form-group">
                    <label>UOM ID</label>
                    <input 
                        tabIndex={"1"}
                        autoComplete="off"
                        ref={inputRef}
                        value={uomid} 
                        onChange={handleuomid} 
                        onBlur={getuomiddata} //got focus
                        onFocus={maxid} //lost focus
                        id="txtuomid" 
                        type="text" 
                        class="form-control" 
                    />
                    <label>UOM Name</label>
                    <input 
                    tabIndex={"2"}
                    autoComplete="off"
                    value={uom} 
                    onChange={handleuom} 
                    //onBlur={getrolenamedata}
                    id="txtuomname" 
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

export default Uom;
