import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getHouseById } from '../services/api';
import * as amplitude from '@amplitude/analytics-browser';


const HouseDetailPage = () => {
  const { id } = useParams();
  const [house, setHouse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('info');

  const handleGoBackClick = () => {
    amplitude.track('Back to All Houses Click', {
      house_name: house.name,
    });
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);

    if (house && amplitude) {
      amplitude.track('House Detail Tab Click', {
        house_name: house.name,
        tab_name: tabName,
      });
    }
  };

  useEffect(() => {
    const fetchHouse = async () => {
      setLoading(true)
      const houseData = await getHouseById(id);
      setHouse(houseData);
      setLoading(false);
    };

    fetchHouse();
  }, [id]);

  let pageTitle = "Hogwarts Houses";
  if (loading) {
    pageTitle = "Loading... | Hogwarts Houses";
  } else if (house) {
    pageTitle = `${house.name} | Hogwarts Houses`;
  } else {
    pageTitle = "House Not Found | Hogwarts Houses";
  }

  if (loading) {
    return (
        <div className="flex justify-center items-center h-screen">
          <p className="text-xl font-bold text-gray-700">Loading house details...</p>
        </div>
    );
  }

  if (!house) {
    return (
      <div className="text-center p-8">
        <p className="text-2xl text-red-500">House not found!</p>
        <Link to="/" className="text-blue-500 hover:underline mt-4 block">
          Go back to the homepage
        </Link>
      </div>
    );
  }

  const tabsContent = {
    emblem: (
      <div className="space-y-4 align-middle">
        <img className="mx-auto h-fit w-xl object-cover" src={`/assets/img/${house.name}_Emblem.webp`} alt={`${house.name} Emblem`} />
      </div>
    ),
    founder: (
      <div className="space-y-4 align-middle">
        <p className="text-center self-center block"><span className="text-5xl text-center self-center align-center font-bold">{house.founder}</span></p>
        <img className='mx-auto h-fit w-xl rounded-lg object-cover' src={`/assets/img/${house.founder}.webp`} alt={`${house.founder} of ${house.name}`} />
      </div>
    ),
    info: (
      <div className="space-y-4">
        <p className="text-2xl font-bold"><span>Animal:</span> {house.animal}</p>
        <p className="text-2xl font-bold"><span>House Colors:</span> {house.houseColours}</p>
        <p className="text-2xl font-bold"><span>Element:</span> {house.element}</p>
        <p className="text-2xl font-bold"><span>Ghost:</span> {house.ghost}</p>
        <p className="text-2xl font-bold"><span>Common Room:</span> {house.commonRoom}</p>
      </div>
    ),
    members: (
      <div>
        <div>
          <ul className="grid grid-cols-4 gap-4">
            {house.heads.map((head, index) => (
              <li className="justify-between gap-x-6 py-5" key={index}><p className="text-2xl font-bold">{head.firstName} {head.lastName}</p></li>
            ))}
          </ul>
        </div>
      </div>
    ),
    traits: (
      <div>
        <ul role="list" className="grid grid-cols-4 gap-4">
          {house.traits.map((trait, index) => (
            <li className=" justify-between gap-x-6 py-5" key={index}><p className="text-2xl font-bold">{trait.name}</p></li>
          ))}
        </ul>
      </div>
    )
  };

  return (
    <div className="container mx-auto p-8 max-w-7xl">
      <h1 className="text-5xl font-extrabold text-center text-white mb-6">{house.name}</h1>
      <div className="bg-gray-900 p-8 rounded-lg shadow-xl border-gray-600">
        <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
          <button
            className={`text-xl py-2 px-4 font-extrabold focus:outline-none transition-colors duration-300 ${activeTab === 'emblem' ? 'border-b-4 border-blue-500 text-blue-600' : 'text-white hover:text-gray-700'}`}
            onClick={() => handleTabClick('emblem')}
          >
            Emblem
          </button>

          <button
            className={`text-xl  py-2 px-4 font-extrabold focus:outline-none transition-colors duration-300 ${activeTab === 'founder' ? 'border-b-4 border-blue-500 text-blue-600' : 'text-white hover:text-gray-700'}`}
            onClick={() => handleTabClick('founder')}
          >
            Founder
          </button>

          <button
            className={`text-xl py-2 px-4 font-extrabold focus:outline-none transition-colors duration-300 ${activeTab === 'info' ? 'border-b-4 border-blue-500 text-blue-600' : 'text-white hover:text-gray-700'}`}
            onClick={() => handleTabClick('info')}
          >
            General Informations
          </button>

          <button
            className={`text-xl py-2 px-4 font-extrabold focus:outline-none transition-colors duration-300 ${activeTab === 'members' ? 'text-xl border-b-4 border-blue-500 text-blue-600' : 'text-xl text-white hover:text-gray-700'}`}
            onClick={() => handleTabClick('members')}
          >
            Heads
          </button>

          <button
            className={`text-xl py-2 px-4 font-extrabold focus:outline-none transition-colors duration-300 ${activeTab === 'traits' ? 'border-b-4 border-blue-500 text-blue-600' : 'text-white hover:text-gray-700'}`}
            onClick={() => handleTabClick('traits')}
          >
            Traits
          </button>
        </div>

        {tabsContent[activeTab]}

        <div className="flex flex-col items-center mt-6">
        </div>
      </div>

      <div className="text-center mt-8">
        <Link to="/" className="rounded bg-violet-500 px-5 py-2 text-xl leading-7 font-bold text-white hover:bg-violet-600 focus:outline-2 focus:outline-offset-2 focus:outline-violet-500 active:bg-violet-700"
          onClick={handleGoBackClick}>
          ← Back to all houses
        </Link>
      </div>
    </div>
  );
};

export default HouseDetailPage;