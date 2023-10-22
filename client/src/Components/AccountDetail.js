import Navbar from "./Navbar";
import React, { useState, useRef, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { setGlobalState, createGlobalState } from "react-hooks-global-state";

function AccountDetail() {
  const [groupid, SetGroupid] = useState(null);
  const [groupname, SetGroupname] = useState(null);
  const [acccode, SetAccCode] = useState(null);
  const [accname, SetAccName] = useState(null);
  const [address, SetAddress] = useState(null);
  const [phone, SetPhone] = useState(null);
  const [email, SetEmail] = useState(null);
  const [acctype, SetAccType] = useState(null);
  const [error, setError] = useState(false);
  const [lastrecord, setLastrecord] = useState(null);
  const navigate = useNavigate();
  const [groupresult, SetGroupresult] = useState([]);
  const [showdataresult, SetShowdataresult] = useState([]);

  // ///////////// keypress event
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
  /// on page load focuse  on textbox write ref={inputRef}  where you want to focus on page load
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  /////
////Clear Data 

function cleardata(e) {
    
   //SetAccCode("");
    SetAccName("");
    SetAddress("")
    SetAddress("");
    SetPhone("");
    SetEmail("");
    document.getElementById("txtaccid").value =""
    // document.getElementById("txtaccid").value =""
    // document.getElementById("txtaccname").value =""
    // document.getElementById("txtaddress").value =""
    // document.getElementById("txtphone").value =""
    // document.getElementById("txtemail").value =""
    document.getElementById("txtgroup").focus()
    // SetAccCode(null);
    
    // SetAddress(null);
    // SetPhone(null);
    // SetEmail(null);
    // SetAccType(null);
    // setLastrecord(null);
    // SetGroupresult([null]);
    // SetShowdataresult([null]);
   
  }
  //text value change and stor in state
  const handleid = (e) => {
    SetAccCode(e.target.value);
  };
  const handlename = (e) => {
    SetAccName(e.target.value);
  };
  const handleaddress = (e) => {
    SetAddress(e.target.value);
  };
  const handlephone = (e) => {
    SetPhone(e.target.value);
  };
  const handleemail = (e) => {
    SetEmail(e.target.value);
  };
  const handletype = (e) => {
    SetAccType(e.target.value);
  };
  //button enable/disable
  const [btnupdate, setBtnUpdate] = useState(true);
  const [btnsave, setBtnSave] = useState(true);

//   /////// get last ID record+1 from table
  const maxid = (propsmaxid) => {
    let str1 =
      "SELECT max(acc_code) as maxacc from accounts WHERE LEFT(acc_code, 2) ='00' ";
    Axios.get(process.env.REACT_APP_GETDATA, { params: { mySQL: str1 } }).then(
      (result) => {
        try {
          // const tryresult =result.data.length
          SetAccCode("");
          const id = result.data[0].maxacc;
          const last4 = Number(id.slice(-4)) + 1; //Number is use for convering chr to num
          const totalchr = id.slice(-4).length - String(last4).length;
          let replenght = id.slice(-4).length - String(last4).length;
          let text = "0";
          let r = text.repeat(replenght);
          document.getElementById("txtid").value = "00" + "-" + r + last4;
          document.getElementById("txtname").focus(); // focus on txtname after click at new record
        } catch (error) {
          console.error("An error occurred:", error);
        }
 
      }
    );
  };

  //// insert data into table
  const insertdata = (e) => {
    e.preventDefault();
    let accid = document.getElementById("txtgroup").value + '-' + document.getElementById("txtaccid").value
    // if (acccode.length === 0) {
    //   setError(true);
    //   alert(error);
    //   return;
   try {
    let str1 =
      "insert into accounts (acc_group, acc_id, acc_code, acc_name, address, phone, email, acc_type) value ('" +
      document.getElementById("txtgroup").value +"', '" +
      document.getElementById("txtaccid").value +"','"+ accid+"' , '" +
      document.getElementById("txtaccname").value +"', '" +
      document.getElementById("txtaddress").value +"', '" +
      document.getElementById("txtphone").value +"', '" +
      document.getElementById("txtemail").value +"', 'D' )"
      Axios.post(process.env.REACT_APP_POSTDATA, { mySQL: str1 }).then((e) => {
      setBtnUpdate(true);
        document.getElementById("txtgroup").focus()
      //alert(error)
    });
   } catch (error) {
    console.log(error)
   }
    
  };

  //// Update data into table
  const updatedata = (e) => {
    let accid = document.getElementById("txtgroup").value + '-' + document.getElementById("txtaccid").value
    // e.preventDefault();
    // if (acccode.length === 0) {
    //   setError(true);
    //   alert(error);
    //   return;
    // }
    let str1 =
      "update accounts set acc_code= '"+accid+"',  acc_name ='" +
      document.getElementById("txtaccname").value +
      "' , address='"+ document.getElementById("txtaddress").value +
      "' , phone= '"+ document.getElementById("txtphone").value +
      "' , email= '"+ document.getElementById("txtemail").value +
      "' , acc_type='D' where acc_group = '" +
      document.getElementById("txtgroup").value +
      "' and acc_id = '" +
      document.getElementById("txtaccid").value +
      "' ";
    Axios.post(process.env.REACT_APP_POSTDATA, { mySQL: str1 }).then((e) => {
      //alert(error)
      document.getElementById("txtgroup").focus()
      setBtnUpdate(true);
    });
  };
  /////// get role id data from table role
  const getiddata = () => {
    let str1 =
      "SELECT * FROM `accounts` WHERE acc_group = '" +
      document.getElementById("txtgroup").value +
      "' and acc_id = '" +
      document.getElementById("txtaccid").value +
      "' ";
    Axios.get(process.env.REACT_APP_GETDATA, { params: { mySQL: str1 } }).then(
      (result) => {
        //alert(res.data[0].email)
        if (result.data.length) {
          
          //  document.getElementById("txtaccname").value =
          SetAccName(result.data[0].acc_name)
          SetAddress(result.data[0].address)
          SetPhone(result.data[0].phone)
          SetEmail(result.data[0].email)
          setBtnSave(true)
          setBtnUpdate(false)
          document.getElementById("txtaccname").focus()
        } else {
          //document.getElementById('txttypename').value =""
          setBtnSave(false);
          setBtnUpdate(true);
        }
      }
    );
  };
  /////////////
  ////
  const showdataingrid = () => {
    let str1 =
      "SELECT * from accounts WHERE acc_group = '" +
      document.getElementById("txtgroup").value +
      "' ";
    Axios.get(process.env.REACT_APP_GETDATA, { params: { mySQL: str1 } }).then(
      (showdataresult) => {
        if (!showdataresult.data.length) {
          //alert("No Record ");
        } else {
            SetShowdataresult(showdataresult.data);
         // alert("Record Found");
        }
      }
    );
  };
  ////
  const showdata = () => {
    let str1 =
      "SELECT max(acc_id)+1 as maxacc from accounts WHERE acc_group = '" +
      document.getElementById("txtgroup").value +
      "' ";
    Axios.get(process.env.REACT_APP_GETDATA, { params: { mySQL: str1 } }).then(
      (result) => {
        if (!result.data[0].maxacc)  {
          //alert("Received Null value ")
          if (result.data.length) {
            //alert("no record found ")
            }
          document.getElementById("txtaccid").value = 1;
          setBtnSave(false);
          setBtnUpdate(true);
        } else {
          //alert(result.data[0].maxacc)
          setLastrecord(result.data[0].maxacc);
          SetAccCode(result.data[0].maxacc)
          //document.getElementById("txtaccid").value = lastrecord;
          document.getElementById("txtaccname").focus();
          showdataingrid();
          setBtnSave(false);
          setBtnUpdate(true);
        }
      }
    );
  };

  /////// get category  from table for dropdown list
  const getaccgroup = () => {
    let str1 = "SELECT * FROM accgroup ";
    Axios.get(process.env.REACT_APP_GETDATA, { params: { mySQL: str1 } }).then(
      (groupresult) => {
        SetGroupresult(groupresult.data);
       cleardata()
        //console.log(groupresult.data[0].groupname,"Role Name")
      }
    );
  };
  /////////////
  /////// get role name data from table role
  const getnamedata = () => {
    let str1 =
      "SELECT * FROM type where typename ='" +
      document.getElementById("txttypename").value +
      "' ";
    Axios.get(process.env.REACT_APP_GETDATA, { params: { mySQL: str1 } }).then(
      (result) => {
        //alert(res.data[0].email)
        if (result.data.length) {
          alert("This Role is already exists at ID: " + result.data[0].typeid);
          document.getElementById("txttypeid").value = result.data[0].typeid;
        }
      }
    );
  };
  return (
    <>
      <Navbar />
      <div className="container bg-primary  p-2 text-white justify-content-center  ">        
            <h3><b>ACCUNTS DETAIL</b></h3> 
    </div>
      <div className="container">
        <div className="row pay-3">
          <div class="col-md-6">
            <div className="form-group">
              <label>Acc Group</label>
              {/* dropdown/combobox data from role table */}
              <select
                class="form-select form-select-lg mb-3"
                id="txtgroup"
                aria-label=".form-select-lg example"
                tabIndex={"1"}
                onBlur={showdata} //lostfocus
                ref={inputRef}
                onKeyDown={handlekeydown}
                onChange={(e) => SetGroupname(e.target.value)}
                onFocus={() => {
                  getaccgroup();
                }}
              >
                <option></option>
                try {
                    groupresult.map((opts, i) => (
                        <option value={opts.groupid}>{opts.groupname}</option>
                        //if u need id then write value={opts.packingid} inside <option value={opts.packingid} >
                      ))
                } catch (error) {
                    
                }
                
              </select>

              <label>Account ID</label>
              <input
                //tabIndex={"2"}
                // ref={inputRef}
                value={acccode}
                onChange={handleid}
                onBlur={getiddata}
                //onFocus={maxid}
                id="txtaccid"
                type="text"
                class="form-control"
              />
              <label>Acc Detail</label>
              <input
                tabIndex={"3"}
                value={accname}
                onChange={handlename}
                //onBlur={getrolenamedata}
                id="txtaccname"
                type="text"
                class="form-control"
                onKeyDown={handlekeydown}
              />
              <label> Address</label>
              <input
                tabIndex={"4"}
                value={address}
                onChange={handleaddress}
                //onBlur={getrolenamedata}
                id="txtaddress"
                type="text"
                class="form-control"
              />
              <label> Phone</label>
              <input
                tabIndex={"5"}
                value={phone}
                onChange={handlephone}
                //onBlur={getrolenamedata}
                id="txtphone"
                type="text"
                class="form-control"
              />
              <label> Email</label>
              <input
                tabIndex={"6"}
                value={email}
                onChange={handleemail}
                //onBlur={getrolenamedata}
                id="txtemail"
                type="text"
                class="form-control"
              />
            </div>
            <div class="btn-group">
              <button
                tabIndex={"7"}
                type="button"
                class="btn btn-primary mx-.5"
                onClick={insertdata}
                disabled={btnsave}
              >
                Save
              </button>
              <button
                tabIndex={"8"}
                type="button"
                class="btn btn-primary mx-1"
                onClick={updatedata}
                disabled={btnupdate}
              >
                Update
              </button>
              <button
                tabIndex={"9"}
                type="button"
                class="btn btn-primary mx-1"
               onClick={cleardata}
              >
                Add New
              </button>
              <button
                tabIndex={"10"}
                type="button"
                class="btn btn-primary mx-1"
                onClick={cleardata}
              >
                Test
              </button>
              <button
                tabIndex={"11"}
                type="button"
                class="btn btn-primary mx-.5"
                onClick={() => navigate("/Dashboard")}
              >
                Close
              </button>
            </div>
          </div>
          <div class="col-md-6"></div>
        </div>

        <div>
        <table class="table table-bordered ">
            <thead class="thead-dark">
                <tr>
                <th scope="col">Acc Group</th>
                <th scope="col">Acc ID</th>
                <th scope="col">Acc Code</th>
                <th scope="col">Acc Name</th>
                <th scope="col">Address</th>
                <th scope="col">Phone</th>
                <th scope="col">Email</th>
                <th scope="col">Acc Type</th>
                </tr>
            </thead>    
     <tbody>
         {showdataresult.map((item, i) => {
                return (
                     <tr >
                      <td>{item.acc_group}</td>
                      <td>{item.acc_id}</td>
                      <td>{item.acc_code}</td>
                      <td>{item.acc_name}</td>
                      <td>{item.address}</td>
                      <td>{item.phone}</td>
                      <td>{item.email}</td>
                      <td>{item.acc_type}</td>
                    </tr>
                    );
              })
        } 
      
    </tbody>
    </table>
        </div>
      </div>
    </>
  );
}

export default AccountDetail;
