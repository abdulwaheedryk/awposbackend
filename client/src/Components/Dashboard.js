import "./MyStyle.css";
import { Link, NavLink } from "react-router-dom";
import React from "react";
import Navbar from "./Navbar";
import { useNavigate} from "react-router-dom"

import { FcApproval, FcRules, FcLineChart, FcMoneyTransfer, FcOvertime, FcPieChart, FcTodoList } from "react-icons/fc";
//http://react-icons.github.io/react-icons/icons?name=fc  for icon open this link
function Dashboard(props) 
{
  //to open page in new tabl
  const newTab=url=>{
    window.open(url)
  } // use this const newTab at onClick={() =>newTab("/sale")} on button
  const navigate = useNavigate()
  
  return (
    <div>
      <Navbar />
      <div className="parent">
      <Link to=""><button class="btnbg-1"><FcRules size={80}  />PURCHASE INVOICE</button></Link>
      <button class="btnbg-1" onClick={() =>newTab("/sale")}><FcLineChart size={80} /> SALE  INVOICE </button>
      <button class="btnbg-1"><FcMoneyTransfer size={80} />CASH PAYMENT</button>
      <button class="btnbg-1"><FcMoneyTransfer size={80} />CASH RECEIVE</button>
      <button class="btnbg-1"><FcOvertime size={80} />G-JOURNAL</button>
      <button class="btnbg-1"><FcPieChart size={80} />LEDGER</button>
      <button class="btnbg-1"><FcTodoList size={80} />TRIAL BALANCE</button>
      </div>
      
    </div>
  );
}

export default Dashboard;
