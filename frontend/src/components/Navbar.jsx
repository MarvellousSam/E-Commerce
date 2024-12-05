import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {FaShoppingCart, FaHome, FaUser, FaStore, FaSearch} from 'react-icons/fa'
import { MdCloudUpload } from "react-icons/md";
import { MdSegment, MdCancel } from "react-icons/md";
import Logo from '../images/eLogo.png'
import axios from 'axios';
import Fuse from 'fuse.js'
function Navbar() {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [searchWord, setSearchWord] = useState('')
  const [showNav, setShowNav] = useState(false)  // state for handling showing of the nav menu on mobile device  
  
  const profileNavigate=(e)=>{
    e.preventDefault()
    const userEmail = sessionStorage.getItem('email')
    if(userEmail){
      navigate(`/profilePage`)

    }else{
      navigate(`/signin`)
    }
  }

  
  const onChange=async(e)=>{
    setSearchWord(e.target.value)
    }





  const searchResultDisplay = filteredProducts.map((items)=>(
    <li className='list' onClick={()=>{navigate(`/searchPage/${items.name}`)}}>
      {items.name}
    </li>
  ))


  const fetchInput=async(e)=>{
    try {
      const response = await axios.get(`http://localhost:4000/api/products/search/items`)
      const result = response.data.products
      setProducts(result);  
      setFilteredProducts(result)
      // setSearchResult(result)
      
      const fuse = new Fuse(result, {  
        keys: ['name', 'brand'],  
        threshold: 0.3, // Adjust as needed  
      });  

      const fuseResults = fuse.search(searchWord);  
      setFilteredProducts(fuseResults.map(result => result.item)); // Get the actual items  
    } catch (error) {
      console.log(error)
    }
  }






  return (
    <>
        <div className='navBar'>

            <div>
                <img src={Logo} alt="Logo" className='logo'/>
            </div>


            <div className='horizontal'>
                <input className='searchItem' type="text" placeholder='Search for Products, Brands and Items' name="" id="" value={searchWord} onChange={onChange} />
                <FaSearch className='searchIcon' size={20} onClick={()=>{fetchInput()}}/>
            </div>


            <div className='navIcon'>
                <ul className='horizontal'>
                  <li><FaHome className='navBarIcon' onClick={()=>{navigate('/')}} size={30}/></li>
                  <li><FaShoppingCart className='navBarIcon' size={30} onClick={()=>{navigate('/cart')}}/></li>
                  <li><MdCloudUpload className='navBarIcon' onClick={()=>{navigate('/postProduct')}} size={30}/></li>
                  <li><FaStore className='navBarIcon' onClick={()=>{navigate('/store')}} size={30}/></li>
                  <li><FaUser className='navBarIcon' onClick={profileNavigate} size={30}/></li>
                  
                </ul>
            </div>


            <div className='menuIcon'>
              <MdSegment className='menuBtn' size={30} onClick={()=>{setShowNav((prev)=> !prev)}}/>
            </div>


        </div>
        
            <div className={`navMobileMenu ${showNav? 'show':'hidden'}`}>
              <MdCancel size={30} onClick={()=>{setShowNav((prev)=> !prev)}}/>

              <ul>
                <li className='mobileNavLink' onClick={()=>{navigate('/')}}>Home</li>
                <li className='mobileNavLink' onClick={()=>{navigate('/signin')}}>Sign in</li>
                <li className='mobileNavLink' onClick={()=>{navigate('/signup')}}>Sign up</li>
                <li className='mobileNavLink' onClick={()=>{navigate(`/profilePage`)}}>Profile</li>
                <li className='mobileNavLink' onClick={()=>{navigate('/cart')}}>Cart</li>
                <li className='mobileNavLink' onClick={()=>{navigate('/postProduct')}}>Upload Ad</li>
                <li className='mobileNavLink' onClick={()=>{navigate('/store')}}>My Store</li>

              </ul>
            </div>


            <div className='searchList'>
                <ul>
                  {searchResultDisplay}
                </ul>
            </div>

    </>
  )
}

export default Navbar