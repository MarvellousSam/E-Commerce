import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Navbar from '../components/Navbar'
import axios from 'axios'
import Spinner from '../images/spinnerNew.gif'
import {toast} from 'react-toastify'
function Profilepage() {
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const [profile, setProfile] = useState({
        username:' ',
        email:' ',
        _id:' '
    })
    const {username, email, _id} = profile
    const logOut=()=>{
        sessionStorage.removeItem('email')
        window.alert('User logged out successfully')
        navigate('/')
    }
    const fetchUserDetails=async()=>{
        try {
            const user = sessionStorage.getItem('email')
            const response = await axios.get(`https://haven-of-wisdom-server.onrender.com/api/user/${user}`)
            setLoading(false)
            if(response){
                setProfile(response.data.user)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        fetchUserDetails()
    },[])


    if(loading){
        return (
        <div className='centerSpinner'>
          <img src={Spinner} alt="" />
        </div>)
      }
  return (
    <>
        <Navbar/>
        <div className='container'>
            <p>Username: {username} </p>
            <p>Email: {email}</p>
            <p>UserId: {_id}</p>
            <button className='btn' onClick={logOut}>Log Out</button>
        </div>
    </>
  )
}

export default Profilepage