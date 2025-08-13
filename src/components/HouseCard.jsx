import React from 'react';
import { Link } from 'react-router-dom';
import * as amplitude from '@amplitude/analytics-browser';

const HouseCard = ({ house }) => {
  const { name, id } = house;

  const handleSeeMoreClick = () => {
    amplitude.track('Click See More', {
      house_name: name,
    });
  };

  return (
    <div className="md:flex md:shrink-0 p-6 rounded-lg flex flex-col items-center text-center m-4">
      <img className='w-full object-cover md:h-full md:w-48' src={`/public/assets/img/${name}.webp`} alt={`${name}`} />      
      <h2 className="font-bold mb-4 text-white text-2xl leading-20">{name}</h2>
      <Link to={`/houses/${id}`}>
        <button
          className="rounded bg-violet-500 px-5 py-2 text-xl leading-7 font-bold text-white hover:bg-violet-600 focus:outline-2 focus:outline-offset-2 focus:outline-violet-500 active:bg-violet-700"
          onClick={handleSeeMoreClick} 
        >
          See more
        </button>
      </Link>
    </div>
  );
};

export default HouseCard;