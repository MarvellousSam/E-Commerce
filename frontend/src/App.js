
import Homepage from './pages/Homepage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Categorypage from './pages/Categorypage';
import ProductInfo from './pages/ProductInfo';
import PostProduct from './pages/PostProduct';
import ShoppingCart from './pages/ShoppingCart';
import Profilepage from './pages/Profilepage';
import Orderpage from './pages/Orderpage';
import SearchPage from './pages/SearchPage';
import './App.css';
import AnnouncementPage from './pages/AnnouncementPage';
import AdminPage from './pages/AdminPage';
import {lazy} from 'react'
import Store from './pages/Store';
function App() {
  return (
    <>
    <Router>

      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/categoryPage/:category' element={<Categorypage/>}/>
        <Route path='/productDetails/:id' element={<ProductInfo/>}/>
        <Route path='/postProduct' element={<PostProduct/>}/>
        <Route path='/cart' element={<ShoppingCart/>}/>
        <Route path='/profilePage' element={<Profilepage/>}/>
        <Route path='/orderPage' element={<Orderpage/>}/>
        <Route path='/searchPage/:item' element={<SearchPage/>}/>
        <Route path='/update' element={<AnnouncementPage/>}/>
        <Route path='/admin' element={<AdminPage/>}/>
        <Route path='/store' element={<Store/>}/>

      </Routes>
      
    </Router>
    </>
  );
}

export default App;
