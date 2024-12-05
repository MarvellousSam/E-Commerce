import {useState, useEffect} from 'react'
import Navbar from '../components/Navbar'
import {useParams, useNavigate} from 'react-router-dom'
import axios from 'axios'
import Spinner from '../images/spinnerNew.gif'
import {FaShoppingCart} from 'react-icons/fa'
import BrandContainer from '../components/BrandContainer'
import {toast} from 'react-toastify'
function Categorypage() {
    const params = useParams()
    const navigate = useNavigate()
    const category = params.category
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)


    const productDetails=async(id)=>{
        navigate(`/productDetails/${id}`)
      }


    const fetchCategoryProducts=async()=>{
      try {
        const result = await axios.get(`http://localhost:4000/api/products/${category}?page=${page}`)
        const products = result.data.product
        setProducts(products)
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
          await axios.post('http://localhost:4000/api/cart', {item: id, user: email }, {
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




    const categoryProductView = products.map((item)=>(
    
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


    // pagination function
    const [page, setPage] = useState(1)

    const previousPage=async(e)=>{
        e.preventDefault()
        if(page===1){
          setPage(1)
        }else{
          setPage((prev)=>prev - 1)
        }
    
      }
    
      const nextPage=async(e)=>{
        e.preventDefault()
        setPage((prev)=>prev + 1)
    
      }
      // pagination function ends here

    useEffect(()=>{
        fetchCategoryProducts()
    },[page])

    if(loading){
        return (
        <div className='centerSpinner'>
          <img src={Spinner} alt="" />
        </div>)
      }
  return (
    <>
        <Navbar/>
        <BrandContainer/>



        <div className='container'>
            <header className='header'>
                <h2>Search Result</h2>
            </header>

            <div className='flexContainer'>
                {products.length===0? (<h1>No item found</h1>): categoryProductView}
            </div>
        </div>



        <div className='pageContainer'>
            <button className='pageBtn' onClick={previousPage}>Previous page</button> 
            <span className='pageTxt'>{page}</span> 
            <button className='pageBtn' onClick={nextPage}>Next page</button>
        </div>


    </>
  )
}

export default Categorypage