import React,{useState , createRef} from 'react'
import { useNavigate} from "react-router-dom"
import $ from 'jquery'
import { Button, Form, Navbar, Table } from 'react-bootstrap';
import "./MyStyle.css";
import moment from 'moment';


function Test01() {
  const [date, setDate]=useState(moment().format('yyyy-MM-DD'))
  const formData = createRef();
  const navigate = useNavigate()


  return (
    <div>
      <h1>Test</h1>


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
            

          </div>
        </div>

        

             
        </div>
      </div>



    </div>
  )
}

export default Test01
