// import React from 'react';
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const About = () => {

  const [showMore, setShowMore] = useState(false);

  return (
    <div className="container mx-auto px-6 py-24 space-y-16">
      
      {/* Header Section */}
      <div className="flex flex-col items-center mt-4 text-center">
        <motion.img 
          src={"/puri-img/rath_yatra.jpg"} 
          alt="logo" 
          className="w-32 h-32 md:w-40 md:h-40 rounded-full shadow-lg border-4 border-indigo-500"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        />
        <motion.p 
          className="max-w-2xl text-md sm:text-lg text-gray-700 mt-6"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          "Namaste! We are a team of devoted followers of Utkal Sanskriti. This website is our humble effort to share the divine essence of Lords of Utkalpradesh, His temple, and the beautiful traditions associated with Him."
        </motion.p>
      </div>

      {/* Our Journey Section */}
      <h3 className='text-2xl sm:text-3xl md:text-4xl font-extrabold text-indigo-600 text-center'>About Us</h3>
     


   <div className="about_utkal flex flex-wrap md:flex-nowrap items-center">
      {/* Text Animation - Appears on Scroll */}
      <div className="about-content">
        <motion.p
          className="w-[100%] sm:w-[80%] text-md sm:text-lg text-justify text-gray-700 leading-relaxed"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
          viewport={{ once: true }}
        >
          At <strong>Sri Utkal Sanskriti Sansthanam</strong>, we are dedicated to preserving, promoting, and celebrating the rich cultural heritage of Odisha. Our mission is to safeguard ancient traditions, document historical narratives, and support community initiatives that embody the soul of Odisha.
        </motion.p>

        <motion.p
          className="w-[100%] sm:w-[80%] text-md sm:text-lg text-justify text-gray-700 leading-relaxed"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
          viewport={{ once: true }}
        >
          We ensure that every ritual and worship is performed with precision and reverence—guided by authentic Veda mantras, traditional puja bidhi, and the strict laws of <strong>karmakanda</strong>. This commitment to accuracy preserves the true essence of our time-honored practices.
        </motion.p>

        <motion.p
          className="w-[100%] sm:w-[80%] text-md sm:text-lg text-justify text-gray-700 leading-relaxed"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
          viewport={{ once: true }}
        >
          Working closely with historians, cultural experts, and local communities, we make certain that every temple, ritual, and art form is cherished and passed on to future generations. Through research, educational programs, and digital outreach, we bridge the past with the present—inviting the world to experience Odisha's timeless legacy.
        </motion.p>

        {/* Conditionally render the fourth paragraph */}
        {showMore && (
          <motion.p
            className="w-[100%] sm:w-[80%] text-md sm:text-lg text-justify text-gray-700 leading-relaxed"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
          >
            Moreover, we guide you to explore all aspects of Odisha's cultural heritage completely free of cost. We believe in making our rich heritage accessible to all, while welcoming voluntary donations to further support Sri Utkal Sanskriti Sansthanam in its initiatives and charitable work.<br></br><br></br>Join us on our journey to honor Odisha’s cultural tapestry, and help us continue our vital work in preserving the heritage that has inspired and enriched our community for centuries.
          </motion.p>
          
        )}

        {/* Read More / Show Less Button */}
        <div className="w-[80%] mt-4">
          <button
            onClick={() => setShowMore(!showMore)}
            className="font-bold focus:outline-none bg-blue px-4 py-2 mt-2 rounded-lg text-white"
          >
            {showMore ? 'Show Less' : 'Read More'}
          </button>
        </div>
      </div>

      {/* Image Animation - Appears on Scroll */}
      <motion.img
        src={"/konark-img/prabhatarti.jpg"}
        alt="aboutlogo"
        className="w-[420px] h-[420px] border-4 border-blue-500 shadow-xl"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        viewport={{ once: true }}
      />
    </div>


      {/* Purpose Section */}
      <div className="text-center space-y-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-indigo-600">Who We Are</h2>
        <motion.p 
          className="w-full md:w-2/3 mx-auto text-md sm:text-lg text-gray-700"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
         At <strong>Utkal Sanskriti,</strong> we are a dedicated team of travel enthusiasts, historians, and local experts, united by a common mission — to provide an immersive and meaningful experience of Odisha's temple heritage and hidden cultural gems. Our curated tours are designed for spiritual seekers, history lovers, and cultural explorers alike. We take pride in showcasing the <strong>timeless beauty and divinity</strong> of Odisha’s famous temples, where <strong>spirituality meets artistry</strong> and <strong>ancient traditions</strong> come alive.
        </motion.p>
        
      </div>
      <div className="text-center space-y-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-indigo-600">Our Specialization</h2>
        <motion.p 
          className="w-full md:w-2/3 mx-auto text-md sm:text-lg text-gray-700"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
        Odisha, known as the <strong>‘Land of Temples,’</strong> is home to some of the most iconic temples in India. Our tours are specially designed to highlight not only the architectural brilliance of these temples but also the <strong>sacred stories, rituals, and legends</strong> that surround them. From the world-renowned <strong>Jagannath Temple</strong> in Puri to the <strong>stunning Konark Sun Temple</strong> and the <strong>serene Lingaraj Temple</strong> in Bhubaneswar, we guide you through a <strong>spiritual journey</strong> that unveils the very soul of Odisha.
        </motion.p>
        <motion.p 
          className="w-full md:w-2/3 mx-auto text-md sm:text-lg text-gray-700"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
           In addition to these world-famous sites, we also <strong>delve deep into the hidden heritage</strong> of Odisha, uncovering lesser-known temples, ancient monuments, and rich cultural traditions in the different districts. With us, you’ll experience Odisha’s <strong>rich cultural diversity,</strong> exploring areas that remain untouched by mainstream tourism.
        </motion.p>
        
      </div>

<div className="text-center">
  <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-indigo-600 mb-8">
    Why Choose Us?
  </h2>
  <div className="flex flex-wrap items-start items-center">
    {/* Text Content */}
    <div className="w-full md:w-1/2 flex flex-col space-y-6">
      <motion.p
        className="text-left text-md sm:text-lg text-gray-700"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <strong>• Tailored Experiences:</strong> Whether you seek a quiet
        pilgrimage, an in-depth historical tour, or an awe-inspiring
        architectural experience, we tailor our tours to suit your interests
        and preferences.
      </motion.p>
      <motion.p
        className="text-left text-md sm:text-lg text-gray-700"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <strong>• Local Expertise:</strong> Our guides are not only knowledgeable
        but deeply connected to the region’s <strong>spiritual and cultural traditions.</strong>
        They bring the history and heritage of these temples to life with their
        insightful storytelling.
      </motion.p>
      <motion.p
        className="text-left text-md sm:text-lg text-gray-700"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <strong>• Seamless Travel:</strong> We handle every detail — from
        transportation and accommodations to temple visits — ensuring that your
        journey is <strong>hassle-free and deeply enriching.</strong>
      </motion.p>
      <motion.p
        className="text-left text-md sm:text-lg text-gray-700"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <strong>• Sustainable &amp; Respectful Tourism:</strong> We are committed
        to preserving the sanctity of these sacred sites by promoting <strong>sustainable
        tourism practices</strong> that honor the local customs and environment.
      </motion.p>
    </div>

    {/* Image */}
    <div className="w-full md:w-1/2 flex justify-center">
      <motion.img
        src={"/konark-img/Konarka_Temple.jpg"}
        alt="aboutlogo"
        className="w-full md:w-[420px] h-auto border-4 border-blue-500 shadow-xl"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
      />
    </div>
  </div>
</div>
<div className="text-center">
  <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-indigo-600 mb-8">Our Mission</h2>
  <motion.p
        className="w-full md:w-2/3 mx-auto text-md sm:text-lg text-gray-700"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        Our mission is to offer a truly <strong>authentic experience</strong> that goes beyond mere sightseeing.
         We want you to feel the <strong>spiritual energy,</strong> witness the <strong>grandeur of temple architecture,</strong> 
         and immerse yourself in the rich <strong>culture of Odisha.</strong> Every tour is crafted with the intent
          to <strong>inspire reverence</strong> for the divine and to foster an appreciation for the <strong>cultural wealth</strong>
           that these temples represent.
      </motion.p>
  </div>
  <div className="text-center">
  <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-indigo-600 mb-8">Discover Odisha’s Temples and Heritage With Us</h2>
  <motion.p
        className="w-full md:w-2/3 mx-auto text-md sm:text-lg text-gray-700"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        Let us be your trusted companion as you explore the sacred temples and hidden cultural gems of Odisha.
         Whether you're a pilgrim, a heritage lover, or a curious traveler, <strong>Sri Utkal Sanskriti Sansthanam</strong> promises you a
          journey that will stay with you for a lifetime.
      </motion.p>
  </div>

  </div>
  );
};

export default About;

