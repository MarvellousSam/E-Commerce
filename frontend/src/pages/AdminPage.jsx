import {useState, useEffect} from 'react'
import Navbar from '../components/Navbar';
import axios from 'axios';
function AdminPage() {

    const [image, setImage] = useState(null)
    const [event, setEvent] = useState([])

    const uploadImage=async(e)=>{
        e.preventDefault()
        const formData = new FormData();
        formData.append('file', image);
        formData.append('upload_preset', 'ecommerce');
        try {
          const response = await axios.post(
              `https://api.cloudinary.com/v1_1/dktallrwf/image/upload`, // Replace with your cloud name
              formData
          );
          const uploadedImageUrl = response.data.secure_url;
          console.log('Upload successful:', uploadedImageUrl);
    
          await axios.post(`https://haven-of-wisdom-server.onrender.com/api/event`, {imageUrl: uploadedImageUrl})
          console.log('New Event Created')
        } catch (error) {
          console.log(error)
        }
      }


      const eventImage = (
        <div className='container margin1'>
          {
          event.map((items)=>(
            <img key={items._id} className='eventCard' src={items.imageUrl} alt="" />
          ))
          }
        </div>
      )


    const fetchEvent =async()=>{
        try {
            const response = await axios.get('https://haven-of-wisdom-server.onrender.com/api/event')
            const resp = response.data.event
            setEvent(resp)
            console.log(resp)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        fetchEvent()
      }, [])

  return (
    <div>
    <Navbar />
    <header className='header'>
        <h2>Post Event</h2>
    </header>
    <div className='container'>
        <input className='adInput' type="file" accept='image/*' onChange={(e) => setImage(e.target.files[0])} /> <br />
        <button className='btn' onClick={uploadImage}>Post Product</button>
        {event.length==0? ' ': eventImage}
    </div>
</div>
  )
}

export default AdminPage