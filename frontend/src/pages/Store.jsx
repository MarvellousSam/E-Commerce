import {useState, useEffect} from 'react'
import Navbar from '../components/Navbar'
import {useParams, useNavigate} from 'react-router-dom'
import axios from 'axios'
import Spinner from '../images/spinnerNew.gif'
import {MdDeleteForever} from 'react-icons/md'
import BrandContainer from '../components/BrandContainer'
function Store() {
    const params = useParams()
    const navigate = useNavigate()
    const category = params.category
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)


    const productDetails=async(id)=>{
        navigate(`/productDetails/${id}`)
      }


    const fetchStoreProducts=async()=>{
      try {
        const email = sessionStorage.getItem('email')
        const result = await axios.get(`http://localhost:4000/api/store/${email}?page=${page}`)
        const products = result.data.product
        setProducts(products)
        setLoading(false)
      } catch (error) {
        console.log(error)
      }
    }


    const deleteStoreItem=async(id)=>{
      console.log(`delete id ${id}`)
      if(window.confirm('Are you sure you wanna delete this item from the cart')){

         try {
          const token = localStorage.getItem('token')
          const email = sessionStorage.getItem('email')
          await axios.delete(`http://localhost:4000/api/store/${email}/${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          )
          window.alert('Item deleted from store')
          fetchStoreProducts()
         } catch (error) {
          console.log(error)
         }
      }
    }





    const storeProductView = products.map((item)=>(
    
        <div key={item._id} className='card' >
            <header>
                <img src={item.imageUrl} alt="" onClick={()=>{productDetails(item._id)}} />
            </header>
            <main>
                <section>
                  <MdDeleteForever className='deleteIcon' size={20} onClick={()=>{deleteStoreItem(item._id)}}/>
                </section>
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
        fetchStoreProducts()
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
                {products.length===0? (<h1>No item found</h1>): storeProductView}
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

export default Store