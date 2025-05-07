import React, { useState } from "react";

const faqData = [
  {
    question: "What is Utkal Sanskriti Sansthanam?",
    answer:
      "Utkal Sanskriti Sansthanam is a nonprofit organization working to protect, promote, and revive Odisha’s cultural, spiritual, and ritualistic heritage. We serve locals, devotees, and cultural tourists with a wide range of authentic services.",
  },
  {
    question: "Where is Utkal Sanskriti Sansthanam based?",
    answer:
      "We are headquartered in Odisha, India, but serve devotees and cultural enthusiasts across the country and internationally.",
  },
  {
    question: "What kind of services do you provide?",
    answer: (
      <ul className="list-disc list-inside space-y-1">
        <li>Pandit services for religious rituals</li>
        <li>Temple tours and spiritual guidance</li>
        <li>Cultural event organization</li>
        <li>Festival participation support</li>
        <li>Heritage walk arrangements</li>
        <li>Odia traditional meal experiences</li>
        <li>Local art, dance, and craft showcases</li>
      </ul>
    ),
  },
  {
    question: "Are your services open to tourists?",
    answer:
      "Yes. We provide complete cultural and spiritual assistance to domestic and international tourists visiting Odisha.",
  },
  {
    question: "How do I book a Pandit for a ritual?",
    answer:
      "You can book through our website, WhatsApp, or by calling our helpline. We assign trained, verified Pandits suited to your ritual type and location.",
  },
  {
    question: "What rituals do you help organize?",
    answer: (
        <ul className="list-disc list-inside space-y-1">
          <li>Griha Pravesh</li>
          <li>Satyanarayan Puja</li>
          <li>Rudrabhishek</li>
          <li>Marriage rituals</li>
          <li>Shraddha and Tarpan</li>
          <li>Annaprashan, Namakaran, Upanayan</li>
          <li>Temple-specific offerings and Sevas</li>
        </ul>
      ),
  },
  {
    question: "Can you help arrange poojas at famous temples in Odisha?",
    answer: (
      <div>
        <p>Yes. We facilitate offerings, Sevas, and Darshan bookings at major temples like:</p>
        <ul className="list-disc list-inside space-y-1 mt-2">
          <li>Jagannath Temple (Puri)</li>
          <li>Lingaraj Temple (Bhubaneswar)</li>
          <li>Konark Sun Temple (ritual access)</li>
          <li>Maa Taratarini, Maa Mangala, and others</li>
        </ul>
      </div>
    ),
  },
 
  {
    question: "Do you offer guided temple tours?",
    answer: 
       "Yes. Our guided tours provide spiritual and historical context, personalized for tourists unfamiliar with Odisha’s traditions."
  },

  {
    question: "Do you provide Mahaprasad or traditional Odia food experiences?",
    answer:
        "Yes. We organize authentic Mahaprasad offerings from temples and traditional Odia meals for devotees and tourists."
  },

  {
    question: "Can foreigners participate in your services?",
    answer: 
      "Absolutely. Our services are open to all nationalities. We also provide English-speaking guides and cultural interpreters for a better experience."
  },

  {
    question: "Do you conduct spiritual retreats or meditation camps?",
    answer:
      "Yes. We organize spiritual retreats, Vedic chanting sessions, and wellness experiences rooted in Odia traditions."
  },

  {
    question: "How much do your services cost?",
    answer:
       "Many services are donation-based. For organized packages or specific rituals, we provide transparent, fixed rates."
  },
   
  {
    question: "Is online consultation or ritual booking available?",
    answer:
       "Yes. We offer online consultations with Pandits and allow remote bookings for rituals, especially useful for NRIs and international devotees."
  },

  {
    question:"Do you help with festival attendance (like Rath Yatra)?",
    answer:
       "Yes. We assist with planning, logistics, passes (where possible), and spiritual guidance for major festivals including Rath Yatra, Chandan Yatra, and Durga Puja."
  },

  {
    question:"Can I donate or sponsor a religious or cultural activity?",
    answer:
       "Yes. You can sponsor rituals, events, or donate toward our cultural preservation efforts. Sponsorship options are listed on our Donate page."
  },

  {
    question:"Is Utkal Sanskriti Sansthanam affiliated with a temple or government?",
    answer: 
       "No. We are an independent nonprofit trust, although we collaborate with temples, religious scholars, and cultural institutions as needed."
  },

  {
    question:"Do you offer Odia or Sanskrit cultural classes?",
    answer:
       "While not a school, we occasionally host workshops and awareness programs related to Odia and Sanskrit literature, chants, and scriptures."
  },

  {
    question:"Do you support local artisans and craftsmen?",
    answer:
       "Yes. We promote and connect traditional artisans, weavers, and performers with tourists and patrons to help sustain Odisha’s intangible heritage."
  },

  {
    question:"Are your services available year-round?",
    answer:
       "Yes. We operate throughout the year. However, temple-specific services may depend on availability and seasonal schedules."
  },

  {
    question:"How can I become a volunteer or member?",
    answer:
       "You can apply to volunteer or register for membership through our website. Members receive event invites, volunteer opportunities, and updates."
  },

  {
    question:"Do you offer interpretation or translation support for tourists?",
    answer:
       "Yes. We provide interpreters fluent in Odia, Hindi, Sanskrit, and English to assist non-native visitors."
  },

  {
    question:"How can I contact Utkal Sanskriti Sansthanam?",
    answer:
       "Visit our Contact Us page, email us, call our helpline, or message us on WhatsApp. We’re also available on social media platforms."
  },

  {
    question:"Can you help plan a full spiritual tour of Odisha?",
    answer:
      "Yes. We can curate a multi-day itinerary covering temples, rituals, cultural experiences, and accommodation — ideal for solo travelers, families, and tour groups."
  },

  {
    question:"Is there a mobile app for your services?",
    answer:
       "Our app is under development. Meanwhile, our mobile-friendly website and WhatsApp support ensure seamless communication."
  },

  {
    question:"Do you provide CSR partnerships or NGO collaborations?",
    answer:
       "Yes. We welcome partnerships with NGOs, spiritual groups, and corporates for CSR activities aligned with cultural, spiritual, and heritage goals."
  },
  
  
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="p-4 md:p-10 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          Frequently Asked Questions (FAQs)
        </h2>
        <h3 className="text-lg text-center text-gray-600 font-bold mb-6">
          Utkal Sanskriti Sansthanam – Preserving the Spirit of Odisha’s Culture and Spirituality
        </h3>
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="border rounded-lg bg-white shadow-sm transition-all"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full text-left p-4 flex justify-between items-center focus:outline-none"
              >
                <span className="font-semibold text-gray-800">{index + 1}. {item.question}</span>
                <span className="text-xl">{openIndex === index ? "−" : "+"}</span>
              </button>
              {openIndex === index && (
                <div className="p-4 pt-0 text-gray-700">{item.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faq;
