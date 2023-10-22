import React, { useEffect, useState, createRef, useRef } from "react";

import { Button, Form, Navbar, Row, Table, Modal } from "react-bootstrap";
import "./MyStyle.css";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import  $ from "jquery";
// import dataJson from "data.json"
import Axios from "axios";

//for icon
import "bootstrap-icons/font/bootstrap-icons.css";

function Sale() {
  //button enable/disable
  const [invoice, setInvoice] = useState([]);
  const [cusid, setCusid] = useState(null);
  const [btnupdate, setBtnUpdate] = useState(true);
  const [btnsave, setBtnSave] = useState(false);
  const [totalitem, SetTotalItem] = useState(0);
  const [totalqty, SetTotalQty] = useState(0);
  const [totalbill, SetTotalBill] = useState(0);
  const [lastrecord, setLastrecord] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [address, setAddress] = useState(null);
  const [saleinv, setSaleinv] = useState(null);
  const [itemcode, setItemcode] = useState("")
  const [tblprice, setTblprice] = useState(null);
  const [data, setData] = useState()
  const [deleterow, setDeleteRow] = useState("")
  const [show, setShow] = useState(false)
  /// on page load focuse  on textbox write ref={inputRef}  where you want to focus on page load
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  ////////

  //
  const handleClose = () => {
    setShow(false)
  }
  
  /////////// keypress event when press Enter cursor goes to next textbox
  const handlekeydown = (event) => {
    if (event.key === "Enter") {
      try {
         event.target.nextSibling.nextSibling.focus();
      } catch (error) {
        console.log(error);
      }
    }
  };
  /////////////

  //text value change and stor in state
  const handleinvoice = (e) => {
    setInvoice(e.target.value);
  };

  const handletblprice = (e) => {
    setTblprice(e.target.value);
    // console.log(e.target.value)
  };
  // const handletblqty = (e) => {
  //     setTblprice(e.target.value)
  //    // console.log(e.target.value)
  // }
  const handletotalitem = (e) => {
    SetTotalItem(e.target.value);
  };
  const handletotalqty = (e) => {
    SetTotalQty(e.target.value);
  };
  const handletotalbill = (e) => {
    SetTotalBill(e.target.value);
  };

  let initialValue = [];
  const [date, setDate] = useState(moment().format("yyyy-MM-DD"));
  const [products, setProducts] = useState(initialValue);
  const formData = createRef();
  const navigate = useNavigate();
  var invoicetotal = 0;

  /////// get last Inv record+1 from table
  const maxinv = () => {
    let str1 = "SELECT max(invno)+1 as maxinv  from salemaster";
    Axios.get(process.env.REACT_APP_GETDATA, { params: { mySQL: str1 } }).then(
      (result) => {
        if (result.data.length) {
          // setLastrecord(0)
          // setLastrecord (result.data[0].maxinv)
          // document.getElementById('txtinvoice').value =lastrecord
          // alert(document.getElementById('txtinvoice').value)
          setInvoice(result.data[0].maxinv);
        }
        if (!result.data[0].maxinv) {
          // alert("Received Null value ")
          //alert('hi')
          //   document.getElementById('txtinvoice').value=1
          setInvoice(1);
        }
      }
    );
  };

  //get data from table function
  const ReadData = () => {
    let str =
      "SELECT * FROM salemaster WHERE invno = '" +
      document.getElementById("txtinvoice").value +
      "' ";
    Axios.get(process.env.REACT_APP_GETDATA, { params: { mySQL: str } }).then(
      (res) => {
        try {
          var edate=res.data[0].invdate
          setDate(edate.slice(0, -14))
          document.getElementById("txtcusid").value = res.data[0].cusid;
          document.getElementById("txtcusname").value = res.data[0].cusname;
          document.getElementById("txtaddress").value = res.data[0].cusaddress;

          setBtnSave(true);
          setBtnUpdate(false);
        } catch (error) {
          setBtnSave(false);
          setBtnUpdate(true);

          document.getElementById("txtcusid").value = 1;
          document.getElementById("txtcusname").value = "Cash Sale";
          document.getElementById("txtaddress").value = "Current Business";

          document.getElementById("txtprocode").focus();
          return;
        }
      }
    );
    let str1 =
      "SELECT * FROM saledetail WHERE invoice = '" +
      document.getElementById("txtinvoice").value +
      "' ";
    Axios.get(process.env.REACT_APP_GETDATA, { params: { mySQL: str1 } }).then(
      (res) => {
        try {
          // alert(res.data[0].proname)
          setProducts(res.data);
          GetTotal();
          //alert(products[0].proname)
        } catch (error) {}
      }
    );
  };

  /////// get role id data from table role
  const getprodata = () => {
    let str1 =
      "SELECT * FROM itemdetail where pid ='" +
      document.getElementById("txtprocode").value +
      "' ";
    Axios.get(process.env.REACT_APP_GETDATA, { params: { mySQL: str1 } }).then(
      (result) => {
        try {
          if (result.data.length) {
            //alert(result.data[0].proname)

            document.getElementById("txtproname").value =
              result.data[0].proname;
            document.getElementById("txtuom").value = result.data[0].uom;
            document.getElementById("txtprice").value =
              result.data[0].saleprice;
            document.getElementById("txtqty").value = 1;
            add();
          } else {
            document.getElementById("txtproname").value = "";
            document.getElementById("txtuom").value = "";
            document.getElementById("txtprice").value = "";
            document.getElementById("txtqty").value = "";
          }
        } catch (error) {}
      }
    );
  };
  /////////////
  const InvoicePrint = (event) => {
    window.print();
  };


  


  // search product from grid/table
  function prosearch() {
    //these variables use for grid/table
    var procodes = document.getElementsByName("tblprocode");

    for (let index = 0; index < procodes.length; index++) {
      if (
        document.getElementById("txtprocode").value == products[index].procode
      ) {
        products[index].proqty = parseInt(products[index].proqty) + 1;
        products[index].totalamount =
          products[index].proqty * products[index].proprice;
        setProducts([...products]);
        document.getElementById("txtprocode").value = "";
        GetTotal();
        //return
      }
    }
  }
  //add record in table
  const add = () => {
    //this line is prevent to relode the form just call this const in form onSubmit={Add}
    // event.preventDefault();
    var procodes = document.getElementsByName("tblprocode");

    for (let index = 0; index < procodes.length; index++) {
      if (
        document.getElementById("txtprocode").value == products[index].procode
      ) {
        products[index].proqty = parseInt(products[index].proqty) + 1;
        products[index].totalamount =
          products[index].proqty * products[index].proprice;
        setProducts([...products]);
        document.getElementById("txtprocode").value = "";
        GetTotal();
        var cond = true;
        document.getElementById("txtprocode").focus();
      }
    }
    if (!cond) {
      const newProduct = {
        procode: document.getElementById("txtprocode").value,
        proname: document.getElementById("txtproname").value,
        prouom: document.getElementById("txtuom").value,
        proprice: document.getElementById("txtprice").value,
        proqty: document.getElementById("txtqty").value,

        totalamount:
          document.getElementById("txtqty").value *
          document.getElementById("txtprice").value,
      };
      setProducts([...products, newProduct]);
      document.getElementById("txtprocode").value = "";
      document.getElementById("txtproname").value = "";
      document.getElementById("txtuom").value = "";
      document.getElementById("txtprice").value = 0;
      document.getElementById("txtqty").value = 0;
      document.getElementById("txtprocode").focus();
      //console.log('ok')
      GetTotal();
      maxinv();
    }
  };
  //add record in table
  const manualadd = () => {
    //this line is prevent to relode the form just call this const in form onSubmit={Add}
    // event.preventDefault();

    const newProduct = {
      procode: document.getElementById("txtprocode").value,
      proname: document.getElementById("txtproname").value,
      prouom: document.getElementById("txtuom").value,
      proprice: document.getElementById("txtprice").value,
      proqty: document.getElementById("txtqty").value,

      totalamount:
        document.getElementById("txtqty").value *
        document.getElementById("txtprice").value,
    };
    setProducts([...products, newProduct]);
    document.getElementById("txtprocode").value = "";
    document.getElementById("txtproname").value = "";
    document.getElementById("txtuom").value = "";
    document.getElementById("txtprice").value = 0;
    document.getElementById("txtqty").value = 0;
    document.getElementById("txtprocode").focus();
    //console.log('ok')
    GetTotal();
    maxinv();
  };

  //Delete Record  HandleDelitem
  function HandelDeleteRow() {
    //setDeleteRow(false)
    //if(deleterow){
        let total = [...products];
        total.splice(itemcode, 1);
        setProducts(total);
        GetTotal();
    //}
  }

  //sum amount total from table

  function GetTotal() {
    var sum = 0;
    var itmssum = 0;
    var titms = 0;
    var amts = document.getElementsByName("tbltotalamount");
    var itms = document.getElementsByName("tblproqty");
    for (let index = 0; index < amts.length; index++) {
      titms = index + 1;
      var amt = amts[index].value;
      sum = +sum + +amt;
      var itm = itms[index].value;
      itmssum = +itmssum + +itm;
      //alert(document.getElementById('txttotalitem').value)
    }
    // SetTotalBill={sum}
    // SetTotalQty={itmssum}
    // SetTotalItem=sum

    document.getElementById("txtbilltotal").value = sum;
    document.getElementById("txttotalqty").value = itmssum;
    document.getElementById("txttotalitem").value = titms;
    //alert(sum)
  }
  //increqty function
  const handlerowitem = (index) => {
    const indexOfArry = index.target.value;
    document.getElementById("txtprocode").value = products[indexOfArry].procode;
    document.getElementById("txtproname").value = products[indexOfArry].proname;
    document.getElementById("txtuom").value = products[indexOfArry].prouom;
    document.getElementById("txtprice").value = products[indexOfArry].proprice;
    document.getElementById("txtqty").value = products[indexOfArry].proqty;
    //alert(indexOfArry)
    //delete row from table
    let total = [...products];
    total.splice(indexOfArry, 1);
    setProducts(total);
    GetTotal();
    document.getElementById("txtqty").focus();
  };

  //increqty function
  const HandleincreQTY = (event) => {
    const indexOfArry = event.target.value;
    products[indexOfArry].proqty = parseInt(products[indexOfArry].proqty) + 1;
    products[indexOfArry].totalamount =
      products[indexOfArry].proqty * products[indexOfArry].proprice;
    setProducts([...products]);
    GetTotal();
  };
  //decrement qty value by 1
  const HandeldecreQTY = (event) => {
    const indexOfArry = event.target.value;
    products[indexOfArry].proqty = parseInt(products[indexOfArry].proqty) - 1;
    // products[indexOfArry].qty * products[indexOfArry].price;
    products[indexOfArry].totalamount =
      products[indexOfArry].proqty * products[indexOfArry].proprice;
    //console.log(products[indexOfArry].qty)
    setProducts([...products]);
    GetTotal();
  };

  ///save record to db from table
  function SaveData() {
    GetTotal();

    var prodate = document.getElementById("txtinvdate").value;
    var cusid = document.getElementById("txtcusid").value;
    var cusname = document.getElementById("txtcusname").value;
    var cusaddress = document.getElementById("txtaddress").value;
    var operator = document.getElementById("txtoperator").value;

    var totalitem = document.getElementById("txttotalitem").value;
    var totalqty = document.getElementById("txttotalqty").value;
    var billtotal = document.getElementById("txtbilltotal").value;
    var discount = document.getElementById("txtdiscount").value;
    var gtotal = document.getElementById("txtgtotal").value;

    //alert(pronames.length)

    // // insert in sale master
    let str =
      "insert into salemaster ( invdate, cusid , cusname, cusaddress, operator, totalitem, totalqty, billtotal, discount, gtotal) value ('" +
      prodate + "' ,'" + cusid + "' ,'" + cusname + "' ,'" +
      cusaddress + "' ,'" + operator + "' ,'" + totalitem +
      "' ,'" + totalqty +"' ,'" + billtotal + "' ,'" +
      discount +"' ,'" + gtotal +
      "')";
    Axios.post(process.env.REACT_APP_POSTDATA, { mySQL: str }).then((e) => {});
    // alert(lastrecord)
    // console.log('Record Saved')
    let str1 = "SELECT max(invno) as maxinv  from salemaster";
    Axios.get(process.env.REACT_APP_GETDATA, { params: { mySQL: str1 } }).then(
      (result) => {
        // alert(result.data[0].maxinv)
        if (result.data.length) {
          // setInvoice(null)
          setInvoice(result.data[0].maxinv);
          // console.log(result.data[0].maxinv)

          //alert(result.data[0].maxinv)
        }
        // add in saledetail
      }
    );

    //these variables use for grid/table
    var procodes = document.getElementsByName("tblprocode");
    var pronames = document.getElementsByName("tblproname");
    var prouoms = document.getElementsByName("tblprouom");
    var proprices = document.getElementsByName("tblproprice");
    var proqtys = document.getElementsByName("tblproqty");
    var prototalamounts = document.getElementsByName("tbltotalamount");
    //////

    for (let index = 0; index < pronames.length; index++) {
      // alert(result.data[0].maxinv)
      var procode = procodes[index].value;
      var proname = pronames[index].value;
      var prouom = prouoms[index].value;
      var proprice = proprices[index].value;
      var proqty = proqtys[index].value;
      var prototalamount = prototalamounts[index].value;

      let str1 =
        "insert into saledetail (invoice, invdate, cusid, cusname, address, procode, proname, prouom, proprice, proqty, totalamount ) value ('" +
        document.getElementById("txtinvoice").value +
        "', '" + prodate + "', '" + cusid + "', '" +
        cusname + "', '" + cusaddress + "', '" +
        procode + "', '" + proname + "', '" + prouom +
        "', '" + proprice +"', '" + proqty +
        "', '" + prototalamount +
        "'  )";
      Axios.post(process.env.REACT_APP_POSTDATA, { mySQL: str1 }).then(
        (e) => {}
      );
    }
    //alert('Record Saved ')
    //document.getElementById('txtinvoice').value=''
    setProducts(initialValue);
    document.getElementById("txtprocode").focus();
    //setInvoice(null)
  }
  return (
    <>
      <Navbar />
      {/*

    install moment 
npm install moment --save
    
    xs (for phones - screens less than 768px wide)
    sm (for tablets - screens equal to or greater than 768px wide)
    md (for small laptops - screens equal to or greater than 992px wide)
    lg (for laptops and desktops - screens equal to or greater than 1200px wide)

    my-4 is use for margine top 
    container-fluid have no width 
    Row row is always use inside a container and it is a horizantal slice this is a child class of a container
    row can create 12 column 
    background colors
    bg-primary
    bg-secondary
    bg-success
    bg-danger 
    bg-warning
    bg-info
    bg-light
    bg-dark
    bg-white
    bg-transparent

    for text center alignment   use   justify-content-center  
    */}

      <div className="container-sm bg-primary  p-2 text-white justify-content-center   ">
        <h3>
          <b>SALE INVOICE</b>
        </h3>
      </div>

      <div className="container-sm   w-75 h-75  ">
        <div className="row row row-cols-1 row-cols-sm-2  row-cols-md-3 row-cols-lg-5 my-3 ">
          <div className="card-body">
            <div className="row">
              <div className="col-6">
                <div className="input-group mb-3">
                  <span className="input-group-text bg-primary text-white">
                    Invoice #
                  </span>
                  <input
                    value={invoice}
                    type="number"
                    className="form-control"
                    placeholder="Invoice"
                    id="txtinvoice"
                    onFocus={maxinv}
                   onKeyDown={handlekeydown}

                    onBlur={ReadData}
                    onChange={handleinvoice}

                  />
                  <button
                    type="button"
                    class="btn btn-outline-secondary"
                    data-bs-toggle="modal"
                    data-bs-target="#invsearch"
                  >
                    <i className="bi bi-search"></i>
                  </button>
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text bg-primary text-white">
                    Date
                  </span>
                  <input
                    type="date"
                    className="form-control"
                    id="txtinvdate"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text bg-primary text-white">
                    Cus ID
                  </span>
                  <input
                    // value={cusid}
                    // onChange={e=> setCusid(e.target.value)}
                    type="text"
                    className="form-control"
                    id="txtcusid"
                    defaultValue={1}
                    placeholder="ID"
                  />
                  <button
                    type="button"
                    class="btn btn-outline-secondary"
                    data-bs-toggle="modal"
                    data-bs-target="#customersearch"
                  >
                    <i className="bi bi-search"></i>
                  </button>
                </div>
              </div>

              <div className="col-6">
                <div className="input-group mb-3">
                  <span className="input-group-text bg-primary text-white">
                    Customer
                  </span>
                  <input
                    //value={customer}
                    type="text"
                    className="form-control"
                    defaultValue={"Cash Sale"}
                    id="txtcusname"
                    placeholder="Customer"
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text bg-primary text-white">
                    Address
                  </span>
                  <input
                    //value={address}
                    type="text"
                    className="form-control"
                    defaultValue={"Current Business"}
                    id="txtaddress"
                    placeholder="Address"
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text bg-primary text-white">
                    Operator
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    id="txtoperator"
                    placeholder="Operator"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="additem container  mt-2 px-1 ">
          <div className="row  ">
            <div className=" input-group mb-3">
              <div class="form-check form-switch">
                <input
                  class="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                />
              </div>

              <input
                type="text"
                className="form-control"
                placeholder="Code"
                id="txtprocode"
                onBlur={getprodata}
                ref={inputRef}
                onFocus={GetTotal}
                onKeyDown={handlekeydown}
              />
              <button
                type="button"
                class="btn btn-outline-secondary"
                data-bs-toggle="modal"
                data-bs-target="#prosearch"
              >
                <i className="bi bi-search"></i>
              </button>
              <input
                type="text"
                className="form-control"
                placeholder="Product Name"
                id="txtproname"
              />
              <input
                type="text"
                className="form-control"
                placeholder="UOM"
                id="txtuom"
              />
              <input
                type="number"
                className="form-control"
                placeholder="Price"
                id="txtprice"
              />
              <input
                type="number"
                className="form-control"
                placeholder="QTY"
                id="txtqty"
              />
              <Button
                className="btn"
                variant="outline-success"
                onClick={manualadd}
              >
                Add
              </Button>
            </div>
          </div>
        </div>

        <div className="container bordershadow table-wrapper-scroll-y my-custom-scrollbar ">
          <Table className="table-striped mb-0 ">
            <thead className="tblheader">
              <tr>
                <th>#</th>
                <th>Code</th>
                <th>Product Name</th>
                <th>UOM</th>
                <th>Price</th>
                <th>QTY</th>
                <th>Option</th>
                <th>Amount</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody id="TBody">
              {products.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <input
                        style={{ width: 90 }}
                        type="text"
                        className="form-control"
                        id="tblprocode"
                        name="tblprocode"
                        value={item.procode}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        id="tblproname"
                        name="tblproname"
                        value={item.proname}
                      />
                    </td>
                    <td>
                      <input
                        style={{ width: 60 }}
                        type="text"
                        className="form-control"
                        id="tblprouom"
                        name="tblprouom"
                        value={item.prouom}
                      />
                    </td>
                    <td>
                      <input
                        style={{ width: 60 }}
                        type="text"
                        className="form-control"
                        id="tblproprice"
                        name="tblproprice"
                        value={item.proprice}
                        //onChange={handletblprice}
                      />
                    </td>
                    <td>
                      <input
                        style={{ width: 60 }}
                        type="text"
                        className="form-control"
                        id="tblproqty"
                        name="tblproqty"
                        value={item.proqty}
                        readOnly={false}
                      />
                    </td>
                    <td id="tdtest">
                      <Button
                        variant="outline-success"
                        onClick={(event) => HandleincreQTY(event)}
                        value={index}
                        name="btnincrease"
                        className="mx-.5"
                      >
                        +
                      </Button>

                      <Button
                        variant="outline-dark"
                        onClick={(event) => HandeldecreQTY(event)}
                        value={index}
                        className="mx-1"
                      >
                        -
                      </Button>
                      <Button
                        variant="outline-danger"
                     // onClick={() => handlerowdelete(item.procode)}
                       //onClick={() => HandelDeleteRow(index)}
                       onClick={() =>setItemcode(index)}
                       data-bs-toggle="modal" 
                       data-bs-target="#exampleModal"
                        value={index}
                        id="testdelbtn"
                      >
                        x
                      </Button>
                    </td>
                    <td id="tbltotal">
                      {" "}
                      <input
                        style={{ width: 80 }}
                        type="text"
                        className="form-control"
                        id="tbltotalamount"
                        name="tbltotalamount"
                        value={item.totalamount}
                      />{" "}
                    </td>
                    <td>
                       
                      <Button
                        variant="outline-success"
                        onClick={(event) => {
                            handlerowitem(event)
                            setItemcode(index)
                        }}
                        value={index}
                        name="btnincrease"
                        className="mx-.5"
                      >
                        e 
                        {/* <i class="bi bi-pen"></i> */}
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
        <div className="container  mt-3 ">
          <div className="row">
            <div className="col-8">
              <div className="input-group mb-3">
                <span
                  className="input-group-text bg-primary text-white"
                  value={totalitem}
                >
                  Total Item
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Total Item"
                  id="txttotalitem"
                />
              </div>
              <div className="input-group mb-3">
                <span
                  className="input-group-text bg-primary text-white"
                  value={totalqty}
                >
                  Total QTY
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Total QTY"
                  id="txttotalqty"
                />
              </div>
              <div className="btn-group ">
                <button
                  tabIndex={"3"}
                  type="button"
                  className="btn btn-primary mx-.5"
                  disabled={btnsave}
                  onClick={() => {
                    SaveData();
                    //savedataintodetail()
                  }}
                >
                  Save
                </button>
                <button
                  tabIndex={"4"}
                  type="button"
                  className="btn btn-primary mx-1"
                  disabled={btnupdate}
                >
                  Update
                </button>
                <button
                  tabIndex={"4"}
                  type="button"
                  className="btn btn-primary mx-1"
                  onClick={InvoicePrint}
                >
                  Print
                </button>
                <button
                  tabIndex={"4"}
                  type="button"
                  className="btn btn-primary mx-1"
                  onClick={prosearch}
                >
                  Test
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

            <div className="col-4">
              <div className="input-group mb-3">
                <span
                  className="input-group-text bg-primary text-white"
                  value={totalbill}
                >
                  Bill Total
                </span>
                <input
                  type="text"
                  className="form-control bg-success text-white fs-5 "
                  placeholder="Bill Total"
                  id="txtbilltotal"
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text bg-primary text-white">
                  Discount
                </span>
                <input
                  type="text"
                  className="form-control bg-success text-white fs-5 "
                  placeholder="Discount"
                  id="txtdiscount"
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text bg-primary text-white">
                  G- Total
                </span>
                <input
                  type="text"
                  className="form-control bg-success text-white fs-5 "
                  placeholder="G- Total"
                  id="txtgtotal"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* invoice search code start */}

      <div
        class="modal fade"
        id="invsearch"
        tabindex="-1"
        aria-labelledby="invsearchLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="invsearchLabel">
                Invoice Search
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Invoice</th>
                    <th>Invoice</th>
                    <th>Customer Name</th>
                    <th>Address</th>
                  </tr>
                </thead>
                  <tbody>
                      <tr> </tr>
                      <tr> </tr>
                      <tr> </tr>
                      <tr> </tr>
                  </tbody>
              </table>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" class="btn btn-primary">
                Search Invoice
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* invoice search code end */}

      {/* product search code start */}
      <div
        class="modal fade"
        id="prosearch"
        tabindex="-1"
        aria-labelledby="prosearchLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="prosearchLabel">
                Product Search
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <table className="table table-striped">
                <tbody id="MyTBody"></tbody>
              </table>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" class="btn btn-primary">
                Search Product
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* product search code end  */}

      {/* customer search code start */}

      <div
        class="modal fade"
        id="customersearch"
        tabindex="-1"
        aria-labelledby="customerLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="customerLabel">
                Customer Search
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <table className="table table-striped">
                <tbody id="MyTBody"></tbody>
              </table>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" class="btn btn-primary">
                Search Product
              </button>
            </div>
          </div>
        </div>
      </div>

 {/* Condition code start */}
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <h1 class="modal-title fs-5" id="exampleModalLabel">
                    Are you sure you want to delete this item{itemcode}
                </h1>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" onClick={HandelDeleteRow} data-bs-dismiss="modal">Yes</button>
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
            </div>
            </div>
        </div>
        </div>


    </>
  );
}

export default Sale;
