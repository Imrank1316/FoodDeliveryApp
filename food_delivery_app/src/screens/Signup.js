import React, { useState } from 'react'
import { Link , useNavigate} from 'react-router-dom'


export default function Signup() {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", geolocation: "" })
    let navigate = useNavigate();


    const handeSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('http://localhost:5000/api/createUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'

            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, locations: credentials.geolocation })

        })

        const json = await res.json();
        console.log(json)

        if (json.success) {
            navigate('/login')
            
        }
        else {
            alert('Entr a Valid Syntax')
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
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control"
                            name='name' value={credentials.name}
                            onChange={onChange} />
                    </div>
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
                    <div className="mb-3">
                        <label htmlFor="Address" className="form-label">Address</label>
                        <input type="text" className="form-control"
                            name='geolocation' value={credentials.geolocation}
                            onChange={onChange} />
                    </div>
                    <button type="submit" className="btn btn-success">Submit</button>
                    <Link to='/login' className='m-3 btn btn-danger' >Already a user</Link>
                </form>
            </div>
        </>
    )
}
