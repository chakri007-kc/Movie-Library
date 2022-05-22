import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../style/navbar.css'

const flag = localStorage.getItem('token')
const Navbar = () => {
  const navigate = useNavigate()
    const handleChange = () =>{
        localStorage.removeItem('token')
        navigate(`/signin`)
        // window.location.reload()
    }
  return (
    <div className='navbar'>
        <li><Link className='list' to="/">HOME</Link></li>
        <li><Link className='list' to="/search">Add Movies</Link></li>
        <li><Link className='list' to="/createList">Create List</Link></li>
        {flag ? <li className='list' onClick={handleChange}>LOGOUT</li> : <><li><Link className='list' to="/signup">Signup</Link></li>
        <li><Link className='list' to="/signin">Signin</Link></li> </>}
    </div>
  )
}

export default Navbar