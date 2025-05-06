// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
// import { FaPaperPlane } from "react-icons/fa"; // Importing paper plane icon for the submit button

// const Footer = () => {
//   const [email, setEmail] = useState('');
//   const [isValidEmail, setIsValidEmail] = useState(true); // State to track email validation

//   const handleEmailChange = (e) => {
//     setEmail(e.target.value);
//   };

//   const handleEmailSubmit = (e) => {
//     e.preventDefault();
//     // Basic email validation
//     const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
//     if (regex.test(email)) {
//       setIsValidEmail(true);
//       console.log('Email Submitted:', email); // You can replace this with your submit logic
//     } else {
//       setIsValidEmail(false);
//     }
//   };


//   return (
//     <footer className="relative z-10 text-white">
//       <div className="bg-gradient-to-r from-blue-600 to-purple-600 pb-16 pt-16">
//         <div className="container mx-auto px-4">
//           <div className="flex flex-col justify-between md:flex-row">
//             {/* Left Section: Logo and Description */}
//             <div className="flex flex-col items-start md:w-1/4">
//               <Link to="/" className="flex items-center space-x-2">
//                 <img
//                   src={"/puri-img/logo.png"}
//                   alt="Logo"
//                   className="h-24 w-20"
//                 />
//                 <span className="text-xl sm:text-lg font-bold text-white">
//                   SRI UTKAL SANSKRITI
//                 </span>
//               </Link>
//               <div className="mt-4 text-white">
//                 <p>"Discover the rich culture, heritage, and traditions of Utkal Pradesh. Immerse yourself in the vibrant history, art, and festivals of Odisha's heritage."</p>
//               </div>
//               <h3 className="font-bold">Follow Us</h3>
//                 <div className="social flex space-x-6">
//                   <Link to="/" className="hover:underline"><FaFacebook className="text-2xl text-blue-600" /></Link>
//                   <Link to="/" className="hover:underline"><FaInstagram className="text-2xl text-pink-600" /></Link>
//                   <Link to="/" className="hover:underline"><FaTwitter className="text-2xl text-blue-400" /></Link>
//                   <Link to="/" className="hover:underline"><FaYoutube className="text-2xl text-red-600" /></Link>
//                 </div>
//             </div>

//             {/* Right Section: Links */}
//             <div className="footer-right flex flex-col sm:flex-row sm:flex-wrap gap-10 mt-10">
//                {/* Footer Column 1: Explore Odisha */}

//               <div className="footer space-y-4 flex flex-col text-white">
//                 <h3 className="font-bold">Explore Odisha</h3>
//                 <Link to="/" className="hover:underline">Explore Utkal Pradesh</Link>
//                 <Link to="/aboutUtkalSanskriti" className="hover:underline">About Utkal Sanskriti</Link>
//                 <Link to="/heritageSites" className="hover:underline">Heritages</Link>
//                 <Link to="/culture" className="hover:underline">Culture</Link>
//                 <Link to="/history" className="hover:underline">History of Odisha</Link>
//               </div>

//               {/* Footer Column 2: General Information */}
//               <div className="footer space-y-4 flex flex-col text-white">
//                 <h3 className="font-bold">General Information</h3>
//                 <Link to="/about" className="hover:underline">About</Link>
//                 <Link to="/contact" className="hover:underline">Contact</Link>
//                 <Link to="/blog" className="hover:underline">Blog</Link>
//                 <Link to="/login" className="hover:underline">Login</Link>
//               </div>

//               {/* Footer Column 3: Quick Links */}
//               <div className="footer space-y-4 flex flex-col text-white">
//                 <h3 className="font-bold">Quick Links</h3>
//                 <Link to="/" className="hover:underline">Home</Link>
//                 <Link to="/" className="hover:underline">Services</Link>
//                 <Link to="/" className="hover:underline">Events</Link>
//                 <Link to="/gallery" className="hover:underline">Gallery</Link>
//               </div>
//             </div>

//           </div>
//         </div>
//       </div>

//       {/* Footer Bottom */}
//       <div className="bg-purple-800 py-4 text-center text-sm">
//         <p>© 2025 Sri Utkal Sanskriti. All rights reserved.</p>
//       </div>
//     </footer>
//   );
// };

// export default Footer;



import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { FaPaperPlane } from "react-icons/fa";

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (regex.test(email)) {
      setIsValidEmail(true);
      console.log('Email Submitted:', email);
    } else {
      setIsValidEmail(false);
    }
  };

  return (
    <footer className="relative z-10 text-white">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 pb-16 pt-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col justify-between md:flex-row gap-10">
            {/* Left Section: Logo and Description */}
            <div className="flex flex-col items-start md:w-1/3 mr-8 ">
              <Link to="/" className="flex items-center space-x-2">
                <img
                  src={"/puri-img/logo.png"}
                  alt="Logo"
                  className="h-24 w-20"
                />
                <span className="text-xl sm:text-lg font-bold text-white">
                  SRI UTKAL SANSKRITI
                </span>
              </Link>
              <div className="mt-4 text-white text-md">
                <p>"Discover the rich culture, heritage, and traditions of Utkal Pradesh. Immerse yourself in the vibrant history, art, and festivals of Odisha's heritage."</p>
              </div>
              <h3 className="font-bold mt-6">Follow Us</h3>
              <div className="social flex space-x-6 mt-2">
                <Link to="/" className="hover:underline"><FaFacebook className="text-2xl text-white-600" /></Link>
                <Link to="/" className="hover:underline"><FaInstagram className="text-2xl text-pink-600" /></Link>
                <Link to="/" className="hover:underline"><FaTwitter className="text-2xl text-white-600" /></Link>
                <Link to="/" className="hover:underline"><FaYoutube className="text-2xl text-red-600" /></Link>
              </div>
            </div>

            {/* Right Section: Grid Layout for Links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 w-full mt-10 md:mt-0">
              {/* Footer Column 1: Explore Odisha */}
              <div className="space-y-4 flex flex-col text-white">
                <h3 className="font-bold">Explore Odisha</h3>
                <Link to="/" className="hover:underline">Explore Utkal Pradesh</Link>
                <Link to="/aboutUtkalSanskriti" className="hover:underline">About Utkal Sanskriti</Link>
                <Link to="/heritageSites" className="hover:underline">Heritages</Link>
                <Link to="/culture" className="hover:underline">Culture</Link>
                <Link to="/history" className="hover:underline">History of Odisha</Link>
              </div>

              {/* Footer Column 2: General Information */}
              <div className="space-y-4 flex flex-col text-white">
                <h3 className="font-bold">General Information</h3>
                <Link to="/about" className="hover:underline">About</Link>
                <Link to="/contact" className="hover:underline">Contact</Link>
                <Link to="/blog" className="hover:underline">Blog</Link>
                <Link to="/login" className="hover:underline">Login</Link>
                <Link to="/karmakanda" target="_blank" className="hover:underline">Karmakanda</Link>
                <Link to="/faq" target="_blank" className="hover:underline">FAQ</Link>
              </div>

              {/* Footer Column 3: Quick Links */}
              <div className="space-y-4 flex flex-col text-white">
                <h3 className="font-bold">Quick Links</h3>
                <Link to="/" className="hover:underline">Home</Link>
                <Link to="/services" className="hover:underline">Services</Link>
                <Link to="/event" className="hover:underline">Events</Link>
                <Link to="/gallery" className="hover:underline">Gallery</Link>
                <Link to="/disclaimer" className="hover:underline">Disclaimer</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="bg-purple-800 py-4 text-center text-sm">
        <p>© 2025 Sri Utkal Sanskriti Sansthanam. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
