import React from "react";
import { IoFastFood } from "react-icons/io5";
import {Link} from 'react-router-dom'
const Footer = () => {
  return (
    <div>
    <footer className="footer p-10 bg-base-200 xl:px-24 py-10 px-4 text-base-content  ">
    <aside>
        <div className="btn btn-ghost text-sm">
          <IoFastFood size={25} />
          Food Express
          
        </div>
        <div className="ms-0 md:ms-5">
        <p>
            Kumar Fast Food Ltd.
            <br />
            Providing reliable services.
          </p>
        </div>
      </aside>
      <nav>
        <header className="footer-title">Services</header>
        <a className="link link-hover">Gallery</a>
        <a className="link link-hover">Offers</a>
        <a className="link link-hover">Restaurent</a>
      </nav>
      <nav>
        <header className="footer-title">Company</header>
        <Link to='/about' className="link link-hover">About us</Link>
        <Link to='/contact' className="link link-hover">Contact</Link>
      </nav>
      <nav>
        <header className="footer-title">Legal</header>
       
        <Link to='/privacy-term' className="link link-hover">Privacy & Terms of use</Link>
      </nav>
    </footer>
    <footer className="footer footer-center p-4 md:px-4 py-10 px-24 bg-base-300 text-base-content">
      <aside>
        <p>Copyright © 2023 - All right reserved by Kumar FastFood Ltd</p>
      </aside>
    </footer>
  </div>
    
  );
};

export default Footer;
