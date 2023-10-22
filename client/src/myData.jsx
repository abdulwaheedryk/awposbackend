import React, { Component } from 'react';
import Axios from 'axios';
class MyData extends React.Component {
    
   //create state to contain textbox data into it and use as veriable
    state={
        username:'',
        email:'',
        password:'',
        Err:' ',
        Arr1: []
        
    }
    //create a function save data into table
    submitData = ()=>
    {
        let str1 ="insert into users (username,email,password) value ('"+ this.state.username +"','"+ this.state.email +"','"+ this.state.password +"')"
        // let str2 ="insert into test (username,email,password) value ('"+ this.state.username +"','"+ this.state.email +"','"+ this.state.password +"')"
        Axios.post("http://localhost:3001/api/NonQuery",{mySQL:str1}).then(
            (e)=>
            {
                    this.setState({Err:e.data})
                    //call readdata function to show data in page
                    this.MyReadData()
                    //empty textboxs
                    document.getElementById('txtusername').value =''
                    document.getElementById('txtemail').value =''
                    document.getElementById('txtpassword').value =''
            }
        )
        // Axios.post("http://localhost:3001/api/NonQuery",{mySQL:str2})
       
    }
    //get data from table function
    MyReadData =()=>
    {
        let str1 ='SELECT * FROM users'
        Axios.get("http://localhost:3001/api/DataQuery",
        {params:{mySQL:str1}}
        ).then (
            (res) =>
            {
                this.setState ({Arr1: res.data})
            }
        )
    }
    //show data into textbox function
    MyDatainTextbox =(e) =>
    {
       //alert(e.target.id)
       let str1 ="SELECT * FROM users where username ='"+ e.target.id +"'"
       //alert(str1)
       Axios.get("http://localhost:3001/api/DataQuery",
       {params: {mySQL:str1}    }
       ).then (
           (res) =>
           {
              // this.setState ({Arr2: res.data})
              // alert(res.data[0].username)
               document.getElementById('txtusername').value =res.data[0].username
               document.getElementById('txtemail').value =res.data[0].email
               document.getElementById('txtpassword').value =res.data[0].password
           }
       )
    }

     //for login
     MyLogin =(e) =>
     {
        //alert(e.target.id)
        let str1 ="SELECT * FROM users where username ='"+ document.getElementById('txtusername').value  +"'"
        //alert(str1)
        Axios.get("http://localhost:3001/api/DataQuery",{params: {mySQL:str1}}
        ).then (
            (res) =>
            {
                //alert("hi")
               // this.setState ({Arr2: res.data})
               // alert(res.data[0].username)
               // document.getElementById('txtusername').value =res.data[0].username
                document.getElementById('txtemail').value =res.data[0].email
                document.getElementById('txtpassword').value =res.data[0].password
            }
        ).catch(err => alert("No Data Found",err));
     }
    //update data into table function
    MyUpdateData =() =>
    {
        let str1 ="update users set email ='"+ document.getElementById('txtemail').value  +"', password='"+ document.getElementById('txtpassword').value +"' where username ='" + document.getElementById('txtusername').value +"'"
        // let str2 ="insert into test (username,email,password) value ('"+ this.state.username +"','"+ this.state.email +"','"+ this.state.password +"')"
        Axios.post("http://localhost:3001/api/NonQuery",{mySQL:str1}).then(
            (e)=>
            {
                    this.setState({Err:e.data})
                    //call readdata function to show data in page
                    this.MyReadData()
                    //empty textboxs
                    document.getElementById('txtusername').value =''
                    document.getElementById('txtemail').value =''
                    document.getElementById('txtpassword').value =''
            }
        )
    }
    
    render() {
        return <div>
            {/* input box code start */}
            <div style={{width:'100%', display: 'flex', flexDirection: 'column', alignItems:'center', border: '5px solid gray' }}>
                Test Data Entry
            </div>
            <div style={{width:'100%', height: '800px', display: 'flex', flexDirection: 'column', alignItems:'center', border: '5px solid gray' }}>
                <input id='txtusername' onChange={(e)=> this.setState({username: e.target.value})} placeholder='User Name'></input>
                <input id='txtemail' onChange={(e)=> this.setState({email: e.target.value})} placeholder='Email '></input>
                <span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
                <input id='txtpassword' onChange={(e)=> this.setState({password: e.target.value})} placeholder='Password' ></input>
            {/* <div>
                    <button style={{marginRight:'5px'}} id='btnsave' onClick={this.submitData}>Save</button>
                    <button style={{marginRight:'5px'}} id='btnupdate'onClick={this.MyUpdateData} >Update</button>
                    <button style={{marginRight:'5px'}} id='btndelete'>Delete</button>
                    <button style={{marginRight:'5px'}} onClick={this.MyReadData} >Read</button>
                    <button id='btnprint'>Print</button>
                    <button onClick={this.MyLogin} id='btnlogin'>Login</button>
                </div>  */}
                <div class="btn-group">
                    <button type="button" class="btn btn-primary" onClick={this.submitData}>Save</button>
                    <button type="button" class="btn btn-primary" onClick={this.MyUpdateData}>Update</button>
                    <button type="button" class="btn btn-primary">Delete</button>
                    <button type="button" class="btn btn-primary" onClick={this.MyReadData}>Read</button>
                    <button type="button" class="btn btn-primary">Print</button>
                    <button type="button" class="btn btn-primary" onClick={this.MyLogin}>Login</button>
                    <button type="button" class="btn btn-primary" onClick={this.MyLogin}>Add</button>

                </div> 
                <div>
                    <h5>{this.state.Err}</h5>
                </div>
                <div>
                    <table style={{width:'100%', border:'1px solid black', backgroundColor:'whitesmoke' }}>
                                    <tr>
                                    <th>User Name </th>
                                    <th>Email Address</th>
                                    <th>Password</th>
                                    </tr>
                    </table>
                    {this.state.Arr1.map(
                            (val) =>
                            <div >
                                <tbody>
                                    <tr>
                                        <td onClick={this.MyDatainTextbox} id = {val.username}  style={{cursor:'pointer', margin:'2px', width:'200px' , border:'1px solid black'}}>{val.username}</td>
                                        <td style={{ margin:'2px', width:'200px', border:'1px solid black'}}>{val.email}</td>
                                        <td style={{ margin:'2px', width:'200px', border:'1px solid black'}}>{val.password}</td>
                                    </tr>
                                </tbody>
                            </div>
                        )}
                        
                       
                    </div>
            </div>
        </div>;
        
    }
   
}

export default MyData;

