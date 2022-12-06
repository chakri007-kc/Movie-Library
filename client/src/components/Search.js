import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from './Navbar'
import '../style/search.css'
import { useNavigate } from 'react-router-dom'
import gif from '../images/loading.gif'

const Search = () => {

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



    const [search, setsearch] = useState('')
    const [movies, setmovies] = useState({})
    const [flag, setflag] = useState(false)
    const [list,setlist] = useState([])
    const [loading,setloading] = useState(false)
    const [f,setf] = useState(false)
    
    const [selectedlist, setselectedlist] = useState('')

    const handleSubmit = async(e) => {
        setloading(true)
        setflag(false)
        e.preventDefault();
        console.log(search)
        const res = await axios.get(`https://omdbapi.com/?t=${search}&plot=full&apikey=c43d8c50`)
        console.log(res.data)
        setsearch('')
        setmovies(res.data)
        setloading(false)
        setf(true)
        const response = await axios.get('https://movie-library.onrender.com/mylistnames',{
            headers:{
                "auth-token" : localStorage.getItem('token')
            }
        })
        console.log(response.data)
        setlist(response.data)
    }

    const addMovie = async(e) => {
        e.preventDefault();
        const data = {
            listName : selectedlist,
            newMovie : movies
        }
        const res = await axios.post('https://movie-library.onrender.com/addmovie',data,{
            headers:{
                "auth-token" : localStorage.getItem('token')
            }
        })
        console.log(res.data)
        if(res.data.status === 'ok'){
            alert('movie added to list')
        }
        else{
            alert(res.data.error)
        }
        // console.log(selectedlist)
    }

  return (
    <div className='search'>
        <Navbar/>
        <form onSubmit={handleSubmit} className='form-1'>
            <input className='searchMovie' type="text" value={search} placeholder="Movie Name" onChange={(e)=>setsearch(e.target.value)} /> <br/>
            <input className='submit-1' type="submit" value="Search" />
        </form>

        {loading ? <div><img className='loading-1'src={gif} alt="Loading..." /></div> : 
            movies.Title && !loading && <div className='movieList'>
                <div className='poster-1'><img src={movies.Poster} alt="" /></div>
                <h3 className='title-1'>Title : <span className="kk">{movies.Title}</span></h3>
                <h3 className='director-1' >Director : <span> {movies.Director}</span></h3>
                <h3 className='genre-1' >Genre : <span className="kk"> {movies.Genre}</span></h3>
                <h3 className='language-1'>Languages : <span className="kk">{movies.Language}</span></h3>
                <h3 className='boxoffice-1'>BoxOffice Collection : <span className="kk">{movies.BoxOffice}</span></h3>
                <h3 className='awards-1'>Awards : <span className="kk">{movies.Awards}</span></h3>
                <h3 className='country-1'>Country : <span className="kk">{movies.Country}</span></h3>
                <h3 className='rating-1'>imdb Rating : <span className="kk">{movies.imdbRating}</span></h3>
                <h3 className='released-1'>Released On : <span className="kk">{movies.Released}</span></h3>
                <h3 className='plot-1'>Plot : <span className="kk">{movies.Plot}</span></h3>
            </div>            
        }
        {!movies.Title && f && <div className='noMovie'>No Movie Found</div>}
        <br/>
        {movies.Title && !loading && <input className='submit-1 buttonSubmit' type="button" value="add" onClick={()=>setflag(!flag)} /> } 
        {flag ?
            <form className='addMovie' onSubmit={addMovie}>
                {/* <label for="list">Choose a ListName : </label> */}
                <select className='select-1' id="list" onChange={(e)=>setselectedlist(e.target.value)}>
                    <option value="">Select a List </option>
                    {list.map((item,index)=>{
                        return <option key={index} value={item}>{item}</option>
                    })}
                </select>
                <br/>
                <input className='submit-1 buttonSubmit-1' type="submit" value="Add Movie to list" />
            </form>
        : null}
    </div>
  )
}

export default Search