import React, { useState } from 'react';
import { API_URL } from "../redux/api/api";

const Contact = () => {
  const [contactData, setContactData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    setContactData({ ...contactData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseMessage("");

    const requestData = {
      fullName: contactData.fullName,
      email: contactData.email,
      phone: contactData.phone,
      msg: contactData.message,
    };

    try {
      const response = await fetch(`${API_URL}/api/contacts/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        setResponseMessage("Message sent successfully!");
        setContactData({ fullName: "", email: "", phone: "", message: "" });
      } else {
        setResponseMessage("Failed to send message. Try again.");
      }
    } catch (error) {
      setResponseMessage("Error sending message.");
    }

    setLoading(false);
  };

  return (
    <div 
      className="flex flex-col md:flex-row bg-gray-900 text-white p-8 md:p-16 items-center justify-center object-cover min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${"/puri-img/jagannath.jpg"})` }}
    >
      {/* Left Section - Contact Info */}
      <div className="w-full md:w-1/2 space-y-6 bg-gray-900 bg-opacity-80 p-6 rounded-lg">
        <h2 className="text-3xl font-bold">Contact Us</h2>
        <p className="text-gray-400">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <span className="bg-white text-gray-900 p-3 rounded-full">📍</span>
            <div>
              <h3 className="text-blue-400">Address</h3>
              <p>hanspal, bhubaneswar, odisha</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="bg-white text-gray-900 p-3 rounded-full">📞</span>
            <div>
              <h3 className="text-blue-400">Phone</h3>
              <p>+1234567890</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="bg-white text-gray-900 p-3 rounded-full">✉️</span>
            <div>
              <h3 className="text-blue-400">Email</h3>
              <p>kartikdash473@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right Section - Contact Form */}
      <div className="w-full md:w-1/2 bg-white text-gray-900 p-6 md:p-12 rounded-lg shadow-lg mt-8 md:mt-0">
        <h3 className="text-2xl font-semibold mb-6">Send Message</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            name='fullName'
            value={contactData.fullName}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="email"
            placeholder="Email"
            name='email'
            value={contactData.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
            required
          />
          <input
            type="tel"
            placeholder="Phone Number"
            name='phone'
            value={contactData.phone}
            onChange={handleChange}
            pattern="[0-9]{10}"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            placeholder="Type your Message..."
            name='message'
            value={contactData.message}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition"
          >
            {loading ? "Sending..." : "Send"}
          </button>

          {responseMessage && (
            <p className="text-center text-gray-700 mt-2">{responseMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Contact;