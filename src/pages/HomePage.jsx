import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import HouseCard from '../components/HouseCard';
import { getHouses } from '../services/api';

const HomePage = () => {
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHouses = async () => {
      setLoading(true);
      const housesData = await getHouses();
      setHouses(housesData);
      setLoading(false);
    };

    fetchHouses();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Helmet>
          <title>Hogwarts Houses | Harry Potter</title>
        </Helmet>
        <p className="text-xl font-bold text-gray-700">Loading houses...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8 max-w-7xl">
      <Helmet>
        <title>Hogwarts Houses | Harry Potter</title>
      </Helmet>
      <h1 className="text-5xl font-extrabold text-center text-white mb-6">Hogwarts Houses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {houses.map((house) => (
          <HouseCard key={house.id} house={house} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;