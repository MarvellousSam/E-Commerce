import React from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
function LandingContainer() {
    const navigate = useNavigate()

  return (
    <div className='landingContainer'>
        <div className='navSection'>
            <ul>
                <li className='navLink' onClick={()=>{navigate(`/categoryPage/electronics`)}}>Electronics</li>
                <li className='navLink' onClick={()=>{navigate(`/categoryPage/laptop`)}}>Laptop</li>
                <li className='navLink' onClick={()=>{navigate(`/categoryPage/tv`)}}>Television</li>
                <li className='navLink' onClick={()=>{navigate(`/categoryPage/smartwatch`)}}>Smart Watch</li>
                <li className='navLink' onClick={()=>{navigate(`/categoryPage/tablet`)}}>Tablet</li>
                <li className='navLink' onClick={()=>{navigate('/categoryPage/phone')}}>Phones</li>
                <li className='navLink' onClick={()=>{navigate('/categoryPage/fashion')}}>Fashion and Beauty</li>
                <li className='navLink' onClick={()=>{navigate('/categoryPage/toys')}}>Babies and Toys</li>
                <li className='navLink' onClick={()=>{navigate('/categoryPage/equipments')}}>Equipments</li>
                <li className='navLink' onClick={()=>{navigate('/categoryPage/others')}}>Others</li>
            </ul>
        </div>
        <div className='brandImageContainer'>
          
        </div>
        <div className='mobileCategory'>
          <h2>Categories</h2>
          <button className='navBtn' onClick={()=>{navigate(`/categoryPage/electronics`)}}>Electronics</button> <button className='navBtn' onClick={()=>{navigate(`/categoryPage/laptop`)}}>Laptop</button>
          <button className='navBtn' onClick={()=>{navigate(`/categoryPage/tv`)}}>Television</button> <button className='navBtn' onClick={()=>{navigate(`/categoryPage/smartwatch`)}}>Smart watch</button>
          <button className='navBtn' onClick={()=>{navigate(`/categoryPage/tablet`)}}>Tablet</button> <button className='navBtn' onClick={()=>{navigate(`/categoryPage/phone`)}}>Phone</button>
          <button className='navBtn' onClick={()=>{navigate(`/categoryPage/toys`)}}>Babies</button> <button className='navBtn' onClick={()=>{navigate(`/categoryPage/fashion`)}}>Fashion</button>
          <button className='navBtn' onClick={()=>{navigate(`/categoryPage/equipments`)}}>Equipments</button> <button className='navBtn' onClick={()=>{navigate(`/categoryPage/others`)}}>Others</button>
        </div>
    </div>
  )
}

export default LandingContainer