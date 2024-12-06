import axios from 'axios'
import {useEffect, useState} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import {FaShoppingCart} from 'react-icons/fa'
import {toast} from 'react-toastify'
function BrandContainer() {
    const navigate = useNavigate()
    const [brand, setBrand] = useState([])
    const [products, setProducts] = useState([])
    const params = useParams()
    const category = params.category
    const fetchBrandName=async()=>{
        const result = await axios.get(`https://haven-of-wisdom-server.onrender.com/api/products/brand/${category}`)
        const brandList = result.data.brandItems
        setBrand(brandList)
        console.log(brand)
    }


    const productDetails=async(id)=>{
        navigate(`/productDetails/${id}`)
      }


    const addCart=async(id)=>{
    const email = sessionStorage.getItem('email')
    if (!email) {
        toast.alert('Signing in is required to add item to cart')
    } else {
        try {
        console.log(`cart item id is ${id}`)
        const token = localStorage.getItem('token')
        const response = await axios.post('https://haven-of-wisdom-server.onrender.com/api/cart', {item: id, user: email }, {
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


    const fetchProduct=async(brand)=>{
        try {
            const result = await axios.get(`https://haven-of-wisdom-server.onrender.com/api/products/category/${category}/${brand}`)
            const products = result.data.products
            setProducts(products)
        } catch (error) {
            console.log(error)
        }
    }

    const brandViewDisplay = brand.map((item, index)=>(
        <div key={index} className='brandList' onClick={()=>{fetchProduct(item.toString())}}>
            {item}
        </div>
    ))


    const productViewDisplay = products.map((item)=>(
        <div key={item._id} className='card' >
        <header>
        <img src={item.imageUrl} alt="" onClick={()=>{productDetails(item._id)}} />
        <FaShoppingCart size={20} className='cartIcon' onClick={()=>{addCart(item._id)}}/>
        </header>
        <main>
            <section>
                {item.name}
            </section>
            <section>
                N{item.price}
            </section>
        </main>

    </div>
    ))


    useEffect(()=>{
        console.log(category)
        fetchBrandName()
    },[])
  return (
    <>
        <div className='flexContainer brandContainer'>
            {brandViewDisplay}
        </div>
        {
            products.length===0 ? (<></>):
            (
                <div className='container'>
                    <div className='flexContainer'>
                        {productViewDisplay}
                    </div>
            </div>
            )
        }
    </>

    
  )
}

export default BrandContainer