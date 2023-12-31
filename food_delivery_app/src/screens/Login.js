import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {

  const [credentials, setCredentials] = useState({ email: "", password: "" })
  let navigate = useNavigate();

  const handeSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/loginuser', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'

      },
      body: JSON.stringify({
        email: credentials.email, password: credentials.password
      })

    })

    const json = await res.json();
    if (json.success) {
      localStorage.setItem('authToken', json.authToken)
      console.log(localStorage.setItem('authTocken', json.authToken))
      navigate('/')
      
    }

    else  {
      alert('Enter a valid credentials')

    }

  }

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value })
  }

  return (
    <>
      <div className='container'>
        <form onSubmit={handeSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control"
              name='email' value={credentials.email}
              onChange={onChange} />
          </div>

          <div className="mb-3">
            <label htmlFor="Enter Password" className="form-label">Password</label>
            <input type="password" className="form-control"
              name='password' value={credentials.password}
              onChange={onChange} />
          </div>
          <button type="submit" className="btn btn-success">Submit</button>
          <Link to='/createuser' className='m-3 btn btn-danger' >I'm a New User</Link>
        </form>
      </div>

    </>
  )
}
