import React, { Component } from 'react';
import Axios from 'axios';
class Login extends React.Component {
   //create state to contain textbox data into it and use as veriable
    state={
        username:'',
        password:''
    }
    //for login
     MyLogin =(e) =>
     {
        //alert(e.target.id)
        let str1 ="SELECT * FROM users where username ='"+ document.getElementById('txtusername').value +"' AND password = '"+ document.getElementById('txtpassword').value +"' "
        //alert(str1)
        Axios.get("http://localhost:3001/api/DataQuery",
        {params: {mySQL:str1}    }
        ).then (
            (res) =>
            {
                //alert(res.data[0].email)
                if (res.data.length) {
                    alert("OK")
                } else {
                    alert("Not OK")
                }
            }
        )
     }
    render() {
       
       return <div >
            {/* input box code start */}
            <div className='d-flex flex-column bg-primary-subtle align-items-center '>Login</div>
                <div className='d-flex flex-column vh-100 bg-primary-subtle  align-items-center '>
                    <section class="container-fluid">
                        <section class="row justify-content-center">        
                            <section class="col-12 col-2m-6 col-md-3 ">
                    <input class="form-control" id='txtusername' onChange={(e)=> this.setState({username: e.target.value})} placeholder='User Name'></input>
                    <input class="form-control" id='txtpassword' onChange={(e)=> this.setState({password: e.target.value})} placeholder='Password' ></input>
                    <div>
                    <button class="btn btn-primary btn-block" onClick={this.MyLogin} id='btnlogin'>Login</button>
                    <label id='lblloginstatus'></label>
                    </div> 
                    <div>
                        <h5>{this.state.Err}</h5>
                    </div>
                    </section>
                        </section>
                            </section>
                </div>
        </div>;
    }
}
export default TestLogin2;

