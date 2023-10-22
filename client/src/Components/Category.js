import Navbar from "./Navbar";
import React, { useState, useRef, useEffect } from 'react'
import Axios from 'axios';
import { useNavigate} from "react-router-dom"



function Category() {
    const [categoryid, SetCategoryid] = useState(null)
    const [category, SetCategory] = useState(null)
    const [error, setError] = useState(false)
    const [lastrecord, setLastrecord] = useState(null)
    const navigate = useNavigate()
    


/// on page load focuse  on textbox write ref={inputRef}  where you want to focus on page load
const inputRef = useRef(null);
useEffect(() => {
  inputRef.current.focus();
}, []);
////////
   
   //text value change and stor in state
    const handlecategoryid = (e) => {
        SetCategoryid(e.target.value)
    }
    const handlecategory = (e) => {
        SetCategory(e.target.value)
        
    }
    //button enable/disable 
    const [btnupdate, setBtnUpdate] = useState(true)
    const [btnsave, setBtnSave] = useState(true)

    /////// get last ID record+1 from table
    const maxid = () => {
        let str1 = "SELECT max(categoryid)+1 as maxid  from category"
        Axios.get(process.env.REACT_APP_GETDATA, { params: { mySQL: str1 } })
            .then(result => {
                if (result.data.length) {
                   try {
                    setLastrecord (result.data[0].maxid)
                    SetCategoryid (result.data[0].maxid)
                    //document.getElementById('txtcategoryid').value =lastrecord
                   } catch (error) {
                    
                   }
                
                } 
                if (!result.data[0].maxid) {
                    // alert("Received Null value ")
                     //document.getElementById('txtcategoryid').value=1
                    SetCategoryid (1)

                 }
            })
    }
        
    //// Save/ insert data into table
    const insertdata = (e) => {
        e.preventDefault()
        if(category.length===0){
            setError(true)
            alert(error)
            return
            
        }
     
        let str1 ="insert into category ( category) value ('"+ document.getElementById('txtcategory').value +"')"
        Axios.post(process.env.REACT_APP_POSTDATA, { mySQL: str1 }).then(
            (e)=> 
            {
                document.getElementById('txtcategoryid').value =''
                document.getElementById('txtcategory').value =''
                setBtnUpdate(true)

                //alert(error)
            })
        }

        //// Update data into table
    const updatedata = (e) => {
        e.preventDefault()
        if(category.length===0){
            setError(true)
            alert(error)
            return
         }
        let str1 ="update category set category ='"+ document.getElementById('txtcategory').value  +"'where categoryid ='" + document.getElementById('txtcategoryid').value +"'"
        Axios.post(process.env.REACT_APP_POSTDATA, { mySQL: str1 }).then(
            (e)=> 
            {
                document.getElementById('txtcategoryid').value =''
                document.getElementById('txtcategory').value =''
               
                //alert(error)
            })
        }
    /////// get  id data from table role 
    const getiddata = () => {
       let str1 = "SELECT * FROM category where categoryid ='" + document.getElementById('txtcategoryid').value + "' "
        Axios.get(process.env.REACT_APP_GETDATA, { params: { mySQL: str1 } })
            .then(result => {
                //alert(res.data[0].email)
                if (result.data.length) {
                    document.getElementById('txtcategory').value =result.data[0].category
                    setBtnSave(true)
                    setBtnUpdate(false)
                }else{
                  document.getElementById('txtcategory').value =""
                    setBtnSave(false)
                    setBtnUpdate(true)
                }
   
  
            })
        }
    /////////////

    /////// get data from table role 
    const getcategorydata = () => {
   
        let str1 = "SELECT * FROM category where category ='" + document.getElementById('txtcategory').value + "' "
        Axios.get(process.env.REACT_APP_GETDATA, { params: { mySQL: str1 } })
            .then(result => {
                //alert(res.data[0].email)
                if (result.data.length) {
                    alert("This Role is already exists at ID: "+result.data[0].categoryid)
                   document.getElementById('txtcategoryid').value =result.data[0].categoryid
                }
  
            })
        }


return (
    <>
   <Navbar />
   <div className="container bg-primary  p-2 text-white justify-content-center  ">        
            <h3><b>PRODUCT CATEGORY</b></h3> 
      </div>
   <div className="container">
        <div className="row pay-3">
            <div className="col-md-6">
                <div className="form-group">
                    <label>Category ID</label>
                    <input 
                        tabIndex={"1"}
                        autoComplete="off"
                        ref={inputRef}
                        value={categoryid} 
                        onChange={handlecategoryid} 
                        onBlur={getiddata} //got focus
                        onFocus={maxid} //lost focus
                        id="txtcategoryid" 
                        type="text" 
                        className="form-control" 
                    />
                    <label>Category</label>
                    <input 
                    tabIndex={"2"}
                    autoComplete="off"
                    value={category} 
                    onChange={handlecategory} 
                    //onBlur={getrolenamedata}
                    id="txtcategory" 
                    type="text" 
                    className="form-control" 
                    />
         
                </div>
                <div className="btn-group">
                    <button tabIndex={"3"} type="button" className="btn btn-primary mx-.5" onClick={insertdata} disabled={btnsave}  >Save</button>
                    <button tabIndex={"4"} type="button" className="btn btn-primary mx-1" onClick={updatedata} disabled={btnupdate} >Update</button>
                    <button tabIndex={"5"} type="button" className="btn btn-primary mx-.5" onClick={() =>navigate("/Dashboard")} >Close</button>
                </div> 
            </div>
            <div className="col-md-6"></div>

        </div>
    </div>      
    </>
  );
}

export default Category;
