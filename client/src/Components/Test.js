import React,{useState , createRef} from 'react'
import { useNavigate} from "react-router-dom"
import $ from 'jquery'
import { Button, Form, Navbar, Table } from 'react-bootstrap';
import "./MyStyle.css";
import moment from 'moment';


function Test() {
  const [date, setDate]=useState(moment().format('yyyy-MM-DD'))
  const formData = createRef();
  const navigate = useNavigate()


  const BtnAdd = (event) => {
   
    
    var v = $("#TRow").clone().appendTo("#TBody")
   
    $(v).find("input").val('')
    $(v).removeClass("d-none")
    //TRow = whole row clone = copy .appendto TBody means add new row in TBody input empty
    
  }

  const BtnDel = (v) => {
    alert('hi')
    $(v).parent().parent().remove()
    //v=button .parent = td .parent =tr remove this row 
  }

   const InvoicePrint = (event) => {
    window.print()
  
   }

   const Calc = (v) => {
        var index = $(v).parent().parent().index();
       alert(index)
   }

  return (
    <>
      <div class="container  my-3">
        <div class="card">
          <div class="card-header bg-primary text-white">
            <h4><b>SALE INVOICE</b></h4>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-8">
              <div class="input-group mb-3">
                <span class="input-group-text bg-primary text-white" >Invoice #</span>
                <input type="text" class="form-control" placeholder="Invoice" aria-label="Invoice" aria-describedby="basic-addon1" />
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text bg-primary text-white"  >Date</span>
                <input type="date" class="form-control" value={date} onChange={e=>setDate(e.target.value)}  />
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text bg-primary text-white" >ID</span>
                <input type="text" class="form-control" placeholder="ID" aria-label="ID" aria-describedby="basic-addon1" />
              </div>
            <div class="input-group mb-3">
                <span class="input-group-text bg-primary text-white" >Customer</span>
                <input type="text" class="form-control" placeholder="Customer" aria-label="Customer" aria-describedby="basic-addon1"/>
            </div>
            </div>
              <div class="col-4">
                <div class="input-group mb-3">
                    <span class="input-group-text" >Operator</span>
                    <input type="text" class="form-control" placeholder="Operator" aria-label="Operator" aria-describedby="basic-addon1"/>
                </div>
             </div>
            </div>
            <div class="row">
              <div >
              <div class="input-group mb-3">
              <input type="text" name='txtaddcode' class="form-control"  placeholder="Code"  />
              <input type="text" name='txtaddproduct' class="form-control" placeholder="Product"  />
              <input type="text" name='txtadduom' class="form-control" placeholder="UOM"  />
              <input type="number" name='txtaddprice' class="form-control" placeholder="Price"  />
              <input type="number" name='txtaddqty' class="addqty form-control" placeholder="QTY"  />
              <Button className='btn' variant="outline-success" onClick={BtnAdd}>Add</Button>
              </div>
             </div>
        </div>
          
        <table class="table table-bordered">
          <thead className="table-primary">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Code</th>
              <th scope="col">Product Name</th>
              <th scope="col">UOM</th>
              <th scope="col">Price</th>
              <th scope="col">QTY</th>
              <th scope="col">Amount</th>
              <th scope="col" className='NoPrint'>Increase/Delete QTY</th>

            </tr>
          </thead>

          <tbody id='TBody'>
          {/* className='d-none' */}
            <tr id='TRow' >
              <th scope="row">1</th>
                <td><input id='txtcode' type="text" class="form-control"/></td>
                <td><input id='txtproduct' type="text" class="form-control"/></td>
                <td><input id='txtuom' type="text" class="form-control"/></td>
                <td><input id='txtprice' type="number" onChange={Calc} class="form-control"/></td>
                <td><input id='txtqty' type="number" onChange={Calc} class="form-control"/></td>
                <td><input id='txtamount' type="text" class="form-control"/></td>
              <td>
                <Button variant="outline-success" className='btn mx-.5'>+</Button>
                <Button variant="outline-dark"  className='btn mx-1'>-</Button>
                <Button variant="outline-danger" onClick={BtnDel}  className='btn mx-.5'>x</Button>
              </td>
            </tr>
            
            </tbody>

        </table>

        <div className='row'>
          <div className='col-8'>
            
            <div class="btn-group ">
                    <button tabIndex={"3"} type="button" class="btn btn-primary mx-.5" >Save</button>
                    <button tabIndex={"4"} type="button" class="btn btn-primary mx-1"  >Update</button>
                    <button tabIndex={"4"} type="button" class="btn btn-primary mx-.5" onClick={InvoicePrint} >Print</button>
                    <button tabIndex={"4"} type="button" class="btn btn-primary mx-1"  >New</button>
                    <button tabIndex={"5"} type="button" class="btn btn-primary mx-.5" onClick={() =>navigate("/Dashboard")} >Close</button>
            </div> 
          </div>
          <div className='col-4'>
          <div class="input-group mb-3">
              <span class="input-group-text bg-primary text-white" >G Total</span>
              <input id='txtgtotal' type="text" class="form-control" />
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text bg-primary text-white" >Total Item</span>
              <input type="text" class="form-control" />
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text bg-primary text-white" >Total QTY</span>
              <input type="text" class="form-control"  />
            </div>
          </div>
        </div>
        </div>
      </div>
      </div>

     
      <button type="button" class="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#customersearch">
        <i className="bi bi-search"></i>
      </button>

<div class="modal fade" id="customersearch" tabindex="-1" aria-labelledby="customersearchLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="customersearchLabel">Customer Search</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <table className='table table-striped'> 
          <tbody id="MyTBody"></tbody>
        </table>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Search Customer</button>
      </div>
    </div>
  </div>
</div>

    </>
  );
}

export default Test;
