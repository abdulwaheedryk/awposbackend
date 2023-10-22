import Navbar from "./Navbar";
import React, { useState, useRef, useEffect } from 'react'
import Axios from 'axios';
import { useNavigate} from "react-router-dom"
import { setGlobalState, createGlobalState} from 'react-hooks-global-state'


function Supplier() {
    const [acccode, SetAccCode]           = useState(null)
    const [accname, SetAccName]       = useState(null)
    const [address, SetAddress]       = useState(null)
    const [phone, SetPhone]       = useState(null)
    const [email, SetEmail]       = useState(null)
    const [acctype, SetAccType]       = useState(null)
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
    const handleid = (e) => {
        SetAccCode(e.target.value)
    }
    const handlename = (e) => {
        SetAccName(e.target.value)
        
    }
    const handleaddress = (e) => {
        SetAddress(e.target.value)
        
    }
    const handlephone = (e) => {
        SetPhone(e.target.value)
        
    }
    const handleemail = (e) => {
        SetEmail(e.target.value)
        
    }
    const handletype = (e) => {
        SetAccType(e.target.value)
        
    }
    //button enable/disable 
    const [btnupdate, setBtnUpdate] = useState(true)
    const [btnsave, setBtnSave] = useState(true)

    /////// get last ID record+1 from table
    const maxid = (propsmaxid) => {
        let str1 = "SELECT max(acc_code) as maxacc from accounts WHERE LEFT(acc_code, 2) ='00' "
        Axios.get(process.env.REACT_APP_GETDATA, { params: { mySQL: str1 } })
            .then(result => {
                try {
                   // const tryresult =result.data.length     
                    SetAccCode('')
                    const id = result.data[0].maxacc
                    const last4 = Number(id.slice(-4))+1  //Number is use for convering chr to num
                    const totalchr = id.slice(-4).length-String(last4).length
                    let replenght= id.slice(-4).length-String(last4).length
                    let text ="0"
                    let r = text.repeat(replenght)
                    document.getElementById('txtid').value = '00'+'-'+r+last4
                    document.getElementById('txtname').focus()  // focus on txtname after click at new record
        
                  } catch (error) {
                    console.error('An error occurred:', error);
                  }
               
                // if (result.data.length) {
                //     SetAccCode('')
                //     const id = result.data[0].maxacc
                //     const last4 = Number(id.slice(-4))+1  //Number is use for convering chr to num
                //     const totalchr = id.slice(-4).length-String(last4).length
                //     let replenght= id.slice(-4).length-String(last4).length
                //     let text ="0"
                //     let r = text.repeat(replenght)
                //     document.getElementById('txtid').value = '00'+'-'+r+last4
                //     document.getElementById('txtname').focus()  // focus on txtname after click at new record
                //   } else {
                //     alert("no record found")
                // }

            })
            }
        
    //// insert data into table
    const insertdata = (e) => {
        e.preventDefault()
        if(acccode.length===0){
            setError(true)
            alert(error)
            return
            
        }
        let str1 ="insert into accounts (acc_code, acc_name, address, phone, email, acc_type) value ('"+ document.getElementById('txtid').value +"')"
        Axios.post(process.env.REACT_APP_POSTDATA, { mySQL: str1 }).then(
            (e)=> 
            {
               
                setBtnUpdate(true)

                //alert(error)
            })
        }

        //// Update data into table
    const updatedata = (e) => {
        e.preventDefault()
        if(acccode.length===0){
            setError(true)
            alert(error)
            return
         }
        let str1 ="update accounts set acc_name ='"+ document.getElementById('txtname').value  +"'where typeid ='" + document.getElementById('txttypeid').value +"'"
        Axios.post(process.env.REACT_APP_POSTDATA, { mySQL: str1 }).then(
            (e)=> 
            {
                
               
                //alert(error)
            })
        }
    /////// get role id data from table role 
    const getiddata = () => {
   
        let str1 = "SELECT * FROM accounts where acc_code ='" + document.getElementById('txtid').value + "' "
        Axios.get(process.env.REACT_APP_GETDATA, { params: { mySQL: str1 } })
            .then(result => {
                //alert(res.data[0].email)
                if (result.data.length) {
                    document.getElementById('txttypename').value =result.data[0].typename
                    setBtnSave(true)
                    setBtnUpdate(false)
                }else{
                  //document.getElementById('txttypename').value =""
                    setBtnSave(false)
                    setBtnUpdate(true)
                }
             
  
            })
        }
    /////////////

    /////// get role name data from table role 
    const getnamedata = () => {
   
        let str1 = "SELECT * FROM type where typename ='" + document.getElementById('txttypename').value + "' "
        Axios.get(process.env.REACT_APP_GETDATA, { params: { mySQL: str1 } })
            .then(result => {
                //alert(res.data[0].email)
                if (result.data.length) {
                    alert("This Role is already exists at ID: "+result.data[0].typeid)
                   document.getElementById('txttypeid').value =result.data[0].typeid
                }
  
            })
        }


return (
    <>
   <Navbar />
   <div className="container">
        <div className="row pay-3">
            <div class="col-md-6">
                <div className="form-group">
                    <label>Supplier ID</label>
                    <input 
                        tabIndex={"1"}
                        ref={inputRef}
                        value={acccode} 
                        onChange={handleid} 
                        // onBlur={getiddata}
                        //onFocus={maxid}
                        id="txtid" 
                        type="text" 
                        class="form-control" 
                    />
                    <label>Supplier Name</label>
                    <input 
                    tabIndex={"2"}
                    value={accname} 
                    onChange={handlename} 
                    //onBlur={getrolenamedata}
                    id="txtname" 
                    type="text" 
                    class="form-control" 
                    />
                    <label>Supplier Address</label>
                    <input 
                    tabIndex={"2"}
                    value={address} 
                    onChange={handleaddress} 
                    //onBlur={getrolenamedata}
                    id="txtaddress" 
                    type="text" 
                    class="form-control" 
                    />
                       <label>Supplier Phone</label>
                    <input 
                    tabIndex={"2"}
                    value={phone} 
                    onChange={handlephone} 
                    //onBlur={getrolenamedata}
                    id="txtphone" 
                    type="text" 
                    class="form-control" 
                    />
                       <label>Supplier Email</label>
                    <input 
                    tabIndex={"2"}
                    value={email} 
                    onChange={handleemail} 
                    //onBlur={getrolenamedata}
                    id="txtemail" 
                    type="text" 
                    class="form-control" 
                    />
                    <label>Acc Type Group or Detail</label>
              {/*dropdown/combobox data from role table */}
              <select
                class="form-select form-select-lg mb-3"
                id="txttype"
                aria-label=".form-select-lg example">
                <option >G</option>
                <option >D</option>
               </select>
               </div>
                <div class="btn-group">
                    <button tabIndex={"3"} type="button" class="btn btn-primary mx-.5" onClick={insertdata} disabled={btnsave}  >Save</button>
                    <button tabIndex={"4"} type="button" class="btn btn-primary mx-1" onClick={updatedata} disabled={btnupdate} >Update</button>
                    <button tabIndex={"4"} type="button" class="btn btn-primary mx-1" onClick={maxid} >Add New</button>
                    <button tabIndex={"5"} type="button" class="btn btn-primary mx-.5" onClick={() =>navigate("/Dashboard")} >Close</button>
                </div> 
            </div>
            <div class="col-md-6"></div>

        </div>
    </div>      
    </>
  );
}

export default Supplier;
