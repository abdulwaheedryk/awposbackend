import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import MyData from './myData';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import Test from './Components/Test';
import Bootstrap from './Components/Bootstrap';
import TestDashboard from './TestDashboard';
import Userinfo from './Components/Userinfo';
import Navbar from './Components/Navbar';
import Role from './Components/Role';
import Uom from './Components/Uom';
import Page404 from './Components/Page404';
import Protected from './Components/Protected';
import TestGrid from './Components/TestGrid';
import ItemDetail from './Components/ItemDetail';
import Category from './Components/Category';
import Packing from './Components/Packing';
import Supplier from './Components/Supplier';
import Accountgroup from './Components/Accountgroup';
import AccountDetail from './Components/AccountDetail';
import Company from './Components/Company';
import Sale from './Components/Sale';
import Test01 from './Components/Test01';
function App() {
  return (
    <>
    <BrowserRouter>
     <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/*" element={<Page404 />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/Dashboard" element={<Protected Compo={Dashboard}/>}/>
        <Route path="/role" element={<Protected Compo={Role}/>}/>
        <Route path="/MyData" element={<MyData />}/>
        <Route path="/Test" element={<Test />}/>
        <Route path="/Test01" element={<Test01 />}/>

        <Route path="/Bootstrap" element={<Bootstrap />}/>
        <Route path="/TestLogin" element={<Login />}/>
        <Route path="/TestDashboard" element={<TestDashboard />}/>
        <Route path="/TestGrid" element={<TestGrid />}/>
        <Route exact path="/Userinfo" element={<Protected Compo={Userinfo}/>}/>
        <Route exact path="/itemdetail" element={<Protected Compo={ItemDetail}/>}/>
        <Route exact path="/category" element={<Protected Compo={Category}/>}/>
        <Route exact path="/packing" element={<Protected Compo={Packing}/>}/>
        <Route exact path="/Uom" element={<Uom />}/>
        <Route exact path="/Company" element={<Company />}/>
        <Route exact path="/Supplier" element={<Supplier />}/>
        <Route exact path="/Accountgroup" element={<Accountgroup />}/>
        <Route exact path="/Accountdetail" element={<AccountDetail />}/>
        <Route exact path="/Sale" element={<Sale />}/>

      </Routes>    
    </BrowserRouter>
    </>
  );
}
export default App;
