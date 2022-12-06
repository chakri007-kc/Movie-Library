import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from './Navbar'
import '../style/createList.css'
import { useNavigate } from 'react-router-dom'

const CreateList = () => {


    const navigate = useNavigate()
    const handle = (e) => {
        navigate(`/signin`)
    }

    useEffect(() => {
        if(!localStorage.getItem('token')){
            handle()
            // navigate(`/signin`)
        }
    }, [])



    const [list, setlist] = useState('')
    const [Public, setpublic] = useState(true)

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(list,Public)
        const res = await axios.post('https://movie-library.onrender.com/createlist',{list,Public},{
            headers:{
                "auth-token" : localStorage.getItem('token')
            }
        })
        console.log(res.data)
        setlist('')
        if(res.data.status === 'ok'){
            alert('list created')
        }
        else{
            alert(res.data.error)
        }
    }
  return (
    <div className='createList'>
        <Navbar/>
        <form onSubmit={handleSubmit}>
            <input className='listName' type="text" value={list} maxLength='10' placeholder="List Name" onChange={(e)=>setlist(e.target.value)} /> <br/>
            <div className='public-1'>
                <input type="radio" id="public" value="public" checked name="kk" onChange={()=> setpublic(true)}/>
                <label for="public">Public</label><br/>
            </div>
            <div className='private-1'>
                <input className='private' type="radio" id="private"  value="private" name='kk' onChange={() => setpublic(false)}/>
                <label for="private">Private</label><br/>
            </div>
            <input className='submit-1' type="submit" value="Create List" />
        </form>
    </div>
  )
}

export default CreateList