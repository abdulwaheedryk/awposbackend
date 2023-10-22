import Navbar from "./Navbar";
import React, { useEffect, useState, useRef } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
function ItemDetail() {
  const [proid, SetProid] = useState(null);
  const [itemname, SetItemname] = useState(null);
  const [uom, SetUom] = useState(null);
  const [type, SetType] = useState(null);
  const [category, setCategory] = useState("");
  const [packing, setPacking] = useState(null);
  const [packingqty, SetPackingQTY] = useState(null);
  const [purchaseprice, setPurchaseprice] = useState(null);
  const [saleprice, setSaleprice] = useState(null);
  const [roleresult, SetRoleresult] = useState(null);
  const [company, SetCompany] = useState(null);
  const [error, setError] = useState(false);
  const [categoryresult, setCategoryresult] = useState([]);
  const [uomresult, SetUomResult] = useState([]);
  const [typeresult, SetTypeResult] = useState([]);
  const [packingresult, SetPackingresult] = useState([]);
  const [companyresult, SetCompanyResult] = useState([]);

  /// on page load focuse  on textbox write ref={inputRef}  where you want to focus on page load
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  ////////

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


  const navigate = useNavigate();
  //text value change and stor in state
  const handleproid = (e) => {
    SetProid(e.target.value);
  };
  const handleitemname = (e) => {
    SetItemname(e.target.value);
  };
  const handleremail = (e) => {
    SetUom(e.target.value);
  };
  const handletype = (e) => {
    SetType(e.target.value);
  };
  const handleategory = (e) => {
    setCategory(e.target.value);
  };
  const handlepacking = (e) => {
    setPacking(e.target.value);
  };
  const handlepackingqty = (e) => {
    SetPackingQTY(e.target.value);
  };
  const handlerrole = (e) => {
    setCategory(e.target.value);
  };
  const handlepurchaseprice = (e) => {
    setPurchaseprice(e.target.value);
  };
  const handlesaleprice = (e) => {
    setSaleprice(e.target.value);
  };
  //button enable/disable
  const [btnupdate, setBtnUpdate] = useState(true);
  const [btnsave, setBtnSave] = useState(true);

  // //// clear data from fields
  function cleardata(e) {
    SetProid("")
    SetItemname("")
    document.getElementById("txtcategory").value=""
    document.getElementById("txtuom").value=""
    document.getElementById("txtpacking").value=""
    document.getElementById("txtcompname").value=""
    SetPackingQTY("")
    setPurchaseprice("")
    setSaleprice("")
  }
  
  function handleInputEnter(e) {
    if (e.key === "Enter") {
      alert("you press enter");
    }
  }
  ///
  //// insert data into table
  const insertdata = (e) => {
    e.preventDefault();
    if (proid.length === 0) {
      setError(true);
      alert(error);
      return;
    }
    //
    let str1 =
      "insert into itemdetail (pid, proname, uom , category, packing, packingqty, compname, purchaseprice, saleprice) value ('"
      + document.getElementById("txtproid").value 
      +"' ,'" +  document.getElementById("txtproname").value 
      +"' ,'" +  document.getElementById("txtuom").value
      +"' ,'" +  document.getElementById("txtcategory").value
      +"' ,'" +  document.getElementById("txtpacking").value
      +"' ,'" +  document.getElementById("txtpackingqty").value 
      +"' ,'" +  document.getElementById("txtcompname").value 
      +"' ,'" +  document.getElementById("txtpurchaseprice").value 
      +"' ,'" +  document.getElementById("txtsaleprice").value
      + "')";
    Axios.post(process.env.REACT_APP_POSTDATA, { mySQL: str1 }).then((e) => {
      cleardata();
      setBtnUpdate(true);
      document.getElementById("txtproid").focus()
    });
  };
  //// Update data into table
  const updatedata = (e) => {
    e.preventDefault();
    if (itemname.length === 0) {
      setError(true);
      alert(error);
      return;
    }
   //alert(document.getElementById("txtcompname").value)
    let str1 =
      "update itemdetail set proname ='" + document.getElementById("txtproname").value +
      "' , uom ='" + document.getElementById("txtuom").value +
      "', category ='" + document.getElementById("txtcategory").value +
      "', packing ='" + document.getElementById("txtpacking").value + 
      "', packingqty ='" + document.getElementById("txtpackingqty").value +
      "', compname ='" + document.getElementById("txtcompname").value +
      "', purchaseprice ='" + document.getElementById("txtpurchaseprice").value +
      "', saleprice ='" + document.getElementById("txtsaleprice").value +
      "' where pid ='" + document.getElementById("txtproid").value + "' "
    Axios.post(process.env.REACT_APP_POSTDATA, { mySQL: str1 }).then((e) => {
      cleardata();
      document.getElementById("txtproid").focus()

      //alert(error)
    });
  };
  /////// get role id data from table role
  const getproid = () => {
    let str1 =
      "SELECT * FROM itemdetail where pid ='" +
      document.getElementById("txtproid").value +
      "' ";
    Axios.get(process.env.REACT_APP_GETDATA, { params: { mySQL: str1 } }).then(
      (result) => {
        if (result.data.length) {
          //alert(result.data[0].compname)
          SetItemname(result.data[0].proname)
          document.getElementById("txtuom").value=result.data[0].uom
          document.getElementById("txtcategory").value=result.data[0].category
          document.getElementById("txtpacking").value=result.data[0].packing
          SetPackingQTY(result.data[0].packingqty)
          document.getElementById("txtcompname").value=result.data[0].compname
          setPurchaseprice(result.data[0].purchaseprice)
          setSaleprice(result.data[0].saleprice);
          setBtnSave(true);
          setBtnUpdate(false);
        } else {
          document.getElementById("txtproname").focus()
          setBtnSave(false);
          setBtnUpdate(true);
        }
      }
    );
  };
  /////////////

  /////// get category  from table for dropdown list
  const getuom = () => {
    let str1 = "SELECT * FROM uom ";
    Axios.get(process.env.REACT_APP_GETDATA, { params: { mySQL: str1 } }).then(
      (uomresult) => {
        SetUomResult(uomresult.data);
        // alert(uomresult.data[0].uomid)
        //console.log(uomresult.data.uom," UOM")
      }
    );
  };
  /////////////
  
  /////// get category  from table for dropdown list
  const getcategory = () => {
    let str1 = "SELECT * FROM category ";
    Axios.get(process.env.REACT_APP_GETDATA, { params: { mySQL: str1 } }).then(
      (categoryresult) => {
        setCategoryresult(categoryresult.data);
        //console.log(roleresult,"Role Name")
      }
    );
  };
  /////////////
  
  /////// get category  from table for dropdown list
  const getcompany = () => {
    let str1 = "SELECT * FROM company ";
    Axios.get(process.env.REACT_APP_GETDATA, { params: { mySQL: str1 } }).then(
      (companyresult) => {
        //alert(companyresult)
        SetCompanyResult(companyresult.data);
        //console.log(roleresult,"Role Name")
      }
    );
  };
  /////////////
  const getpacking = () => {
    let str1 = "SELECT * FROM packing ";
    Axios.get(process.env.REACT_APP_GETDATA, { params: { mySQL: str1 } }).then(
      (packingresult) => {
        SetPackingresult(packingresult.data);
        //console.log(roleresult,"Role Name")
      }
    );
  };
  /////////////

  /////////
  return (
    <>
      <Navbar />
      <div className="container bg-primary  p-2 text-white justify-content-center  ">        
            <h3><b>PRODUCT DETAILS</b></h3> 
      </div>
      <div className="container">
        <div className="row pay-3">
          <div class="col-md-6">
            <div className="form-group">
              <label>Product ID</label>
              <input
                value={proid}
                onKeyDown={handlekeydown}
                onChange={handleproid}
                onBlur={getproid}
                // call multiple functons onfocus
                onFocus={() => {
                  getuom()
                  getcompany()
                  getcategory()
                  getpacking()
                  getuom()
                  cleardata()
                }}
                ref={inputRef}
                id="txtproid"
                type="text"
                class="form-control"
              />
              <label>Product Name</label>
              <input
                value={itemname}
                onChange={handleitemname}
                // onBlur={getusername}
                // onFocus={usernamegot}
                id="txtproname"
                type="text"
                class="form-control"
                tabIndex={"1"}
              />
             
              <label>UOM</label>
              {/* dropdown/combobox data from role table */}
              <select
                class="form-select form-select-lg mb-3"
                id="txtuom"
                aria-label=".form-select-lg example"
                onChange={(e) => SetUom(e.target.value)}
              >
                <option></option>

                {uomresult.map((opts, i) => (
                  <option >{opts.uomname}</option>
                  //if u need id then write value={opts.uomid} inside <option value={opts.uomid} > 
                ))}
              </select>

              <label>Category</label>
              {/*dropdown/combobox data from role table */}
              <select
                class="form-select form-select-lg mb-3"
                id="txtcategory"
                aria-label=".form-select-lg example"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option></option>

                {categoryresult.map((opts, i) => (
                  <option >{opts.category}</option>
                  //if u need id then write value={opts.categoryid} inside <option value={opts.categoryid} > 
                ))}
              </select>
              <label>Packing</label>
              {/*dropdown/combobox data from role table */}
              <select
                class="form-select form-select-lg mb-3"
                id="txtpacking"
                aria-label=".form-select-lg example"
                onChange={(e) => setPacking(e.target.value)}
              >
                <option></option>
                {packingresult.map((opts, i) => (
                  <option >{opts.packing}</option>
                  //if u need id then write value={opts.packingid} inside <option value={opts.packingid} > 
                ))}
              </select>
              <label>Packing QTY</label>
              <input
                value={packingqty}
                onChange={handlepackingqty}
                // onBlur={getpackingqty}
                // onFocus={usernamegot}
                id="txtpackingqty"
                type="text"
                class="form-control"
              />
              <label>Company Name</label>
              {/*dropdown/combobox data from role table */}
              <select
                class="form-select form-select-lg mb-3"
                id="txtcompname"
                aria-label=".form-select-lg example"
                onChange={(e) => setPacking(e.target.value)}
              >
                <option></option>
                {companyresult.map((opts, i) => (
                  <option >{opts.compname}</option>
                  //if u need id then write value={opts.packingid} inside <option value={opts.packingid} > 
                ))}
              </select>
              <label>Purchase Price</label>
              <input
                value={purchaseprice}
                onChange={handlepurchaseprice}
                // onBlur={getusername}
                // onFocus={usernamegot}
                id="txtpurchaseprice"
                type="text"
                class="form-control"
              />
              <label>Sale Price</label>
              <input
                value={saleprice}
                onChange={handlesaleprice}
                // onBlur={getusername}
                // onFocus={usernamegot}
                id="txtsaleprice"
                type="text"
                class="form-control"
              />
            </div>
            <div class="btn-group">
              <button
                type="button"
                class="btn btn-primary mx-.5"
                onClick={insertdata}
                disabled={btnsave}
              >
                Save
              </button>
              <button
                type="button"
                class="btn btn-primary mx-1"
                onClick={updatedata}
                disabled={btnupdate}
              >
                Update
              </button>
              <button
                type="button"
                class="btn btn-primary mx-1"
                onClick={cleardata}
              >
                Add New
              </button>
              <button
                type="button"
                class="btn btn-primary mx-1"
                onClick={() => navigate("/Dashboard")}
              >
                Close
              </button>
            </div>
          </div>
          <div class="col-md-6"></div>
        </div>
      </div>
    </>
  );
}

export default ItemDetail;
