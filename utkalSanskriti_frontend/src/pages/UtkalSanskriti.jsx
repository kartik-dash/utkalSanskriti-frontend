
import React from 'react';
// About Utkal Sanskriti Page Component (With Images)
const AboutUtkalSanskriti = () => {
  return (
    <div className="container mx-auto p-6 bg-gray-50">
      <div className="max-w-6xl mx-auto p-2 sm:p-8 bg-white shadow-xl rounded-lg">
        <h1 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-indigo-600 text-center uppercase mb-8 mt-16">
          About Utkal Sanskriti Sansthanam
        </h1>

        {/* Section 1: Introduction */}
        <section className="mb-12">
          <div className="bg-teal-100 p-6 rounded-lg shadow-md">
            <h2 className="text-xl sm:text-3xl text-teal-700 font-semibold mb-4">Introduction to Utkal Sanskriti Sansthanam</h2>
            <p className="text-md sm:text-lg text-gray-700">
            At Sri Utkal Sanskriti Sansthanam, we are dedicated to preserving, promoting, and celebrating the rich cultural heritage of Odisha. Our mission is to safeguard ancient traditions, document historical narratives, and support community initiatives that embody the soul of Odisha.
            </p>
            <img src= "/puri-img/utkalsanskriti.jpg" alt="Introduction Image" className="mt-6 w-full h-64 object-cover rounded-lg shadow-lg" />
          </div>
        </section>
         <div>
         </div>
        {/* Section 2: Historical Evolution */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl sm:text-3xl text-teal-700 font-semibold mb-4">Historical Evolution of Utkal</h2>
            <h3 className="text-xl text-teal-600">Ancient puri Temple</h3>
            <p className="text-md sm:text-lg text-gray-700 mt-2">
              The historical legacy of Odisha dates back to the Kalinga dynasty, which was influential in shaping the region's culture and spirituality, especially after the Kalinga War.
            </p>
            <img src= "/puri-img/ancient-img.jpg" alt="Ancient Odisha" className="mt-4 w-full h-48 object-cover rounded-lg shadow-md" />
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl sm:text-3xl text-teal-700 font-semibold mb-4">Modern Utkal</h2>
            <p className="text-md sm:text-lg text-gray-700 mt-2">
              Odisha’s modern evolution includes its role in India’s independence struggle, as well as the cultural renaissance post-independence that brought its rich heritage to the global stage.
            </p>
            <img src= "/puri-img/jagannath.jpg" alt="Modern Utkal" className="mt-4 w-full h-48 object-cover rounded-lg shadow-md" />
          </div>
        </section>

        {/* Section 3: Cultural Heritage */}
        <section className="mb-12">
          <div className="bg-teal-100 p-6 rounded-lg shadow-md">
            <h2 className="text-xl sm:text-3xl text-teal-700 font-semibold mb-4">Cultural Heritage of Odisha</h2>
            <p className="text-lg text-gray-700">
              Odisha’s cultural heritage is deeply connected to its religious and spiritual practices, particularly through its ancient temples, rituals, and festivals such as the famous Rath Yatra of Puri.
            </p>
            <img src= "/puri-img/Ratha_yatra.jpg" alt="Rath Yatra Festival" className="mt-6 w-full h-64 object-cover rounded-lg shadow-lg" />
          </div>
        </section>

        {/* Section 4: Odisha’s Contribution */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl sm:text-3xl text-teal-700 font-semibold mb-4">Odisha’s Contribution to Indian Culture</h2>
            <h3 className="text-xl text-teal-600">Classical Dance - Odissi</h3>
            <p className="text-md sm:text-lg text-gray-700 mt-2">
            Odissi is a classical dance form from Odisha, known for its graceful movements, expressive gestures, and sculptural poses. It originated as a temple dance performed in devotion to Lord Jagannath and tells stories from Hindu mythology. With its unique tribhangi posture and flowing style, Odissi beautifully blends rhythm, emotion, and spirituality, making it one of India’s most elegant and soulful dance traditions.
            </p>
            <div className="img-sec overflow-hidden h-80">
            <img src={"/traditional-img/oddisi dance.jpg"} alt="Odissi Dance" className="mt-4 w-full object-cover rounded-lg shadow-md" />
          </div>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl sm:text-3xl text-teal-700 font-semibold mb-4">Literary Contributions</h2>
            <p className="text-md sm:text-lg text-gray-700 mt-2">
            Adikabi Sarala Das is considered the first poet of Odia literature. He is best known for writing the “Sarala Mahabharata,” a unique retelling of the epic in Odia, making it accessible to the common people. His other major works include “Chandi Purana” and “Bilanka Ramayana.” Sarala Das played a key role in shaping Odia as a literary language, using simple, powerful language rooted in local culture. His contributions laid the foundation for the rich literary tradition of Odisha.
            </p>
            <div className="img-sec overflow-hidden h-80">
            <img src="/puri-img/sarala-das.jpg" alt="Odia Literature" className="mt-4 w-full object-cover rounded-lg shadow-md" />
            </div>
          </div>
        </section>

        {/* Section 5: Prominent Figures */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl sm:text-3xl text-teal-700 font-semibold mb-4">Prominent Figures in Odisha’s History</h2>
            <h3 className="text-xl text-teal-600">Historical Leaders</h3>
            <p className="text-md sm:text-lg text-gray-700 mt-2">
              Great leaders like King Kharavela and many others have shaped the political, social, and cultural life of Odisha, making lasting impacts on its development.
            </p>
            <img src={"/utkalsanskriti-img/kharvela.jpg"} alt="King Kharavela" className="mt-4 w-full h-48 object-cover rounded-lg shadow-md" />
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl sm:text-3xl text-teal-700 font-semibold mb-4">Modern Figures in Odisha’s</h2>
            <h3 className="text-xl text-teal-600 mt-4">Modern Cultural Icons</h3>
            <p className="text-md sm:text-lg text-gray-700 mt-2">
              Icons like Guru Kelucharan Mohapatra, Smt. Sanjukta Panigrahi, and others have played a vital role in preserving and promoting Odissi dance and traditional music.
            </p>
            <img src={"/utkalsanskriti-img/guru-kelucharan.jpg"} alt="Guru Kelucharan Mohapatra" className="w-full mt-12 h-48 object-cover rounded-lg shadow-md" />
          </div>
        </section>

        {/* Section 6: Art and Architecture */}
        <section className="bg-teal-100 p-6 rounded-lg shadow-md mb-12">
          <h2 className="text-xl sm:text-3xl text-teal-700 font-semibold mb-4">Art and Architecture of Utkal</h2>
          <h3 className="text-xl text-teal-600">Temple Architecture</h3>
          <p className="text-md sm:text-lg text-gray-700 mt-2">
            Odisha is famous for its intricate temple architecture, including the Sun Temple at Konark, Lingaraj Temple in Bhubaneswar, and Jagannath Temple in Puri, which represent the zenith of Kalinga architectural style.
          </p>
          <img src={"/utkalsanskriti-img/konark.jpg"} alt="Konark Sun Temple" className="mt-6 w-full h-64 object-cover rounded-lg shadow-lg" />

          <h3 className="text-xl text-teal-600 mt-6">Traditional Crafts</h3>
          <p className="text-md sm:text-lg text-gray-700 mt-2">
            Odisha’s crafts like Pattachitra paintings, Silver Filigree work, and Sambalpuri textiles showcase the artistic genius of its people. These crafts continue to thrive as a symbol of Odisha’s cultural richness.
          </p>
          <img src={"/utkalsanskriti-img/pattachitra.jpg"} alt="Pattachitra Art" className="mt-6 w-full h-64 object-cover rounded-lg shadow-lg" />
        </section>

      </div>
    </div>
  );
};

export default AboutUtkalSanskriti;
