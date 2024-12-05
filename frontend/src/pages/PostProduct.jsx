import { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
function PostProduct() {
    const navigate = useNavigate()
    const [image, setImage] = useState(null);
    const [password, setPassword] = useState('');
    const [form, setForm] = useState({
        name: '',
        brand: '',
        price: 0,
        description: '',
        location: '',
        category: '',
        imageUrl: '',
        contact: ''
    });

    const { name, brand, price, description, location, category, imageUrl, contact } = form;

    const onChange = (e) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const setCategory = (catg) => {
        setForm((prev) => ({
            ...prev,
            category: catg
        }));
    };

    const upload = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', image);
        formData.append('upload_preset', 'ecommerce');
        const email = sessionStorage.getItem('email');
        
        if (!email) {
            window.alert('Sign in required to post ads');
            navigate('/signin')
        } else {
            try {
                console.log(form);
                const response = await axios.post(
                    `https://api.cloudinary.com/v1_1/dktallrwf/image/upload`, // Replace with your cloud name
                    formData
                );
                const uploadedImageUrl = response.data.secure_url;
                console.log('Upload successful:', uploadedImageUrl);

                // Update the form state with the uploaded image URL
                setForm((prev) => ({
                    ...prev,
                    imageUrl: uploadedImageUrl
                }));

                // Send the updated form state to your backend
                console.log(form)

                setTimeout(async()=>{
                    await axios.post(`http://localhost:4000/api/products?email=${email}&password=${password}`,
                        {
                            name: name,
                            brand: brand,
                            price: price,
                            description: description,
                            location: location,
                            category: category,
                            imageUrl: uploadedImageUrl,
                            contact: contact
                        }
                    );
                },2000)

                window.alert('Product created susccessfully')

            } catch (error) {
                console.error('Error uploading image:', error);
                window.alert('An error occured with the upload')
            }
        }
    };

    return (
        <div>
            <Navbar />
            <header className='header'>
                <h2>Post Ads</h2>
            </header>
            <div className='container'>
                <input className='adInput' type="file" accept='image/*' onChange={(e) => setImage(e.target.files[0])} /> <br />
                <input className='adInput' type="text" name="name" id="name" value={name} onChange={onChange} placeholder='Enter the name of the product' /> <br />
                <input className='adInput' type="text" name="category" id="category" value={category} placeholder='Select the category of the product' disabled /> <br />

                <section className='sectionContainer'>
                    <button className='selectBtn' onClick={() => setCategory('phone')}>Phone</button>
                    <button className='selectBtn' onClick={() => setCategory('laptop')}>Laptop</button>
                    <button className='selectBtn' onClick={() => setCategory('tv')}>Tv</button>
                    <button className='selectBtn' onClick={() => setCategory('smartwatch')}>Smart Watch</button>
                    <button className='selectBtn' onClick={() => setCategory('electronics')}>Electronics</button>
                    <button className='selectBtn' onClick={() => setCategory('tablet')}>Tablet</button>
                    <button className='selectBtn' onClick={() => setCategory('fashion')}>Fashion</button>
                    <button className='selectBtn' onClick={() => setCategory('equipments')}>Equipments</button>
                    <button className='selectBtn' onClick={() => setCategory('toys')}>Toys</button>
                    <button className='selectBtn' onClick={() => setCategory('others')}>Others</button>
                </section>

                <input className='adInput' type="text" name="brand" id="brand" value={brand} onChange={onChange} placeholder='Enter the brand of the product' /> <br />
                <input className='adInput' type="number" name="price" id="price" value={price} onChange={onChange} placeholder='Enter the price of the product' /> <br />
                <input className='adInput' type="text" name="description" id="description" value={description} onChange={onChange} placeholder='Enter the description of the product' /> <br />
                <input className='adInput' type="text" name="location" id="location" value={location} onChange={onChange} placeholder='Enter the location of the product' /> <br />
                <input className='adInput' type="text" name="contact" id="contact" value={contact} onChange={onChange} placeholder='Enter your contact number' /> <br />
                <input className='adInput' type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter password' /> <br />

                <button className='btn' onClick={upload}>Post Product</button>
            </div>
        </div>
    );
}

export default PostProduct;
