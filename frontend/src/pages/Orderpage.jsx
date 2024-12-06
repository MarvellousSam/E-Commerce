import {useState, useEffect} from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar'
import Spinner from '../images/spinnerNew.gif'
import {toast} from 'react-toastify'
function Orderpage() {

    const [loading, setLoading] = useState(true)
    const [order, setOrder] = useState([])
    const user = sessionStorage.getItem('email')


    const fetchOrder=async(id)=>{
      try {
        const response = await axios.get(`https://haven-of-wisdom-server.onrender.com/api/order?user=${user}`)
        const orderItems = response.data.cart
        setOrder(orderItems)
        console.log(`order items: ${order}`)
        setLoading(false)
      } catch (error) {
        console.log(error)
      }
    }



    const orderItemVIew = order.map((item)=>(
        
        <div key={item.productId._id} className='card longCard'>
            <header>
            <img src={item.productId.imageUrl} alt="" />
            </header>
            <main>

                <section>
                    {item.productId.name}
                </section>
                <section>
                    N{item.productId.price}
                </section>
            </main>

    </div>
    ))

    
    useEffect(()=>{
        fetchOrder()

    },[])

    if(loading){
        return (
        <div className='centerSpinner'>
          <img src={Spinner} alt="" />
        </div>)
      }


  return (
    <div>
        <Navbar/>
        <h2>Order Received</h2>
        <div className='container flexContainer'>
            {orderItemVIew}
        </div>
    </div>
  )
}

export default Orderpage