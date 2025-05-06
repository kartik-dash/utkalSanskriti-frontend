import React from 'react'
import CuisineCard from '../components/Card/CuisineCard';
import FestivalCard from '../components/Card/FestivalCard';
import HandicraftsCard from '../components/Card/HandicraftsCard';
import DanceCard from '../components/Card/DanceCard'; 

const Culture = () => {

  return (
    <div className="container mx-auto mt-10 p-6">

    <div>
      <FestivalCard/>
      </div>

      <div>
        <DanceCard />
      </div>
      
      <div>
        <HandicraftsCard />
      </div>
      
      <div>
        <CuisineCard/>
      </div>
      </div>
  )
}

export default Culture


