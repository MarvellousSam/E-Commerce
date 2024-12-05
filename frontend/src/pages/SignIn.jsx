import {useState} from 'react'
import {useNavigate, Link} from 'react-router-dom'
import axios from 'axios'
import Navbar from '../components/Navbar'
import {toast} from 'react-toastify'
function SignIn() {
    const navigate = useNavigate()
    const [userData, setData] = useState({
        email: '',
        password: ''
    })
    const {email, password} = userData


    const onChange=(e)=>{
        e.preventDefault()
        setData((prev)=>({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }


    const submitData=async(e)=>{
        e.preventDefault()
        const response = await axios.post('http://localhost:4000/api/login',{ email: email, password: password})
        const status = response.data.message
        const emailResp = response.data.email
        const token = response.data.token
        sessionStorage.setItem('email', emailResp)
        localStorage.setItem('token', token )
        if(status=='successful'){
            navigate('/')
        }
    }
  return (
    <>
        <Navbar/>
        <div className='header'>
            <h1>SIGN IN</h1>
        </div>
        <div>
            <input type="text" placeholder='Email' name='email' value={email} onChange={onChange}/> <br />
            <input type="password" placeholder='Password' name='password' value={password} onChange={onChange} /> <br />
            <button className='btn' onClick={submitData}>Sign In</button>
            <p>Don't have an account?</p> <Link to='/signup'>Register</Link>
        </div>
    </>
  )
}

export default SignIn