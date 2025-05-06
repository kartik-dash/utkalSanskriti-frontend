import React from 'react';

const YogaPage = () => {
  const yogaPoses = [
    {
      id: 1,
      name: 'Downward Dog (Adho Mukha Svanasana)',
      image: 'https://www.yogajournal.com/.image/t_share/MTQ2MTgwOTg5MTY5ODkzNjEx/adho-mukha-svanasana-downward-dog.jpg',
      description: 'Downward Dog stretches the hamstrings, calves, and spine while strengthening the arms, shoulders, and core.',
      benefits: ['Stretches the body.', 'Strengthens the arms and core.', 'Improves posture.'],
    },
    {
      id: 2,
      name: 'Child’s Pose (Balasana)',
      image: 'https://www.yogajournal.com/.image/t_share/MTQ2MTgwOTg5MTY5ODkzNjA2/balasana-childs-pose.jpg',
      description: 'Child’s Pose is a resting posture that helps to relax and reset the body, stretching the hips, thighs, and ankles.',
      benefits: ['Relieves stress and fatigue.', 'Stretches the lower back and hips.', 'Soothes the nervous system.'],
    },
    {
      id: 3,
      name: 'Warrior II (Virabhadrasana II)',
      image: '',
      description: 'Warrior II improves balance, endurance, and stamina while toning the legs and op',
      benefits: ['Increases strength and stamina.', 'Improves balance and coordination.', 'Opens the chest and shoulders.'],
    },
    {
      id: 4,
      name: 'Tree Pose (Vrksasana)',
      image: 'https://www.yogajournal.com/.image/t_share/MTQ2MTgwOTg5MTY5ODkzNjI1/vrksasana-tree-pose.jpg',
      description: 'Tree Pose improves balance and strengthens the legs and core, promoting focus and mental clarity.',
      benefits: ['Improves balance and stability.', 'Strengthens legs and core.', 'Promotes focus and concentration.'],
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800">Yoga Poses for Every Level</h1>
        <p className="text-lg text-gray-600 mt-4">Discover the benefits of various yoga poses and their positive impact on your body and mind.</p>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {yogaPoses.map((pose) => (
          <div key={pose.id} className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-105">
            <img src={pose.image} alt={pose.name} className="w-full h-56 object-cover" />
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-800">{pose.name}</h2>
              <p className="text-gray-600 mt-2">{pose.description}</p>
              <ul className="mt-4 space-y-2">
                {pose.benefits.map((benefit, index) => (
                  <li key={index} className="text-gray-700 text-sm">{benefit}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default YogaPage;






