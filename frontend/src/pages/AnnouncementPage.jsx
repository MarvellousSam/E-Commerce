import {useState, useEffect} from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar'
import {toast} from 'react-toastify'
function AnnouncementPage() {
    const [image, setImage] = useState(null)
    const [update, setUpdate] = useState({
        header: '',
        content: '',
        imageUrl:''
    })

    const {header, content, imageUrl} = update

    const onChange=(e)=>{
        e.preventDefault()
        setUpdate((prev)=>({
            ...prev,
            [e.target.name] : e.target.value
        }))
    }

    const postUpdate=async()=>{
        
        try {




            // uploading the image background of the announcement to cloudinary storage
            const formData = new FormData();
            formData.append('file', image);
            formData.append('upload_preset', 'ecommerce');
            const response = await axios.post(
                `https://api.cloudinary.com/v1_1/dktallrwf/image/upload`, // Replace with your cloud name
                formData
            );
            const uploadedImageUrl = response.data.secure_url;
            setUpdate((prev)=>({
                ...prev,
                imageUrl: uploadedImageUrl
        }))

            // Uploading the text content of the announcement to the database
            await axios.post('https://haven-of-wisdom-server.onrender.com/api/announcement', update)
            window.alert('Announcement updated successfully')
        } catch (error) {   
            console.log(error)
        }
    }

    const updateCard = (
        <div className='updateCard'>
            <h2>{update.header || 'Header'}</h2>
            <p>{update.content || 'Content'}</p>
        </div>
    )

    useEffect(()=>{
        console.log('Fetch the announcement data from the database')
    }, [])
  return (
    <>
        <Navbar/>
        <div className='container'>
            <input type="text" name='header' onChange={onChange} placeholder='Input the header of your announcement' /> <br />
            <input type="text" name='content' onChange={onChange} placeholder='Input the content of your announcement' /> <br />
            <input type="file" accept='/image/*' onChange={(e)=>{setImage(e.target.files[0])}} name="" id="" placeholder='Select the image background of your announcement' /> <br />
            <button className='btn' onClick={()=>{postUpdate()}}>Post Update</button>

            {updateCard}
        </div>
    </>
  )
}

export default AnnouncementPage