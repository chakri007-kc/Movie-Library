import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import '../style/signup.css'


const Signup = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const handleSubmit = async(e) => {
        e.preventDefault();
        // console.log(name, email, password)
        const newuser = {name,email,password}
        const res = await axios.post('https://movielists-007.herokuapp.com/signup',newuser)
        // console.log(res.data)
        if(res.data.status === 'ok'){
            setName('')
            setEmail('')
            setPassword('')
            navigate(`/signin`)
        }
        else{
            alert(res.data.error)
        }
    }

  return (
    <div className='signup'>
        <h2 className='title'>SignUp</h2>
        <form onSubmit={handleSubmit}>
            <input className='name' value={name} type="text" placeholder="name" onChange={(e)=>setName(e.target.value)} /> <br/>
            <input className='email' value={email} type="email" placeholder="email" onChange={(e)=>setEmail(e.target.value)} /> <br/>
            <input className='password' value={password} type="password" placeholder="password" onChange={(e)=>setPassword(e.target.value)} /> <br/>
            <h3 className='textLink'>already signed up? <Link className='link' to='/signin'>Signin</Link> </h3>
            <input className='submit' type="submit" value="SignUp" />
        </form>
    </div>
  )
}

export default Signup