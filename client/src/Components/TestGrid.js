import React from 'react'
import { useEffect } from 'react'
import Login from './Login';

function TestGrid(props) {
  useEffect(() => {
    document.addEventListener('keydown', detectKeyDown, true)
  }, [])
const detectKeyDown =(e) => {
  //console.log(e.code)
  if( e.key === "Enter") {
     document.getElementById('txtlname').focus()
     fnamelf()
  }
  }
  const fnamelf =() => {
    alert("you leave the fname textbox")
  }
  
//alert(props.name)
  return (
    <div>
      {/* <TestGrid name={"Ali"} />
      <h1>{props.name}</h1> */}
      <h1>Test Grid </h1>
      <input 
      type='text'
      className='border border-sky-500 mt-10'
      id='txtfname'
      onKeyDown={detectKeyDown}
      
      />
      <input 
      type='text'
      className='border border-sky-500 mt-10'
      id='txtlname'
      onKeyDown={detectKeyDown}
      />
      <main>
        <div>Header</div>
        <div>box1</div>
        <div>box2</div>
        <div>box3</div>
        <div>sidebar</div>
        <div>main content</div>
        <div>footer</div>
      </main>
    </div>
  )
}

export default TestGrid
