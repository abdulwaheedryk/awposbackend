import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
let authorized = localStorage.getItem('authorized')
function Protected(props) {
  const { Compo } = props;
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      //return <Route exact={true} path={props.path} component={props.component} />
      //alert("Authorized")
      navigate('/')
    }
  })

  return (
    <div>
      <Compo />
    </div>
  )
}

export default Protected
