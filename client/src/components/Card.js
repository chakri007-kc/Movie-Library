import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from './Navbar';
import '../style/card.css'
import gif from '../images/loading.gif'
// import { useNavigate } from 'react-router-dom';

let id = window.location.pathname.split('/')[1];
// const token = localStorage.getItem('token')
const Card = () => {
    // const navigate = useNavigate()
    // useEffect(() => {
    //     if(!token){
    //         navigate('/signin')
    //     }
    // }, [])

    const [list, setlist] = useState({})
    const [movies, setmovies] = useState([])
    const [flag, setflag] = useState(true)
    var f=1;
    const populatelists = async () => {
        console.log(id)
        const res = await axios.get(`https://movie-library.onrender.com/getlist/${id}`,{
            headers:{
                "auth-token" : localStorage.getItem('token')
            }
        });
        console.log(res.data.list)
        console.log(res.data)
        if(res.data.status === 'ok'){
            
            setflag(false)
            console.log('hi')
            setlist(res.data.list);
            setmovies(res.data.list.movieList)
        }
        else{
            // console.log('hi')
        }
        setflag(false)
        console.log(flag,res.data.status)
    }


    const handleDelete = async(itemId) => {
        const res = await axios.delete(`https://movie-library.onrender.com/deletemovie/${id}/${itemId}`,{
            headers:{
                "auth-token" : localStorage.getItem('token')
            }
        })
        if(res.data.status === 'ok'){
            alert('movie deleted')
            populatelists()
        }
        else{
            alert(res.data.error)
        }
    }

    useEffect( () => {
        populatelists();
    }, [])
  return (
    <div className='card'>
       <Navbar/>
       {console.log(f)}
       {!list.listName && flag && <div><img className='loading-2'src={gif} alt="Loading..." /></div>}
        {list.listName ?
            <>  
                <h2 className='listName-1'>{list.listName}</h2>
                {movies.map((item,index) => {
                    return(
                        <div className='itemList' key={index}>
                            <div className='poster-2'><img src={item.Poster} alt="" /></div>
                            <h3 className='title-2'>Title : <span className="kk">{item.Title}</span></h3>
                            <h3 className='director-2' >Director : <span> {item.Director}</span></h3>
                            <h3 className='genre-2' >Genre : <span className="kk"> {item.Genre}</span></h3>
                            <h3 className='language-2'>Languages : <span className="kk">{item.Language}</span></h3>
                            <h3 className='boxoffice-2'>BoxOffice Collection : <span className="kk">{item.BoxOffice}</span></h3>
                            <h3 className='awards-2'>Awards : <span className="kk">{item.Awards}</span></h3>
                            <h3 className='country-2'>Country : <span className="kk">{item.Country}</span></h3>
                            <h3 className='rating-2'>imdb Rating : <span className="kk">{item.imdbRating}</span></h3>
                            <h3 className='released-2'>Released On : <span className="kk">{item.Released}</span></h3>
                            <h3 className='plot-2'>Plot : <span className="kk">{item.Plot}</span></h3>

                            <button className='delete-2' type="button" onClick={() => handleDelete(item.id)} ><i class="far fa-trash-alt"></i></button>
                        </div>
                    )
                })} 
            </> : !flag &&  <h1 className='listName-1'>Unauthorized</h1>}
    </div>
  )
}

export default Card