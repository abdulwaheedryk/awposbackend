import { NavLink , Route} from "react-router-dom";
import Login from "./Login";
//import "../com";

function Navbar() {
  const onLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loginuser');
  }
  return (
    <>
      <div className="container mb-5 ">
        <div className="row py-3 ">
          <div className="col">
            <nav className="navbar navbar-expand-lg navbar-light bg-white">
              <a href="" class="navbar-brand">AWSoft <h6 STYLE="font-size:7pt"> {localStorage.getItem("loginuser")} {localStorage.getItem("loginrole")} </h6> </a>
                    <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#mynavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                <div className="collapse navbar-collapse" id="mynavbar">
                     <ul className="navbar-nav">
                        <li className="nav-item dropdown"> 
                        <NavLink to="" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                                Admin
                                </NavLink>
                                <div className="dropdown-menu ">
                                    <NavLink to="/Userinfo" className="dropdown-item">User Info</NavLink>
                                    <NavLink to="/Role" className="dropdown-item">User Role</NavLink>
                                   <NavLink to="/itemdetail" className="dropdown-item">Item Detail</NavLink>
                                   <NavLink to="/Uom" className="dropdown-item">UOM</NavLink>
                                   <NavLink to="/Company" className="dropdown-item">Company</NavLink>
                                   <NavLink to="/category" className="dropdown-item">Category</NavLink>
                                   <NavLink to="/packing" className="dropdown-item">Packing</NavLink>
                                   <NavLink to="/Accountgroup" className="dropdown-item">Acc Group</NavLink>
                                   <NavLink to="/Accountdetail" className="dropdown-item">Acc Detail</NavLink>
                                   
                                  
                        
                                </div>
                        </li>
                        <li className="nav-item"> <NavLink to="" className="nav-link">Purchase</NavLink></li>
                        <li className="nav-item"> <NavLink to="/Sale" className="nav-link">Sale</NavLink></li>
                        <li className="nav-item dropdown">
                        <a href="" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                            Reports
                        </a>
                        <div className="dropdown-menu">
                                    <NavLink to="" className="dropdown-item">Inventory Report</NavLink>
                                    <NavLink to="" className="dropdown-item">Stock IN</NavLink>
                                    <NavLink to="" className="dropdown-item">Stock OUT</NavLink>
                                    <NavLink to="" className="dropdown-item">Today Cash Receiv</NavLink>
                                    <NavLink to="" className="dropdown-item">Today Cash Pay</NavLink>
                                    
                                </div>
                        </li>
                        <li className="nav-item dropdown">
                        <a href="" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                        Accounts
                        </a>
                        <div className="dropdown-menu">
                                     <NavLink to="" className="dropdown-item">Account Head</NavLink>
                                     <NavLink to="" className="dropdown-item">Add Account</NavLink>
                                     <NavLink to="" className="dropdown-item">Cash Payment</NavLink>
                                     <NavLink to="" className="dropdown-item"> Cash Receive</NavLink>
                                     <NavLink to="" className="dropdown-item">Ledger</NavLink>
                                     <NavLink to="" className="dropdown-item">G-Journal</NavLink>
                                     <NavLink to="" className="dropdown-item">Trial Balance</NavLink>
                                    
                                </div>
                        </li>
                        <li className="nav-item"> <a href="" className="nav-link">Cash Payment</a></li>
                        <li className="nav-item"> <a href="" className="nav-link">Cash Recipt</a></li>
                        <li className="nav-item"> <NavLink to="/login" className="nav-link" onClick={onLogout}>Logout</NavLink></li>
                    </ul>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
export default Navbar;
