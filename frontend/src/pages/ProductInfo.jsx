import {useState, useEffect} from 'react'
import axios from 'axios'
import {useParams, useNavigate} from 'react-router-dom'
import Spinner from '../images/spinnerNew.gif'
import { ImCancelCircle } from 'react-icons/im';
import { FaLocationDot } from "react-icons/fa6";
import './ProductInfoStyle.css'
import Navbar from '../components/Navbar';
import {toast} from 'react-toastify'
function ProductInfo() {
    const [products, setProducts] = useState({
        _id:'',
        name: '',
        brand: '',
        price: 0,
        description: '',
        imageUrl: '',
        location: '',
        contact: ''

    })
    const [loading, setLoading] = useState(true)
    const params = useParams()
    const navigate = useNavigate()
    const id = params.id


    const fetchData=async()=>{
        try {
            const response = await axios.get(`https://haven-of-wisdom-server.onrender.com/api/product/${id}`)
            const data = response.data.product
            setProducts(data)
            console.log(products)
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }



    const addCart=async(id)=>{
        const email = sessionStorage.getItem('email')
        if (!email) {
          window.alert('Signing in is required to add item to cart')
          navigate('/signin')
        } else {
          try {
            console.log(`cart item id is ${id}`)
            const token = localStorage.getItem('token')
            await axios.post('https://haven-of-wisdom-server.onrender.com/api/cart', {item: id, user: email }, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            })
            window.alert('Item added to cart successfully')
          } catch (error) {
            console.log(error)
          }
        }
    
      }

      

    const view =
        (
            <div className='flexContainer'>
            <div className='flexSection main'>
                <div className='left'>
                    <img className='productImg' src={products.imageUrl} alt=''/>
                </div>
                <div className='center'>
                    <section className='productName'>
                        <h2>{products.name}</h2>
                        <p>Brand: {products.brand}</p>
                    </section>
                    <section className='priceContainer'>
                        <header className='header'>
                            
                        </header>
                        <main>
                            N {products.price}
                        </main>
                    </section>
                    <section>
                        <p> <FaLocationDot size={13}/> {products.location}</p>
                        <button className='cartBtn' onClick={()=>{addCart(products._id)}}>Add to Cart</button>
                    </section>
                    <section className='description'>
                        <h4>Description</h4>
                        <p>
                            {products.description}
                        </p>
                    </section>
                </div>
            </div>
            <div className='flexSection aside'>
                <h5>Delivery and Returns</h5>
                <p>Seller's contact: {products.contact}</p>
            </div>
        </div>
        )
   

    useEffect(()=>{
        console.log('running')
        fetchData()
    },[])

    if(loading){
        return (
        <div className='centerSpinner'>
          <img src={Spinner} alt='' />
        </div>)
      }
  return (
        <>
            <Navbar/>
            <div className='newPageContainer'>
                {view}

            </div>
        </>
  )
}

export default ProductInfo