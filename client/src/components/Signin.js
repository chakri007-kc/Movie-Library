import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate,Link } from 'react-router-dom'
import '../style/signup.css'

const Signin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async(e) => {
        e.preventDefault();
        const newuser = {email,password}
        const res = await axios.post('https://movielists-007.herokuapp.com/signin',newuser)
        // console.log(res.data)
        if(res.data.status === 'ok'){
            setEmail('')
            setPassword('')
            localStorage.setItem('token',res.data.token)
            alert('login successful')
            navigate(`/`)
            window.location.reload()
        }
        else{
            alert(res.data.error)
        }
    }


  return (
    <div className='signin'>
        <h2 className='title'>SignIn</h2>
        <form onSubmit={handleSubmit}>
            <input className='email' value={email} type="email" placeholder="email" onChange={(e)=>setEmail(e.target.value)} /> <br/>
            <input className='password' value={password} type="password" placeholder="password" onChange={(e)=>setPassword(e.target.value)} /> <br/>
            <h3 className='textLink-1'>new user? <Link className='link' to='/signup'>SignUp</Link> </h3>
            <input className='submit' type="submit" value="SignIn" />
        </form>

    </div>
  )
}

export default Signin