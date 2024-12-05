import React from 'react'
import {FaFacebook, FaWhatsapp, FaInstagram, FaTwitter} from 'react-icons/fa'
function Footer() {
  return (
    <div className='footer '>
      <header>
        <h1 className='brandHeader'>Shopify</h1>
      </header>
      <main className='flexContainer'>
          <div className='footerContent'>
              <h3>Need Help?</h3>
              <ul>
                <li>Chat with us</li>
                <li>Help center</li>
                <li>Contact us</li>
              </ul>
            </div>
            <div className='footerContent'>
              <h3>About Shopify</h3>
              <ul>
                <li>About Us</li>
                <li>Terms and Condition</li>
                <li>Privacy Notice</li>
              </ul>
            </div>
            <div className='footerContent'>
              <h3>Make money with Shopify</h3>
              <ul>
                <li>Sell on Shopify</li>
                <li>Vendor Hub</li>
                
              </ul>
            </div>
      </main>
      <div className='socialLink'>
        <h3>Join us on</h3>
        <section>
          <FaFacebook size={30} className='socialIcon'/>
          <FaInstagram size={30} className='socialIcon'/>
          <FaWhatsapp size={30} className='socialIcon'/>
          <FaTwitter size={30} className='socialIcon'/>
        </section>
      </div>
    </div>
  )
}

export default Footer