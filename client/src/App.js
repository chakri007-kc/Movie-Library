import {Route,Routes} from 'react-router-dom';
import {BrowserRouter} from 'react-router-dom';
import './App.css';
import Card from './components/Card';
import CreateList from './components/CreateList';
import Home from './components/Home';
import Search from './components/Search';
import Signin from './components/Signin';
import Signup from './components/Signup';


let id = window.location.pathname.split('/')[1]
function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route path="/signup" element={<Signup/>} />
        <Route path="/signin" element={<Signin/>} />
        <Route path="/" element={<Home/>} />
        <Route path="/search" element={<Search/>} />
        <Route path="/createList" element={<CreateList/>} />
        <Route path={`/${id}`} element={<Card/>} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
