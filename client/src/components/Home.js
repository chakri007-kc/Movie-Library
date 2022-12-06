import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from './Navbar'
import { Link,useNavigate } from 'react-router-dom'
import Card from './Card'
import '../style/home.css'
import gif from '../images/loading.gif'

const token = localStorage.getItem('token')

const Home = () => {
    const [mylists, setmylists] = useState([])
    const [loading,setloading] = useState(true)
    
    const navigate = useNavigate()
    const handle = (e) => {
        navigate(`/signin`)
    }

    useEffect(() => {
        if(!token){
            handle()
            // navigate(`/signin`)
        }
        fetchData()
    }, [])


    const fetchData = async () => {
        const res = await axios.get('https://movie-library.onrender.com/mylists',{
            headers:{
                "auth-token" : localStorage.getItem('token')
            }
        })
        console.log(res.data)
        setmylists(res.data)
        setloading(false)
    }


    const handleDelete = async(itemId) => {
        const res = await axios.delete(`https://movie-library.onrender.com/deletelist/${itemId}`,{
            headers:{
                "auth-token" : localStorage.getItem('token')
            }
        })
        if(res.data.status === 'ok'){
            alert('list deleted')
            fetchData()
        }
        else{
            alert(res.data.error)
        }
    }

    

  return (
    <div className='home'>
        <Navbar/>  
        {/* <h2 className='header'>Your MovieLists</h2> */}
        {loading && token && <div><img className='loading'src={gif} alt="Loading..." /></div> }
        <div className='home-container'>
        {mylists.map((item,index) => {
            return(
                <div className='home-list' key={index}>
                    {/* <div className='box-1'> */}
                        <h2 className='listname'>{item.listName}</h2>
                        {item.public ? <h4 className='public'>Public</h4> : <h4 className='private'>Private</h4>}
                    {/* </div> */}
                    <h3 className='length'>{item.movieList.length} movies</h3>
                    <div className='details'><Link className='details-1' onClick={<Card/>} to={`${item._id}`}>Movies</Link></div>
                    <div className='delete'><button className='delete-1' type="button" onClick={() => handleDelete(item._id)} ><i class="far fa-trash-alt"></i></button> </div>
                    {/* <i class="fa-solid fa-trash"></i> */}
                </div>
            )
        })}
        </div>
    </div>
  )
}

export default Home