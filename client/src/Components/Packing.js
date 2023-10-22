import Navbar from "./Navbar";
import React, { useState, useRef, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";

function Packing() {
  const [packingid, SetPakingid] = useState(null);
  const [packing, SetPacking] = useState(null);
  const [error, setError] = useState(false);
  const [lastrecord, setLastrecord] = useState();
  const navigate = useNavigate();

  /// on page load focuse  on textbox write ref={inputRef}  where you want to focus on page load
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  ////////

  //text value change and stor in state
  const handlepackingid = (e) => {
    SetPakingid(e.target.value);
  };
  const handlepacking = (e) => {
    SetPacking(e.target.value);
  };
  //button enable/disable
  const [btnupdate, setBtnUpdate] = useState(true);
  const [btnsave, setBtnSave] = useState(true);

  /////// get last ID record+1 from table
  const maxid = () => {
    let str1 = "SELECT max(packingid)+1 as maxid  from packing";
    Axios.get(process.env.REACT_APP_GETDATA, { params: { mySQL: str1 } }).then(
      (result) => {
         if (result.data.length) {
         console.log(result.data[0].maxid)
         try {
          setLastrecord(result.data[0].maxid);
          SetPakingid(result.data[0].maxid);
          //console.log(lastrecord)
          //document.getElementById("txtpackingid").value = lastrecord;
         } catch (error) {
          
         }
         
        }
        if (!result.data[0].maxid) {
          // alert("Received Null value ")
          //document.getElementById("txtpackingid").value = 1;
          SetPakingid(1);

        }
      }
    );
  };

  //// Save/ insert data into table
  const insertdata = (e) => {
    e.preventDefault();
    if (packing.length === 0) {
      setError(true);
      alert(error);
      return;
    }

    let str1 =
      "insert into packing (packing) value ('" + document.getElementById("txtpacking").value +"')";
    Axios.post(process.env.REACT_APP_POSTDATA, { mySQL: str1 }).then((e) => {
      document.getElementById("txtpackingid").value = "";
      document.getElementById("txtpacking").value = "";
      setBtnUpdate(true);

      //alert(error)
    });
  };

  //// Update data into table
  const updatedata = (e) => {
    e.preventDefault();
    if (packing.length === 0) {
      setError(true);
      alert(error);
      return;
    }
    let str1 =
      "update packing set packing ='" +
      document.getElementById("txtpacking").value +
      "'where packingid ='" +
      document.getElementById("txtpackingid").value +
      "'";
    Axios.post(process.env.REACT_APP_POSTDATA, { mySQL: str1 }).then((e) => {
      document.getElementById("txtpackingid").value = "";
      document.getElementById("txtpacking").value = "";

      //alert(error)
    });
  };
  /////// get  id data from table role
  const getiddata = () => {
    let str1 =
      "SELECT * FROM packing where packingid ='" +
      document.getElementById("txtpackingid").value +
      "' ";
    Axios.get(process.env.REACT_APP_GETDATA, { params: { mySQL: str1 } }).then(
      (result) => {
        //alert(res.data[0].email)
        if (result.data.length) {
          document.getElementById("txtpacking").value = result.data[0].packing;
          setBtnSave(true);
          setBtnUpdate(false);
        } else {
          document.getElementById("txtpacking").value = "";
          setBtnSave(false);
          setBtnUpdate(true);
        }
      }
    );
  };
  /////////////

  /////// get data from table role
  const getdata = () => {
    let str1 =
      "SELECT * FROM packing where packing ='" +
      document.getElementById("txtpacking").value +
      "' ";
    Axios.get(process.env.REACT_APP_GETDATA, { params: { mySQL: str1 } }).then(
      (result) => {
        //alert(res.data[0].email)
        if (result.data.length) {
          alert(
            "This Role is already exists at ID: " + result.data[0].packingid
          );
          document.getElementById("txtpackingid").value =
            result.data[0].packingid;
        }
      }
    );
  };

  return (
    <>
      <Navbar />
      <div className="container bg-primary  p-2 text-white justify-content-center  ">        
            <h3><b>PRODUCT PACKING</b></h3> 
      </div>
      <div className="container">
        <div className="row pay-3">
          <div className="col-md-6">
            <div className="form-group">
              <label>Packing ID</label>
              <input
                tabIndex={"1"}
                autoComplete="off"
                ref={inputRef}
                value={packingid}
                onChange={handlepackingid}
                onBlur={getiddata} //lost  focus
                onFocus={maxid} // got focus
                id="txtpackingid"
                type="text"
                className="form-control"
              />
              <label>Packing</label>
              <input
                tabIndex={"2"}
                autoComplete="off"
                value={packing}
                onChange={handlepacking}
                //onBlur={getrolenamedata}
                id="txtpacking"
                type="text"
                className="form-control"
              />
            </div>
            <div className="btn-group">
              <button
                tabIndex={"3"}
                type="button"
                className="btn btn-primary mx-.5"
                onClick={insertdata}
                disabled={btnsave}
              >
                Save
              </button>
              <button
                tabIndex={"4"}
                type="button"
                className="btn btn-primary mx-1"
                onClick={updatedata}
                disabled={btnupdate}
              >
                Update
              </button>
              <button
                tabIndex={"5"}
                type="button"
                className="btn btn-primary mx-.5"
                onClick={() => navigate("/Dashboard")}
              >
                Close
              </button>
            </div>
          </div>
          <div className="col-md-6"></div>
        </div>
      </div>
    </>
  );
}

export default Packing;
